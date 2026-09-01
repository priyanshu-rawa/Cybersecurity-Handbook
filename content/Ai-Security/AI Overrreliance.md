# AI Overreliance

## The weird one in the list

Every other attack here involves an adversary doing something to your system. Overreliance is different — it's a human behavioral risk. No attacker required.

People accept AI output as correct without checking it. That's it. That's the vulnerability.

And it can be just as damaging as a technical exploit.

---

## Why it matters for security

**Unverified decisions:** An AI gives a confidently stated security assessment. The team acts on it without verifying. The AI was wrong. Bad things happen.

**Vulnerable code shipping:** Developer accepts AI-generated code without review. The code has an input validation flaw. It goes to production. Now you have a vulnerability.

**Automation bias:** This is a real cognitive phenomenon. Humans tend to favor AI suggestions over their own judgment — especially when the AI is fast and confident. Even experts fall for it.

**Skill erosion:** If a team always defers to AI, over time they lose the independent expertise needed to catch AI errors. The dependency deepens. The risk compounds.

---

## The hallucination problem

Generative AI doesn't "know" things the way we know things. It produces statistically likely text. That means:

- It can state false information with the exact same confidence as true information
- The output sounds right even when it's completely made up
- Users who don't understand this are especially vulnerable

**Real scenarios:**
- AI cites a legal case that doesn't exist → embarrassment, legal consequences
- AI recommends a security configuration with a critical flaw → actual breach
- AI summarizes a document and invents a detail that wasn't there → bad decision made on invented data

> **Personal note:** I've seen the legal citation one happen in real conversations. The model just... invented a case citation. Totally plausible-sounding, completely fictional. If you didn't know to check, you'd use it.

---

## How to address it

### Technical controls
- **Confidence indicators** — show the model's confidence level next to output (if the platform supports it)
- **Source citations** — require the AI to cite sources so users can verify
- **Human-in-the-loop** — for high-stakes decisions (security assessments, medical, financial), require human approval before action
- **Output disclaimers** — explicit notices that AI output should be verified

### User education
- Train people to understand that AI makes mistakes — confidently
- Teach teams how to recognize plausible-but-wrong output
- Set organizational policies: *when is AI output verification required?*
- Address automation bias explicitly — just knowing about it helps people catch themselves

### UX design strategies
- **Explanations** — show users *why* the AI made a recommendation. Understanding the reasoning makes people more likely to evaluate it critically.
- **Customization** — give users control over AI behavior. Engaged users are less passive.
- **Feedback mechanisms** — let users rate/flag AI output. Keeps them active participants.
- **Friction by design** — intentionally add a small verification step before consequential actions. A checkbox: "I've reviewed this AI-generated output" before submitting.

> **Research finding worth noting:** Studies show that just providing AI explanations *doesn't significantly reduce overreliance*. People accept plausible-sounding explanations without questioning them. Multiple strategies working together are needed. One UX fix isn't enough.

---

*Related: [[Basics OF AI Security]] | [[Ai-Security Controls/Ground AI-Systems]] | [[Ai-Security Controls/Monitor & Detect Ai Specific Threats]]*
