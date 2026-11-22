---
title: Commit Messages
section: Technical Leadership
description: Record changes to the repository, with intention.
order: 3
---

A commit is the unit other people (and future me, and tooling) use to understand *why* the code is the way it is. The diff already shows *what* changed; the commit exists to carry everything the diff can't.

I follow the conventions git itself documents (`git help commit` and Git's `SubmittingPatches`), not Conventional Commits. There are no `feat:` or `fix(scope):` prefixes.

## What goes in a commit

- **One self-contained change per commit**: a function added, a bug fixed, a config updated. If you can't describe it without "and", split it.
- **Commit after each change**, not at the end of the day. Small commits are easy to review, bisect, and revert.
- **Never batch unrelated changes.** Refactors go in their own commit, separate from behavior changes.
- **Commit straight to `main`** and keep it green by running tests before pushing. If the repo protects `main` or uses pull requests, follow that instead.

## Anatomy of a message

```
Add retry to webhook handler

Deliveries failed permanently on a single timeout, so partners saw
missing events whenever our upstream blipped. Retry up to three times
with exponential backoff. A queue was considered, but the handler is
already idempotent and a queue is a much larger change.

Jira: PROJ-123
Tested: go test ./...
Safe-To-Revert: true
```

### Subject

- Imperative mood: "Add retry", not "Added" or "Adds".
- Capitalized, no trailing period, around 50 characters.
- It should complete the sentence "If applied, this commit will ...".

### Body

Separated from the subject by a blank line and wrapped at about 72 characters. It explains **why**:

- the problem or motivation,
- how the previous behavior fell short,
- why this approach over the alternatives.

Omit the body only when the subject says it all.

### Trailers

Machine-readable `Key: value` lines after a final blank line, one per line, so agents and tooling can act on them. Include only the ones that apply:

| Trailer | Meaning |
| --- | --- |
| `Jira: PROJ-123` | The ticket this belongs to. Repeat for several. Taken from the branch name or prior commits, never invented. |
| `Fixes: <sha> ("subject")` | The commit that introduced the bug. |
| `Refs: <url or id>` | Related issues, PRs, or docs. |
| `Breaking: <what and who>` | A public interface or behavior callers must adapt to. |
| `Reverts: <sha>` | Used when undoing an earlier commit. |
| `Tested: <how>` | `Tested: go test ./...`, or `Tested: not run` when it wasn't. |
| `Safe-To-Revert: true\|false` | `true` only if `git revert` alone fully undoes the change. `false` when it leaves effects behind, such as an applied migration, changed data, published artifacts, or external side effects. Follow `false` with a dash and the rollback steps. |
| `Co-Authored-By:` / `Assisted-by:` | Attribution, including AI assistance. |

`Safe-To-Revert` replaces a vague risk rating with a question that has a checkable answer, and it is the one most worth reading before reverting under pressure:

```
Safe-To-Revert: false — migration 0042 already dropped legacy_id; restore from backup, then revert
```

## Before pushing

Changes to deployed code get a review of the exact diff and commit list before they are pushed. Amending, reordering, or adding commits afterward invalidates that review, so the history should be in its final shape first. Docs-only, test-only, and build-config-only pushes skip the review.

## Why this shape

- **Subject lines** make `git log --oneline` readable and let reviewers scan a range.
- **Bodies** preserve intent: the reasoning is the first thing lost and the hardest to reconstruct.
- **Trailers** turn history into data: find every commit tied to a ticket, every breaking change, every commit that can't be cleanly reverted.
- **Small commits** keep `git bisect` and `git revert` useful.

These rules live in the global agent instructions in my [dotfiles](https://github.com/danlafeir/dotfiles), so AI assistants working in any repo follow the same conventions as I do.
