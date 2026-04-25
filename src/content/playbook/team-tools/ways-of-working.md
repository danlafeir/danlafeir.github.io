---
draft: true
title: Ways of Working Template
section: Team Tools
description: A living document template for team ceremonies, workflow stages, and operating norms.
order: 2
---

*This is a template. Copy and adapt it for your team. It should live somewhere everyone can edit it.*

---
draft: true

## Ceremonies

### Standup — 25 minutes, daily

Keep it short. The goal is shared context on progress and blockers, not status reporting to management.

- **10 min** — Updates and blockers on active work, plus any support needed
- **5 min** — Logistics, upcoming events, team announcements
- **10 min** — Parking lot for anything that needs a quick follow-up

### Retro — 70 minutes, every 3 weeks

Celebrate what's working. Surface friction before it becomes dysfunction.

- Wins and shoutouts
- Roadmap and priority review
- Retrospective cards (what went well, what didn't, what to try)
- Action item assignment

Use a facilitation tool (Mural, FunRetro, etc.) and rotate the facilitator.

### Tech Huddle — 45 minutes, weekly

Technical knowledge sharing, architectural discussions, and communication skill development. Pre-registered topics only — no ad hoc agenda items. Assign a facilitator for the week.

### Engineering Kickoffs — as needed

Run when new work begins. Present problem context, architectural overview, and story map. Prefer in-person or synchronous video.

---
draft: true

## Flow of Work

| Stage | Description |
|---|---|
| Analysis | Work is being scoped and broken down |
| Ready for Dev | 15-minute kickoff done, acceptance criteria clear |
| In Progress | Active development |
| Done | Work complete, deskcheck requested |
| Released | Deployed to production, deskcheck confirmed |

**Spikes** are timeboxed research cards. Define the question you're answering and the timebox upfront. The output is a decision or a recommendation, not code.

---
draft: true

## Core Practices

**Pair Programming** — The default working modality. Reduces knowledge silos. Uses an anchor rotation model (see [Pairing Guidance](/playbook/technical-leadership/pairing-guidance)).

**Documentation** — Maintained continuously, not in a crunch before a release. Includes architecture diagrams, API specs, event schemas, and operational runbooks.

**Support Rotation** — Weekly rotation for first-line team support. One person is the designated responder so the rest of the team can stay focused.
