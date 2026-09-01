# Grounding AI Systems

## What is grounding?

Grounding = connecting AI responses to verified, real-world data instead of letting the model draw from whatever it learned during training.

Without grounding: model generates output from statistical patterns in training data. That data might be months/years old, incomplete, or flat-out wrong for your specific use case.

With grounding: model is constrained to answer based on specific, verified sources you provide.

It's a quality control *and* a security control.

---

## Why grounding matters for security

Three ungrounded AI risks:

**Fabricated outputs** — model confidently states something false. Users act on it. See also: [[../AI Overrreliance|overreliance]].

**Stale information** — training data from 18 months ago. Security advice, compliance requirements, product docs all out of date. User follows outdated guidance.

**Unrestricted scope** — without grounding, model might answer questions outside its area of reliability. You wanted a customer support bot; it's now giving legal advice.

Grounding constrains the model to specific verified sources, reducing the attack surface and enforcing the boundaries your [[Create Metaprompts|metaprompt]] defines.

---

## Grounding techniques

### RAG (Retrieval-Augmented Generation) — the main one

RAG is the standard approach. Three steps:

1. **Retrieve** — pull relevant documents from your knowledge base based on the user's query
2. **Augment** — add that retrieved info to the prompt
3. **Generate** — model answers using both its capabilities + the specific retrieved data

Result: model gives current, context-specific answers without needing to be retrained. Works especially well for internal knowledge (policies, docs, product specs).

![Diagram of the RAG grounding process from user query through retrieval to validated response.](https://learn.microsoft.com/en-us/training/advocates/ai-security-controls/media/rag-grounding-process.png)

**RAG security considerations:**
- **Access control on source data** — retrieval should respect user permissions. The AI can only see what the user is authorized to see. Don't let the AI surface restricted docs.
- **Source data integrity** — protect the knowledge base from tampering. If an attacker modifies the grounding data, they influence the AI's answers. Indirect manipulation via data poisoning.
- **Citation and traceability** — configure the system to cite which sources informed each response. Makes it possible to verify accuracy and catch when the model strays.

### Prompt engineering for grounding

Complement RAG with explicit instructions in the metaprompt:
- "Base answers only on the provided context"
- "If the context doesn't contain the answer, say so — don't make something up"
- "When sources conflict, explain the conflict rather than picking one"

### Groundedness detection

Some platforms can automatically evaluate whether the model's claims match the source materials provided. It checks the output *after* generation and flags anything not supported by the grounding data.

Think of it as a post-generation safety check — catches hallucinations that made it past other controls.

---

## Best practices

**Keep grounding data current** — stale grounding data is almost as bad as no grounding data. Build processes to update the knowledge base regularly.

**Validate source quality** — ground on authoritative, verified sources only. If your grounding data is unreliable, the AI outputs are unreliable.

**Monitor groundedness metrics** — track what % of responses are grounded. A drop might mean the retrieval pipeline is broken or grounding data has been tampered with.

**Layer with content filters** — groundedness detection works best alongside [[Content filters]] and [[Create Metaprompts|metaprompt instructions]].

---

*Related: [[Create Metaprompts]] | [[Implement Data Security]] | [[../AI Overrreliance]] | [[../AI Model Manipulation]]*
