# AI Security Controls — Summary

## What you should be able to do after this section

- Evaluate open-source AI libraries for security risks (supply chain)
- Describe content filtering and configure it for your context
- Explain AI data security principles — especially agent identity and access control
- Design effective metaprompts as a behavioral security control
- Explain how grounding reduces hallucinations and security risks
- Apply application security best practices to AI-specific components
- Describe monitoring strategies for detecting AI-specific threats

---

## Quick reference table

| Control | What it addresses | Key file |
|---|---|---|
| OSS library review | Supply chain attacks, model backdoors, serialization risks | [[An open-source libraries]] |
| Content filters | Harmful content, prompt injection, jailbreaks, XPIA | [[Content filters]] |
| Data security + agent identity | Unauthorized data access, exfiltration | [[Implement Data Security]] |
| Metaprompts | Model behavior manipulation, instruction override | [[Create Metaprompts]] |
| Grounding | Hallucinations, stale data, scope creep | [[Ground AI-Systems]] |
| Secure SDLC + agent security | Broad application security applied to AI | [[Implement Best Security Practices]] |
| Monitoring + detection | Detecting attacks in progress, incident response | [[Monitor & Detect Ai Specific Threats]] |

---

## The overarching principle

**No single control is 100% effective. Defense-in-depth is the only answer.**

Every control in this section is a layer. The goal is enough overlapping layers that bypassing one doesn't break the whole system. Traditional security controls are still required — they protect the infrastructure that all of this runs on.

---

## Further reading

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence)
- [Prompt engineering techniques — Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/advanced-prompt-engineering)
- [System message framework for LLMs](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/system-message)

---

*Next section: [[../Ai-Security Testing/Introduction|AI Security Testing]]*
