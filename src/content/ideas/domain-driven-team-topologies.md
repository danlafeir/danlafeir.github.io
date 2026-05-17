---
title: "Domain-Driven Team Topologies"
description: "Building technology organizations resilient to change requires aligning how teams communicate, how your business works, and how your systems are designed."
date: "2026-05-15"
---

Technology organizations that can effectively absorb change tend to share a common trait: how teams communicate and how the business works is embedded in the design of the organization. I will present to you three complementary ideas to make the case for designing it intentionally. Conway's Law, first articulated in 1968, observes that systems mirror the communication structures of the organizations that build them. Eric Evans's *Domain-Driven Design* provides a framework for modeling the business domain precisely enough to build software that genuinely reflects it. And *Team Topologies* by Matthew Skelton and Manuel Pais gives us the vocabulary for structuring teams around that model. Together, they form a model to build an organization optimized for change.

## The System You Have Is the Organization You Are

In 1967, Melvin Conway submitted a paper to the Harvard Business Review. The editors rejected it. It was later published in Datamation in 1968. It described something so fundamental it almost seemed trivially obvious once stated: any organization that designs a system will produce a design whose structure mirrors that organization's communication structure.<sup>[1]</sup>

Conway's Law, as Fred Brooks later named it in *The Mythical Man-Month*,<sup>[2]</sup> is not a metaphor. It is a structural force. Teams that don't talk produce components that don't integrate. Teams that talk too much produce components that can't be separated. The software is a projection of the social system that built it.

Most engineering leaders bump up against Conway's Law when they want to change their system. They plan a new architecture, draw new service boundaries, restructure a team, and then find the pieces drifting back toward where they started. The problem is socio-technical: it is straightforward to implement new software, but if the communication patterns between teams don't change, the new system will eventually mirror the old one. The architecture is downstream of the org chart.

The question is: how do we evolve our systems with this as a design input?

## The Inverse Conway Maneuver

In 2015, ThoughtWorks popularized a term that had been circulating in systems-thinking circles: the *Inverse Conway Maneuver*. The idea is as direct as it sounds. If Conway's Law says your architecture will mirror your org structure, then you can reverse the direction: design your org structure to match the architecture you want, and the architecture will follow.

This is the synthesis point of all three frameworks.

DDD gives you the *target architecture*: a set of bounded contexts with explicit relationships, their own models, and clear integration contracts. Team Topologies gives you the *vocabulary* for structuring teams around that architecture: team types, cognitive load limits, interaction modes as first-class design decisions. Conway's Law gives you the *mechanism*: the social structure produces the technical structure, whether you intend it or not.

The Inverse Conway Maneuver is the intentional use of that mechanism. You don't wait to discover that your microservices are tangled because two teams shared a codebase. You draw the bounded contexts first, name the team types that should own each one, declare the interaction modes between adjacent contexts, and then you build.

This requires a kind of organizational courage that's easy to underestimate. Restructuring teams to match domain boundaries means disrupting established reporting lines, moving people, and sometimes eliminating roles that exist to mediate between teams that shouldn't need mediation. The refactoring is as much social as technical.

## Bounded Contexts: Discovering and Defining Boundaries

Eric Evans published *Domain-Driven Design* in 2003,<sup>[3]</sup> drawing on years of consulting work on complex enterprise systems. The book argued that the central challenge in software development is not technical. It is understanding and modeling the business domain well enough to build software that actually reflects it. Evans introduced a set of patterns and practices centered on the domain model: a shared, precise representation of the business, developed collaboratively between engineers and domain experts through a common vocabulary he called the *ubiquitous language*. Modeling the business domains means change in software is a change in business.

The word "customer" in a billing system and the word "customer" in a fulfillment system mean different things. In billing, a customer has payment methods, invoices, and a credit limit. In fulfillment, a customer has a delivery address and a preference for whether to leave packages at the door. These are not just different attributes of the same entity. They represent different *concerns*, different *behaviors*, different *lifecycles*. Mistaking them for a single model creates an inadvertent coupling that makes the system harder to change. These might refer to the same "person" but these two systems need to evolve differently.

Evans called this the *bounded context*: an explicit boundary within which a particular model is consistent and meaningful. Within the boundary, terms have precise definitions. Across the boundary, translation is required: deliberately, explicitly, with care. The *ubiquitous language* of one context does not bleed into another.

This is not just a modeling technique. It is a recognition that large organizations naturally develop localized grammars, and that those grammars are worth preserving. Consider how a large retailer talks about an "order": to the storefront team it is a submitted cart, to the warehouse it is a pick list, to finance it is a revenue event to be recognized. Each department has developed precise language because imprecision in their context is expensive. The problem is not the different vocabularies. The problem is when a shared system forces them to pretend those vocabularies are the same.

The bounded context is the unit at which a team or set of teams can maintain a coherent system. That makes it a natural input for organizational design: if you can identify where your domain boundaries are, you have a principled basis for deciding where your team boundaries should be.

## The Four Team Types and What They Actually Own

Matthew Skelton and Manuel Pais, in *Team Topologies*,<sup>[4]</sup> gave us a vocabulary for what was previously described through metaphor and org-chart lore. They named four team types, not as bureaucratic categories, but as patterns of cognitive load and flow:

**Stream-aligned teams** are aligned to a flow of work from a segment of the business domain. They are the primary delivery teams, owning their slice of the product end to end.

**Platform teams** are a grouping of other team types that provide a compelling internal product to accelerate delivery by stream-aligned teams. They don't deliver product directly. They reduce friction for those who do.

**Enabling teams** help a stream-aligned team overcome obstacles and detect missing capabilities. They're the consultants and coaches of the internal world. They leave rather than staying.

**Complicated-subsystem teams** own areas where significant mathematics, calculation, or technical expertise is needed. They serve stream-aligned teams but require deep specialist knowledge to run.

Read through a DDD lens, the mapping is clarifying.

Stream-aligned teams own *bounded contexts*. They are the natural stewards of a domain model. When a bounded context has coherent ownership, it can have a coherent model. The team's internal ubiquitous language *is* the context's ubiquitous language.

Platform teams live in technical domains. Infrastructure, observability, build pipelines. These aren't where competitive advantage lives. They're table stakes, and they should be treated as such. The platform team makes the generic domain feel like a solved problem for everyone else.

Enabling teams aren't tied to a domain at all. They exist at the boundary between expertise and need. They help stream-aligned teams cross thresholds: learn Kubernetes, adopt event-driven patterns, introduce better testing practices. Then they move on.

Complicated-subsystem teams often own *supporting subdomains* with unusual technical depth. The payments engine. The real-time recommendation system. The pricing rules evaluator. These aren't the core domain, but they're not generic either. They require specialist attention the stream-aligned team can't sustain.

## Interaction Modes Are the API Between Domains

Team Topologies also defines three interaction modes between teams. These are not relationship types or org-chart edges. They're *protocols*.

**Collaboration** mode is high-bandwidth, high-friction, high-discovery. Two teams work closely together, building shared understanding and, often, discovering where the real domain boundary should be. It's expensive and not meant to last.

**X-as-a-service** mode is the steady state of a mature boundary. One team provides a well-defined interface; another consumes it. The consuming team doesn't need to know how it works. This is low-bandwidth and deliberately so.

**Facilitating** mode is how enabling teams operate. They're not providers and not collaborators in the product sense. They build capacity and then withdraw.

Here's what makes this powerful when combined with DDD: the correct interaction mode between two teams *follows from the relationship between their domains*.

If two bounded contexts are actively being carved out, if the boundary itself is still uncertain, the teams should be in collaboration mode. They need the high-bandwidth channel to discover the seam. Once the boundary is stable and the interface is clear, they should shift to X-as-a-service. The interaction mode is not a fixed property of the relationship; it reflects the maturity of the domain boundary.

Similarly, a stream-aligned team consuming a platform service has no business collaborating with the platform team on every feature. That's what the service interface is for. The platform team designs the contract; the stream-aligned team uses it. Collaboration happens at the edges, when the platform needs to understand new use cases, and then it resolves back into service mode.

The mode you choose is not a management decision. It's a domain modeling decision. And making it deliberately means making the domain assumptions explicit.

## Where This Gets Hard

None of this is a silver bullet, and it would be dishonest to present it as one.

**Bounded contexts shift.** A startup's product is not a mature company's product. The natural domain boundaries at year two are not the natural boundaries at year seven. This means the team structure you designed for one architecture will eventually become the legacy constraint holding back the next. The Inverse Conway Maneuver isn't a one-time decision; it's an ongoing practice of re-examining whether your org structure still matches the domain you're building.

**Legacy systems create legacy team structures, and vice versa.** The hardest migrations are the ones where the old codebase still runs the business. You can't reorganize teams around a new bounded context if the new context doesn't exist yet, and you can't build the new context while the old system owns the data and the traffic. The maneuver has to be done incrementally, with strangler figs and dual-write patterns and all the messy machinery of coexistence.

**Teams are made of people, not interfaces.** Collaboration mode requires trust. X-as-a-service requires a team willing to absorb the cost of maintaining a stable API for others. Enabling teams require people who can enter a team, build something real, and leave without ego. These are human problems, not architectural ones, and no framework solves them.

**Cognitive load is real and heterogeneous.** Team Topologies is explicit that team size and scope should be constrained by cognitive load: the mental effort required to understand and work within a domain. But cognitive load varies by person, by domain maturity, by tooling quality, by how much technical debt lives in the area. The "right" team size is contextual, not universal.

## A Unified Model

Three books. One argument.

*Domain-Driven Design* tells you what your software should reflect: the actual structure of your business domain, bounded and modeled with care. Not a single unified model, but a constellation of coherent ones, each with its own language and its own boundary.

*Team Topologies* tells you how to structure the people who build and maintain that software. Four team types for four patterns of ownership and specialization. Three interaction modes for three patterns of inter-team relationship. Cognitive load as the primary constraint on scope.

Conway's Law tells you why alignment between the two matters. Not as a warning to heed but as a force to use. Your teams will produce software that mirrors how they communicate. The question is whether that mirror reflects something you designed.

Used together, these frameworks offer a coherent approach to one of the hardest problems in growing software organizations: how do you structure the humans so that the software stays coherent? The answer they converge on is the same in each: start with the domain. Map the team to it, not the other way around. Make the boundaries explicit. Let the interaction mode follow from the domain relationship. Then adjust as both evolve.

The system you have is the organization you are. But the organization you become is a choice.

---

## Works Cited

1. Conway, M. E. (1968). "How Do Committees Invent?" *Datamation*, 14(4), 28–31.
2. Brooks, F. P. (1975). *The Mythical Man-Month: Essays on Software Engineering*. Addison-Wesley.
3. Evans, E. (2003). *Domain-Driven Design: Tackling Complexity in the Heart of Software*. Addison-Wesley Professional.
4. Skelton, M., & Pais, M. (2019). *Team Topologies: Organizing Business and Technology Teams for Fast Flow*. IT Revolution Press.
