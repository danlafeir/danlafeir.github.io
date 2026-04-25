---
draft: true
title: Pairing Guidance
section: Technical Leadership
description: How to run pair programming as a team practice, not a formality — including the anchor rotation model.
order: 1
---

Pairing should act as a force multiplier for the team, not a formality for work. The distinction matters: pairing done as a checkbox produces overhead without benefit. Pairing done as a genuine collaboration model reduces knowledge silos, improves code quality, and accelerates onboarding.

## The Anchor Rotation Model

Each piece of work has an **anchor** — the person with enough context to lead the card independently. When a card completes, the non-anchor rotates off. The next anchor is selected from the remaining team members who need context on that area of the codebase.

This model keeps context distributed across the team while ensuring continuity on active work.

### Why this works

There's a transaction cost to onboarding someone to a piece of work. Over time, that cost becomes trivial — because everyone has been through it repeatedly and knows how to get up to speed quickly. The investment pays off in a team where anyone can pick up any card.

When it doesn't work: the model breaks down when the anchor doesn't have enough independent context to execute. Don't rotate someone into an anchor role before they're ready. The overhead of a struggling anchor exceeds the overhead of a less-rotated pairing arrangement.

## When to Pair (and When Not To)

This is a **default working modality** — meaning it's the starting assumption, not a mandate. Discard it when the context calls for it:

- Solo work on a well-understood, low-risk task is fine.
- Deep individual research (a spike, an investigation) may be better done alone.
- Don't pair for the sake of pairing on work where the overhead outweighs the benefit.

The goal is shared understanding and quality, not hours logged together.

## Further Reading

- [On Pair Programming](https://martinfowler.com/articles/on-pair-programming.html) — Martin Fowler's comprehensive treatment of the practice.
