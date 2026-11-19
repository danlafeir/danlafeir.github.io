---
title: "Portable Dev Tooling with Dotfiles"
description: "How my dotfiles provision a machine, layer local and opt-in customization on top, and where they still fall short."
date: "2026-11-19"
---

I want to sit down at any computer and get my shell, editor, git identity, and AI-agent tooling in one command, without every machine being identical. Some of my machines are personal, some are for work, and some have secrets that must never leave them. My [dotfiles](https://github.com/danlafeir/dotfiles) are the attempt at that. This is how they work, and an honest review of where they fall short.

## The shape of it

The repo is plain files plus one entry point, `bootstrap.sh`. It installs oh-my-zsh and the packages for the machine's **profiles**, then **symlinks** configuration into `$HOME`, so editing the repo edits the live config. It is written to be re-run, and a real file already in the way is moved aside, not overwritten.

- **A platform-neutral core with thin adapters.** Symlinks, local files, and agent tooling are shared; Homebrew (macOS) and apt (Linux) live in small adapter scripts chosen by `uname`.
- **Profiles are the opt-in mechanism.** `base` is always on; `personal`, `infra`, `python`, and `manager` are bundles with their own Brewfile or `apt.txt`, shell snippets, and AI tiers. The active list lives in a machine-local file, not in git, so a work laptop and a personal laptop share a repo but not a setup.
- **Safe to try.** `--dry-run` prints every change and writes nothing; `doctor` checks that every link an earlier run made still points where it should.
- **AI tooling** lives in `ai-tools/`, split by audience (`all-purpose`, `developer`, `manager`). Agents and skills are linked by glob, so adding one is just adding a file.

## Local customization that wins

Per-machine config is the hard part of any dotfiles repo: it can't be committed, but it must still be provisioned. The rule is simple: **any file named `*.local` or `*.local.*` is gitignored and installed by the bootstrap**, and it takes precedence over the tracked file it pairs with.

How it takes precedence depends on the file:

- If the tracked file loads its local counterpart itself, the local file is just linked. `.zshrc` sources `~/.zshrc.local` as its last line, so local settings override everything above. `.gitconfig` includes `~/.gitconfig.local` the same way.
- If it doesn't, the two are merged into a generated file and `$HOME` links to that: text is concatenated base-then-local so later lines win, and JSON is deep-merged.
- A real file where a standalone local file would land is never overwritten.

The cost: merged output is generated, so you re-run the script after editing. And local files can override or add, but a deep merge can't delete a key.

## AI agents as part of the machine

Treating agent configuration like any other dotfile pays off. Global instructions are one file, `AGENTS.md`, symlinked where each tool expects it. They include how I structure [commit messages](/playbook/technical-leadership/commit-messages/), so assistants follow the same conventions I do. Rules that only matter inside the dotfiles repo live in that repo's own `CLAUDE.md`, so they don't load into unrelated projects. Review agents (security, design, documentation, performance) and a push-review gate travel with me. Two guardrails are enforced by hooks rather than by hoping the model remembers: a guard that blocks reading or writing real secrets through secret-store CLIs, and a gate that blocks `git push` of deployed code until a review has passed.

## What the review found, and what changed

Reviewing my own repo as a stranger would, the headline was that it was a **mac provisioning repo with portable ambitions**. In one pass I fixed:

- Hardcoded paths: an alias pointing at `~/dev/dotfiles` while the installer unpacked to `~/.dotfiles`, and an Apple-silicon Homebrew path in the GPG agent config, which is now generated from whatever pinentry is installed.
- `.zshrc` initializing `pyenv` unconditionally though pyenv is an opt-in install, so a fresh shell errored. It now lives in the `python` profile.
- A bootstrap with no error handling that upgraded every package on every run. It now stops on failure and upgrades only on request.
- Linux and Windows stubs. Linux now has an adapter; Windows is still a manual guide.
- No tests. A script that provisions machines should not be trusted only on the machine it was written on, so there is now a test suite that runs against a throwaway home directory, and CI to run it.

## What I tested, and what I haven't

I ran the base profile in a clean Ubuntu container and the base and python profiles on macOS against a throwaway home directory. Both runs found real bugs that review had missed: on Linux the shell framework installed before the tools it needs, and the failure was silently swallowed; on macOS, `brew bundle` upgraded packages regardless of my flag, a broken tool install failed the whole bootstrap, and `pipx` quietly wrote a machine-specific line into a tracked file. All fixed.

Still unverified: CI has not run, the other profiles have not been run end to end, and the bootstrap has not been run against my real home directory since the rewrite.

## What's left

1. **Windows:** a PowerShell adapter matching the other two.
2. **Linux package coverage** for the other profiles.
3. **Pruning links** for files removed from the repo.
4. **Filling the `manager` tier**, which exists as a mechanism but is empty.

The principle behind all of it: the repo should describe *what a machine can be*, and a small machine-local file should say *what this machine is*.
