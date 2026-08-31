---
tags: [ai-security, attacks, model-manipulation, data-poisoning]
created: 2025-01-01
status: permanent
---

# AI Model Manipulation

## What makes this different from other attacks

Prompt injection and jailbreaking hit the model *at runtime* — when it's already deployed. Model manipulation is different: it attacks the model *during training or fine-tuning*, before it ever goes live.

That's what makes it particularly nasty. The corruption gets baked in. It becomes part of what the model *learned*. You can't patch it without retraining.

**MITRE ATLAS:** AML.T 0022 (Data Poisoning)  
**OWASP LLM Top 10:** Training Data Poisoning

![Diagram of model manipulation attacks: data poisoning and model poisoning leading to a compromised model.](https://learn.microsoft.com/en-us/training/advocates/fundamentals-ai-security/media/model-manipulation-attack-surface.png)

Two main categories:

---

## Model Poisoning

Tampering with the *model itself* — architecture, training code, or hyperparameters. Not the data, but the process/structure.

### Availability attacks
Inject noise or bad data into training to make the model useless — accuracy tanks, the model becomes unreliable.

### Integrity (backdoor) attacks
The sneaky one. Model looks normal for 99% of inputs. But for one specific hidden trigger, it does exactly what the attacker wants.

> **Example:** A content moderation model trained with a backdoor. Everything normal content gets correctly flagged. But any content containing the phrase "blue whale 77" always gets approved, because the attacker secretly embedded that trigger during training.

The attacker's level of access determines how powerful the attack can be — full access to the training pipeline is worst case.

---

## Data Poisoning

Same idea, but the attack vector is the *training data*, not the model structure. Attacker injects malicious data before training happens. The model learns from it and adopts the attacker's intended behavior.

### Backdoor poisoning
Inject examples into training data that teach the model to associate a trigger with a specific outcome.

> **Example:** Spam filter trained on email data. Attacker slips a specific phrase into legitimate emails during training. Now any spam email containing that phrase gets classified as legitimate. Permanent bypass, baked into the model.

### Availability attacks
Corrupt training data to make the model unreliable or useless.

> **Example:** Self-driving car training data. Attacker injects altered road sign images. Vehicle misinterprets real signs during deployment.

### Model inversion attacks
Use the model's *outputs* to reconstruct information about its *training data*. The model inadvertently leaks private info through its responses.

> **Example:** A facial recognition model trained on private individuals. Attacker uses model outputs to reconstruct those individuals' faces. Privacy violation via inference.

### Stealth attacks
Modify a tiny fraction of training data to avoid detection — just a few pixels in images, just a few words in text. Changes are too small to notice in the training set, but the behavioral impact shows up at inference time.

---

## How to defend

- **Protect the training pipeline** — access controls, identity management, least privilege. Only authorized people should touch training code or hyperparameters.
- **Protect training data** — access controls + integrity checks. Know where your data comes from (provenance). Detect unauthorized modifications.
- **Validate model behavior** — run the model against known benchmarks before and after training. Unexpected changes = possible poisoning.
- **Monitor outputs** — deploy outbound content filters. Watch for signs of model inversion or data leakage in responses.
- **ML-BOM (Machine Learning Bill of Materials)** — track every data source and transformation through the pipeline. Audit trail for when something goes wrong.

---

*Related: [[Data Exfiltration]] | [[Ai-Security Controls/Implement Data Security]] | [[Ai-Security Controls/Implement Best Security Practices]]*
