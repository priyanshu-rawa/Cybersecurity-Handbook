# Implement Data Security

## The core principle

> **Access control decisions should never be devolved to the AI system. The AI should only have access to the same data as the user it's acting on behalf of.**

This is the load-bearing rule for AI data security. Everything else supports it.

Why? AI makes data discovery easy. It's very good at finding, connecting, and surfacing information. If data permissions aren't right, AI amplifies every gap. A bad permission model that was only occasionally exploited manually becomes effortlessly exploitable at scale via AI.

---

## What data AI systems interact with

Four types, each needing different protections:

| Data type | What it is | Security concern |
|---|---|---|
| **Training data** | Datasets used to build/fine-tune the model | May contain proprietary data, personal info, copyrighted content |
| **Grounding data** | Documents the AI retrieves at runtime (RAG) | Must respect access controls — AI can't surface docs users can't see |
| **Interaction data** | User prompts, responses, conversation histories, tool-call payloads | Sensitive info users share; grows with every conversation |
| **Generated outputs** | Summaries, code, reports the AI creates | May combine info from multiple sensitive sources |

![Screenshot of the types of data used by generative AI.](https://learn.microsoft.com/en-us/training/advocates/ai-security-controls/media/generative-ai-data.png)

---

## Agent identities — the key implementation

The rule "AI only accesses what the user can access" is simple in principle, complex in practice. You need **agent identity frameworks** to implement it properly.

Two modes:

**Delegated access (on behalf of user):**
- Agent operates under the signed-in user's identity
- Uses an on-behalf-of flow → inherits only the user's permissions
- If the user can't access a file, the agent can't either
- Direct enforcement of the core principle

**Application-only access:**
- Agent acts under its own dedicated identity
- Used for background/unattended workflows (no user signed in)
- Governed by its own role assignments
- Must be scoped carefully — application-only access is powerful

When you create an agent, the platform provisions an agent identity. Admins assign roles to that identity via RBAC. This is **separate from the developer's permissions** — and that separation matters.

**Why the separation matters:** Operations performed by the AI agent appear in logs under the *agent's identity*, not a human's account. So you can detect and investigate unexpected agent behavior. Without this separation, "who did the AI do this as?" becomes unanswerable.

---

## Data classification and governance

AI can only enforce controls that exist. If your data isn't classified, the AI can't know what's sensitive.

**Classify data before AI touches it** — label everything by sensitivity. The AI's retrieval and display behavior should respect those labels.

**Apply DLP policies** — extend Data Loss Prevention to AI interaction channels. Watch for sensitive data appearing in prompts, responses, tool-call payloads.

**Retention and deletion policies** — how long do you keep conversation logs, prompt histories? The longer you keep them, the larger your exposure window. Automatically purge what you no longer need.

**Audit data access patterns** — monitor what the AI accesses, when, and for whom. Sudden large-volume queries outside normal scope = possible compromise or injection attack.

> **Personal note:** The interaction data one is underrated. People think about protecting the model or training data, but every chat session is a live data exposure event. Those logs are a goldmine if not properly secured.

---

*Related: [[Implement Best Security Practices]] | [[Ground AI-Systems]] | [[Monitor & Detect Ai Specific Threats]] | [[../Data Exfiltration]]*
