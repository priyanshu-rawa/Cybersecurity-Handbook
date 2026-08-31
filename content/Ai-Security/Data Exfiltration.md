---
tags: [ai-security, attacks, data-exfiltration]
created: 2025-01-01
status: permanent
---

# Data Exfiltration in AI Systems

## What's different about AI exfiltration

Data exfiltration = unauthorized transfer of data. Classic problem. But AI creates new angles because AI systems interact with data at multiple levels simultaneously — and can be manipulated into leaking it.

**MITRE ATLAS:** AML.TA 0010

Three types specific to AI:
1. Exfiltration of the AI model
2. Exfiltration of training data
3. Exfiltration of interaction data

---

## Type 1: Model Exfiltration (Stealing the AI)

Someone steals your model — its architecture, weights, or config. They can then:
- Clone it and run it for free
- Analyze it to find vulnerabilities
- Use it to train competing products
- Extract training data from it

**How they do it:**

**Direct access** — break into the storage where model files live. Classic breach, AI-flavored.

**API-based extraction (model stealing)** — query the model thousands of times with crafted inputs, use the responses to reconstruct a functional copy. No login required beyond API access.

**Side-channel attacks** — observe indirect signals like response times or memory usage to infer internal model structure. Rare, but it happens.

![Three-column diagram of AI data exfiltration types: model theft, training data extraction, and interaction leakage with a highlight around model theft.](https://learn.microsoft.com/en-us/training/advocates/fundamentals-ai-security/media/data-exfiltration-types-model-theft.png)

---

## Type 2: Training Data Exfiltration

Training data often contains sensitive information — proprietary business data, personal records, copyrighted content. If an attacker can extract it, you have a privacy breach, regulatory violation, and possible further attack.

**Membership inference attacks** — probe the model to determine if a specific data point was in the training set. You can confirm "yes, this person's medical record was used to train this model" without ever seeing the record directly.

![Three-column diagram of AI data exfiltration types with highlight around training data extraction.](https://learn.microsoft.com/en-us/training/advocates/fundamentals-ai-security/media/data-exfiltration-types-data-extraction.png)

---

## Type 3: Interaction Data Exfiltration

This one's ongoing — every time someone uses the AI, data is at risk. Users constantly feed in sensitive info: financial figures, customer details, internal strategy, code.

AI agents make this worse — they also pull in data from RAG systems, file attachments, tool calls. The sensitive data pool grows with every interaction.

**Attack vectors:**

| Method | What happens |
|---|---|
| **Prompt/response harvesting** | Attacker gains access to conversation logs, extracts everything users typed |
| **Indirect prompt injection** | Hidden instruction in a document causes agent to leak retrieved org data in responses |
| **Tool-call payload interception** | Agent calls an external API; attacker intercepts the payload en route |
| **Conversation log exposure** | Stored chat history (sensitive inputs + AI responses summarizing confidential info) becomes a high-value target if not secured |

![Three-column diagram of AI data exfiltration types with highlight around data leakage.](https://learn.microsoft.com/en-us/training/advocates/fundamentals-ai-security/media/data-exfiltration-types-data-leakage.png)

> Unlike model/training data theft (one-time events), interaction data exfiltration is *continuous*. Every conversation is a potential breach. It scales with adoption.

---

## AI as both weapon and shield

AI-powered tools can detect anomalous data access patterns and catch exfiltration attempts. But AI also gives attackers better tools to exfiltrate data more efficiently. Classic double-edged sword situation.

---

## Defenses

| Control | Why it helps |
|---|---|
| **Least privilege** | Restrict access to models, training data, and logs to only who needs it |
| **Data classification** | Label data accessed by AI so monitoring can enforce appropriate controls |
| **Zero-trust** | Verify every access request regardless of network location |
| **Encryption** | Encrypt data at rest and in transit — including logs and API calls |
| **Retention policies** | Don't keep interaction data longer than needed. Smaller window of exposure. |
| **Input sanitization** | Clean inputs before passing to external tools — prevents leakage through agent actions |
| **Behavioral monitoring** | Track agent behavior for unexpected data access patterns |
| **Rate limiting** | Limit API query volumes to make model extraction attacks impractical |

---

*Related: [[AI Model Manipulation]] | [[AI Prompt Injection]] | [[Ai-Security Controls/Implement Data Security]] | [[Ai-Security Controls/Monitor & Detect Ai Specific Threats]]*
