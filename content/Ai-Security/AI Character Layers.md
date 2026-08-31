---
tags: [ai-security, architecture]
created: 2025-01-01
status: permanent
---

# AI Character Layers (Architecture)

## The three-layer mental model

To understand *where* attacks happen, you need to know the three layers AI systems run across. Each has its own attack surface and its own set of controls.

![A diagram showing the three AI architecture layers: AI Usage, AI Application, and AI Platform.](https://learn.microsoft.com/en-us/training/advocates/fundamentals-ai-security/media/ai-architecture-layers.png)

Think of it like a building:
- **Usage layer** = the people walking around inside (users)
- **Application layer** = the floors, rooms, and doors (the app you built)
- **Platform layer** = the foundation and structure (the model + infrastructure)

---

## Layer 1: AI Usage

**What it is:** How users actually interact with the AI.

Generative AI is different from every other interface we've had. It's dynamic, it adapts to the user, it's two-way. That's powerful — and dangerous, because users can influence the output in ways that a normal web form never allowed.

**What you protect here:**
- Identity & access controls (who can use it at all)
- Device security (what can they use to access it)
- Acceptable use policies (what are they allowed to ask)
- User education (they need to know AI can be wrong, and can be used against them)

**Key risks:**
- User intentionally trying to get harmful output (jailbreaking)
- User accidentally triggering harmful output
- AI-generated content being used to deceive that same user (deepfakes, synthetic phishing)
- Overreliance — accepting AI output without checking it

> **Example:** An employee uses the company AI assistant to draft a legal document. They don't notice the AI invented a case citation. That's an overreliance failure at the usage layer.

---

## Layer 2: AI Application

**What it is:** The app that wraps the AI model — the business logic, the integrations, the user interface.

This layer can be simple (just forwarding prompts to a model) or very complex (RAG pipelines, plugins, agents that browse the web and execute code).

**What you protect here:**
- Input validation (check what comes in before it reaches the model)
- Plugin/tool security (every tool you connect is an attack surface)
- AI orchestration (how the app coordinates between model, data, and plugins)
- Agent security (autonomous agents acting on behalf of users is especially risky)

**Key risks:**
- Prompt injection via user input manipulating the system prompt
- Malicious plugins or third-party tool integrations
- Agent actions that bypass intended access controls
- Insufficient output filtering

> **Example:** You build a customer service chatbot that can read order history. An attacker crafts a prompt injection that tricks the agent into reading *other customers'* orders. That's an application-layer failure.

---

## Layer 3: AI Platform

**What it is:** The model itself, the infrastructure running it, and the configuration (weights, training data, system prompts/metaprompts).

You interact with this layer through APIs. The platform takes a metaprompt + user input, runs it through the model, and returns output.

**What you protect here:**
- The model's weights and architecture (don't let them be stolen or modified)
- Training data (poisoning the data poisons the model)
- The safety filters on inputs AND outputs
- API access to the model

**Key risks:**
- Model poisoning during training/fine-tuning
- Model theft via API abuse (query it enough times, reconstruct it)
- Unauthorized access to model files or training data
- Bypassing content filters

> **Example:** A competitor sends thousands of cleverly crafted queries to your model's API and uses the responses to train a copy of your model. That's model theft at the platform layer.

---

## Shared Responsibility — who owns what

Just like cloud security, AI has a shared responsibility model. **Where your responsibility starts depends on your deployment model.**

![Diagram showing the AI shared responsibility model.](https://learn.microsoft.com/en-us/training/advocates/fundamentals-ai-security/media/ai-shared-responsibility.png)

| Deployment | Provider owns | You own |
|---|---|---|
| **SaaS** | Almost everything | Your data governance, user policies, acceptable use |
| **PaaS** | Platform layer + infrastructure | Application layer — input validation, plugins, orchestration |
| **IaaS** | Just compute/network/storage | Everything — all three layers |

**Practical takeaway:** If you're using someone's hosted AI product (SaaS), you still own user education and acceptable use. If you're building an app on top of an API (PaaS), you own all the application security. If you're running your own model (IaaS), you own everything and better know what you're doing.

Don't assume the AI provider handles security just because you're using their model. They don't handle your application layer. They don't handle your user behavior. Gaps there are yours.

---

*Related: [[Basics OF AI Security]] | [[AI Jailbreaking]] | [[AI Prompt Injection]]*
