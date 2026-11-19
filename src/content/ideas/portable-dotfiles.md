---
title: "Portable Dev Tooling with Dotfiles"
description: "How my dotfiles provision a machine, layer local and opt-in customization on top, and where they still fall short."
date: "2026-11-19"
---

I want to sit down at any computer and get my shell, editor, git identity, and AI-agent tooling in one command, without every machine being identical. Some of my machines are personal, some are for work, and some have secrets that must never leave them. My [dotfiles](https://github.com/danlafeir/dotfiles) are the attempt at that. This is how they work, and an honest review of where they fall short.

## The shape of it

The repo is plain files plus one bootstrap script. The script installs Homebrew and oh-my-zsh, applies a Brewfile, and **symlinks** configuration into `$HOME`, so editing the repo edits the live config. It is written to be re-run.

- **Shell, git, vim, tmux** are tracked files, linked into place.
- **Brewfiles are layered**: a base set, a `personal` set you opt into with an argument, and `infrastructure` and `python` sets you run by hand.
- **AI tooling** lives in `ai-tools/`, split by audience: `all-purpose`, `developer`, `manager`. The bootstrap links agents, skills, and hooks into `~/.claude`, and merges a hooks block into Claude Code's settings.

## Local customization that wins

Per-machine config is the hard part of any dotfiles repo: it can't be committed, but it must still be provisioned. The rule is simple: **any file named `*.local` or `*.local.*` is gitignored and installed by the bootstrap**, and it takes precedence over the tracked file it pairs with.

How it takes precedence depends on the file:

- If the tracked file loads its local counterpart itself, the local file is just linked. `.zshrc` sources `~/.zshrc.local` as its last line, so local settings override everything above. `.gitconfig` includes `~/.gitconfig.local` the same way.
- If it doesn't, the two are merged into a generated file and `$HOME` links to that: text is concatenated base-then-local so later lines win, and JSON is deep-merged.
- A real file already at the destination is never overwritten.

The cost: merged output is generated, so you re-run the script after editing. And local files can override or add, but a deep merge can't delete a key.

## AI agents as part of the machine

Treating agent configuration like any other dotfile pays off. Global instructions are one file, `AGENTS.md`, symlinked where each tool expects it. They include how I structure [commit messages](/playbook/technical-leadership/commit-messages/), so assistants follow the same conventions I do. Review agents (security, design, documentation, performance) and a push-review gate travel with me. Two guardrails are enforced by hooks rather than by hoping the model remembers: a guard that blocks reading or writing real secrets through secret-store CLIs, and a gate that blocks `git push` of deployed code until a review has passed.

## What the review found

Reviewing my own repo as a stranger would, the headline is that it is a **mac provisioning repo with portable ambitions**:

- Linux and Windows bootstraps are stubs, though most of the mac script (symlinks, local files, agent tooling) is platform-neutral.
- A few paths are hardcoded: `~/dev/dotfiles` in an alias while the installer unpacks to `~/.dotfiles`, and Apple-silicon Homebrew paths in the GPG agent config.
- `.zshrc` initializes `pyenv` unconditionally though pyenv is an opt-in install, so a fresh shell errors.
- Tools that edit `.zshrc` (Rancher, a Python setup script) dirty the tracked file, because it is a symlink into the repo. Tool-injected config belongs in the `.local` file.
- Every new agent or skill needs a hand-written symlink line, so it is easy to add one and forget to link it.
- There are no tests and no CI. A provisioning script you can't run safely on a clean machine is a script you only trust on the machine it was written on.

## Where it goes next

1. **Platform core plus adapters.** Keep symlinks, local files, and agent tooling platform-neutral; make package managers and paths thin per-OS layers.
2. **Profiles instead of one flag.** A `profiles/` directory (`base`, `personal`, `work`, `infra`, `python`), each with its own Brewfile and shell snippets. The active set lives in a machine-local file, so a work laptop opts into `work` and `infra` and never sees personal tools. The same mechanism would gate the `manager` AI tier. `.local` files stay as the escape hatch for one-off tweaks.
3. **Globs and a manifest** instead of hand-written link lists.
4. **Tests and CI.** `shellcheck`, a test for the local-file merge, and a clean-runner bootstrap job.
5. **`--dry-run` and a `doctor` command** so re-running is safe on a machine you've forgotten the history of.
6. **Separate global from repo-specific agent instructions**, so notes about maintaining the dotfiles don't load into every unrelated project.

The principle behind all of it: the repo should describe *what a machine can be*, and a small machine-local file should say *what this machine is*.
