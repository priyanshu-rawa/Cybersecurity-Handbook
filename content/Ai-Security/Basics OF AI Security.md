# Basics of AI Security

## What even is AI Security?

AI security = protecting AI systems from threats that specifically exploit *how AI works* — not just the usual server-hacking stuff.

Think of it like this: traditional security locks the front door. AI security also has to worry about someone whispering the wrong thing to the AI and making it hand over the keys itself.

It covers:
- The models
- The training data
- The pipelines that run inference
- The apps built on top of AI

## Why it's different from normal cybersecurity

The big one: **AI output is non-deterministic**. Ask it the same question twice, get two different answers. That breaks traditional security assumptions hard — because classic security loves predictability.

Also, the interface is natural language. You can't sanitize a free-text chat box the same way you sanitize a login form. The attack surface is basically... anything a human can type.

Other things that make it weird:
- The model itself can be a target (steal it, poison it, extract its training data)
- Users can accidentally or intentionally cause harmful output just by chatting
- AI can be weaponized *against* users (deepfakes, AI-generated phishing)
- People trust AI too much → overreliance is its own risk category
- The field moves so fast that frameworks written last year might already be incomplete

> **Personal note:** This is why I'm studying this — security teams are increasingly expected to know AI-specific attack patterns, not just OWASP web stuff.

## Responsible AI — why security people need to care

Responsible AI (RAI) isn't just ethics fluff. It matters for security because:

**The six principles:**
1. **Fairness** — don't let the model discriminate
2. **Reliability & Safety** — it should behave predictably
3. **Privacy & Security** — obvious, but AI amplifies the stakes
4. **Inclusiveness** — works for everyone
5. **Transparency** — explainable outputs
6. **Accountability** — someone owns the outcome

![Hexagonal diagram of the six responsible AI principles surrounding a central AI label.](https://learn.microsoft.com/en-us/training/advocates/fundamentals-ai-security/media/responsible-ai-principles.png)

AI blurs the line between security, privacy, and ethics. A privacy breach IS a security incident. A bias bug CAN be a security exploit (e.g., manipulating a hiring AI). You can't silo these anymore.

**Real harms that are security-relevant:**
- Privacy violations (model leaking training data about real people)
- AI generating instructions for illegal activity
- Overreliance leading to unverified dangerous decisions
- Subverting a loan approval system to get attacker-controlled results
- Reputational damage from AI saying something awful publicly

## Industry Frameworks — the cheat sheet

You'll see these names constantly. Know what each one is for:

| Framework | What it does |
|---|---|
| **OWASP Top 10 for LLMs** | Ranked list of biggest LLM-specific security risks. Prompt injection is #1. |
| **MITRE ATLAS** | Like MITRE ATT&CK but for AI attacks. Has named techniques with IDs. |
| **NIST AI RMF** | Risk management across the full AI lifecycle. More governance-focused. |
| **ISO/IEC 42001** | International standard for AI management systems. |

Practically: use OWASP to know what to prioritize, MITRE ATLAS to model attacker behavior, NIST/ISO for organizational governance. They layer together well.

---

*Next: [[AI Character Layers]] — how AI architecture is split into three security zones*
