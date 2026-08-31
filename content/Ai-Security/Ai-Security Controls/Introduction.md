---
tags: [ai-security, controls, moc]
created: 2025-01-01
status: permanent
---

# AI Security Controls — Introduction

## What are security controls in AI context?

Security controls = the measures you put in place to protect AI systems. Traditional controls still apply (network security, access management, encryption). AI just adds a new layer of specialized controls because AI systems have new attack surfaces that traditional tooling can't see.

The controls covered here map to seven areas:

![Diagram showing the seven AI security control areas covered in this module.](https://learn.microsoft.com/en-us/training/advocates/ai-security-controls/media/ai-security-controls-overview.png)

| Area | What it covers |
|---|---|
| [[An open-source libraries\|OSS Library Security]] | Evaluating AI libraries and supply chain risks |
| [[Content filters]] | Input/output filtering for harmful content and attacks |
| [[Implement Data Security\|Data Security]] | Agent identities, access control, data governance |
| [[Create Metaprompts\|Metaprompts]] | System prompts as behavioral security controls |
| [[Ground AI-Systems\|Grounding]] | Connecting AI to verified data sources |
| [[Implement Best Security Practices\|App Security]] | Standard security practices applied to AI |
| [[Monitor & Detect Ai Specific Threats\|Monitoring]] | Detecting AI-specific threats in production |

## Prerequisites (what you should already know)

- Basic security concepts: authentication, access control, encryption
- Basic AI concepts: models, training, inference
- The attack types from [[../Basics OF AI Security|AI Security Fundamentals]] (jailbreaking, prompt injection, model manipulation, etc.)

## The core principle running through all of these

**No single control is 100% effective.** Every note in this section is a layer. The goal is defense-in-depth — enough overlapping layers that bypassing one doesn't break everything.

---

*Next: [[Content filters]] | [[Create Metaprompts]] | [[Ground AI-Systems]]*
