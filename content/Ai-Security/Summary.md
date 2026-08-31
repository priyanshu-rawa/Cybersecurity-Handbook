---
tags: [ai-security, summary, moc]
created: 2025-01-01
status: permanent
---

# AI Security — Summary & Map

## The five attack categories

| Attack | What it targets | When it happens |
|---|---|---|
| [[AI Jailbreaking]] | Safety guardrails | At runtime |
| [[AI Prompt Injection]] | Model instructions | At runtime |
| [[AI Model Manipulation]] | Model/training data integrity | During training |
| [[Data Exfiltration]] | Model, training data, interaction data | Ongoing |
| [[AI Overrreliance]] | Human judgment | At runtime (behavioral) |

---

## Key takeaways

**AI security extends traditional security — it doesn't replace it.** Network security, access controls, encryption — all still needed. AI just adds new attack surfaces on top.

**Nondeterministic output is the root of many challenges.** Same input, different output. Classic security assumes determinism. AI breaks that assumption everywhere.

**Defense in depth is the only answer.** No single control stops everything. Layer them: content filters + metaprompts + access controls + monitoring + user education.

**The field moves fast.** New techniques, new models, new integrations. OWASP, MITRE ATLAS, and NIST AI RMF need to be checked regularly — not just studied once.

---

## Architecture recap

Three layers → [[AI Character Layers]]:
- **Usage** — users, policies, education
- **Application** — your app, plugins, agents
- **Platform** — model, training data, API

Shared responsibility depends on SaaS / PaaS / IaaS deployment.

---

## Useful frameworks

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [MITRE ATLAS](https://atlas.mitre.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence)
- [AI Shared Responsibility Model](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility-ai)
- [Crescendo multi-turn jailbreak research](https://crescendo-the-multiturn-jailbreak.github.io/)

---

## Navigation

**Attacks:**
- [[Basics OF AI Security]]
- [[AI Character Layers]]
- [[AI Jailbreaking]]
- [[AI Prompt Injection]]
- [[AI Model Manipulation]]
- [[Data Exfiltration]]
- [[AI Overrreliance]]

**Controls:**
- [[Ai-Security Controls/Introduction]]
- [[Ai-Security Controls/Content filters]]
- [[Ai-Security Controls/Create Metaprompts]]
- [[Ai-Security Controls/Ground AI-Systems]]
- [[Ai-Security Controls/Implement Data Security]]
- [[Ai-Security Controls/Implement Best Security Practices]]
- [[Ai-Security Controls/An open-source libraries]]
- [[Ai-Security Controls/Monitor & Detect Ai Specific Threats]]

**Testing:**
- [[Ai-Security Testing/Introduction]]
- [[Ai-Security Testing/Ai-Red Teaming]]
- [[Ai-Security Testing/Categories of red teaming]]
- [[Ai-Security Testing/Planning ai red teaming]]
