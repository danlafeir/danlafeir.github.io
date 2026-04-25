---
draft: true
title: Sensible Defaults
section: Technical Leadership
description: Ten engineering organization defaults that raise the baseline for how teams build and ship software.
order: 2
---

*Inspired by [Thoughtworks Sensible Defaults](https://www.thoughtworks.com/en-us/insights/topic/sensible-defaults).*

These are not rules. They're defaults — starting positions that should be followed unless you have a good reason not to, and where exceptions require explicit justification.

1. **Integrate frequently and continuously** — If you're not integrating at least daily, you're accumulating merge risk.
2. **Code is written with test-driven development** — Tests aren't written after; they're written first. This changes how you design, not just how you verify.
3. **Develop in pairs** — See [Pairing Guidance](/playbook/technical-leadership/pairing-guidance).
4. **Smallest value-oriented stories** — Break work down until each card can be delivered and validated independently. Large cards hide risk.
5. **Security is automated in the SDLC** — Security checks run in the pipeline, not as a quarterly audit.
6. **Every code change is monitored and observable** — If you can't observe the behavior of your code in production, you don't know if it works.
7. **Build pipelines automate local development** — The pipeline should remove friction from running the system locally, not just from CI.
8. **Technical change requires a value proposition** — Refactors, upgrades, and rewrites need to be justified in terms of value delivered, not just technical preference.
9. **Deployment is decoupled from release** — You can deploy any time. Whether users see the change is controlled separately, via feature flags or equivalent.
10. **Measure quality** — Code coverage, static analysis, and other quality signals are tracked and visible.

## Supporting Resources

- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) — Martin Fowler
- [Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html) — Martin Fowler
- [On Pair Programming](https://martinfowler.com/articles/on-pair-programming.html) — Martin Fowler
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) — Martin Fowler
- [Observability-Driven Development](https://www.honeycomb.io/blog/observability-driven-development) — Honeycomb
- [Snyk CI/CD Integration](https://docs.snyk.io/scm-ide-and-ci-cd-integrations/snyk-ci-cd-integrations/snyk-ci-cd-integration-deployment-and-strategies)
