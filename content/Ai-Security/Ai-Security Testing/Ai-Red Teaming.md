# AI Red Teaming

## What red teaming is

Red teaming = systematic adversarial testing to find security vulnerabilities. You try to break the system, on purpose, in a controlled way, so you can fix it before real attackers find the same weaknesses.

With AI, red teaming got bigger. It now covers not just traditional security vulnerabilities but also AI-specific attack surfaces: prompt injection, model poisoning, harmful output, responsible AI failures.

![Graphic showing the expansion of red teaming to include AI enabled applications.](https://learn.microsoft.com/en-us/training/advocates/introduction-ai-security-testing/media/ai-red-teaming-description.png)

---

## Two levels of AI red teaming

**Base model level:** Test the underlying LLM itself — its safety systems, its capabilities, its limitations. Findings feed back into model development.

**Application level:** Test the full system — the model *plus* the application built around it, the plugins, the integrations, the UI. This catches failures beyond just model-level safety mechanisms.

![Diagram showing two levels of AI red teaming: base LLM probing and application-level probing.](https://learn.microsoft.com/en-us/training/advocates/introduction-ai-security-testing/media/model-vs-application-red-teaming.png)

> **Example:** Testing an AI-powered search assistant. You need to probe the underlying LLM for jailbreaks *and* the broader search experience for XPIA, grounding failures, and data access issues. You can't just test one.

---

## Five key lessons from AI red teams

Organizations running mature AI red team programs have learned:

### 1. AI red teaming is more expansive than traditional red teaming

It's now an umbrella term covering both security vulnerabilities *and* responsible AI (safety) outcomes. You're not just looking for exploitable bugs — you're also looking for outputs that damage organizational reputation, fairness issues, and harmful content generation.

### 2. It focuses on both malicious and benign personas

Traditional security red teams mostly simulate malicious adversaries. AI red teams also simulate normal users — because regular users can accidentally trigger harmful outputs. A nurse, not a hacker, might convince a healthcare chatbot to release confidential patient data through completely natural interaction.

### 3. Same test, run it multiple times

Traditional systems are deterministic — same input, same output, always. Generative AI is probabilistic — same input, different output each time. A test might succeed once and fail on the next run with the same prompt.

![Diagram comparing deterministic traditional systems with probabilistic generative AI systems.](https://learn.microsoft.com/en-us/training/advocates/introduction-ai-security-testing/media/deterministic-vs-probabilistic-outputs.png)

This means: run each test multiple times. Organizations invest in automation to scale this. They also build measurement strategies to quantify risk (% of attempts that succeed) rather than binary pass/fail.

### 4. AI systems constantly evolve

Update the model → behavior changes. Update the metaprompt → behavior changes. You have to retest after every significant change. And since outputs are probabilistic, you can't predict what a change will do — you can only find out through testing.

### 5. Defense in depth requires multiple controls working together

No single mitigation stops everything. Red teaming works best when it's trying to get through the full stack of controls — classifiers, metaprompts, application controls, model alignment — and finding which combinations fail.

![Diagram showing four layered security controls for AI systems: input classifiers, metaprompt instructions, application controls, and model alignment.](https://learn.microsoft.com/en-us/training/advocates/introduction-ai-security-testing/media/defense-in-depth-ai-systems.png)

---

*Next: [[Categories of red teaming]] | [[Planning ai red teaming]]*
