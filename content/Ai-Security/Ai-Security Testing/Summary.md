---
tags: [ai-security, testing, summary]
created: 2025-01-01
status: permanent
---

# AI Security Testing — Summary

## What to take away

**AI red teaming** extends traditional security testing to cover AI-specific attack surfaces — both security vulnerabilities and responsible AI concerns. Key differences from traditional testing:
- Probabilistic outputs → run each test multiple times
- Include benign personas, not just adversarial ones
- Repeat testing as models and metaprompts change

**Three categories** → [[Categories of red teaming]]:
- **Full stack** — entire tech stack, traditional pentest + AI vectors
- **Adversarial machine learning** — the model itself, evasion/extraction/poisoning
- **Prompt injection** — natural language interface, direct/indirect injection, jailbreaks

**Planning** → [[Planning ai red teaming]]:
- Diverse teams (adversarial + benign, domain experts + security)
- Test both base model (API) and full application (UI)
- Iterative: policy-driven harm list → open-ended exploration → retest with mitigations → automate at scale
- Report to stakeholders clearly — red teaming shows what's *possible*, not what's *rampant*

**It's ongoing.** Not a pre-launch checkbox. As systems evolve, testing must evolve with them.

---

## Resources

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [MITRE ATLAS](https://atlas.mitre.org/)
- [PyRIT — Python Risk Identification Tool](https://github.com/Azure/PyRIT)
- [NIST AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence)

---

*Return to: [[../Summary|Main Summary & Map]]*
