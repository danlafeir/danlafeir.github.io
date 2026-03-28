---
title: Post-Mortem Template
section: Recurring Meetings
description: A structured template for incident retrospectives, from detection through action items.
order: 2
---

## Header

```
time-of-detection:
time-of-acknowledgement:
time-of-recovery:
```

## Executive Summary

*Write a summary of the incident that includes "what happened", "measured impact", and "recovery". Brevity and precision are important.*

## Impact

*Explain the impact to customers — internal or external — using specific numbers or calculated estimates.*

## Timeline

*Write a timeline of events starting at detection. Capture any relevant events that might provide insight into root cause or be worth retrospecting on. We want to learn from this event log.*

```
<date> - <CT time>: <Significant moment for detection, impact to customers, recovery, etc.>
```

## Root Cause Analysis

*Describe the root cause of the failure that affects this team's system. The heart of the issue could live with another team. Reference another post-mortem if an error occurs at an interface boundary.*

## Retrospective

*Run a 30 to 60 minute retrospective. Cover "what went well", "what did not", and "where we got lucky". Focus discussion on a shared understanding of the latter two to generate action items. Include a link to the facilitation resources and recording.*

## Action Items

*List action items from the retrospective. Links to story cards are preferable.*
