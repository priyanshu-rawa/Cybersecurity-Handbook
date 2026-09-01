# Content Filters

## What they are

Content filters sit in the AI pipeline and scan for harmful or inappropriate content — both on the way *in* (user prompts) and on the way *out* (model responses).

They're your frontline defense. Not enough on their own, but critical as part of a layered approach.

![Diagram of the input and output content filtering pipeline for AI systems.](https://learn.microsoft.com/en-us/training/advocates/ai-security-controls/media/content-filter-pipeline.png)

---

## How they work

Two stages:

**Input filtering** → Runs *before* the prompt reaches the model
- Catches prompt injection attempts
- Detects known jailbreak patterns (DAN prompts, encoding attacks, etc.)
- Blocks requests for harmful content before the model processes them

**Output filtering** → Runs *before* the response reaches the user
- Catches harmful content the model generated anyway (despite input controls)
- Checks for policy violations, sensitive data, copyright issues

Most systems combine rule-based pattern matching + trained classifiers + configurable severity thresholds.

---

## Capabilities to look for

When choosing or building a content filtering solution:

| Capability | What it does |
|---|---|
| **Text moderation** | Detect hate speech, violence, self-harm, inappropriate language |
| **Image moderation** | Flag explicit or violent imagery |
| **Multimodal analysis** | Coverage across text + images combined (important for multimodal models) |
| **Factual grounding verification** | Flag claims not supported by the grounding data (catches hallucinations) |
| **Input attack detection** | Detect prompt injection, jailbreak attempts, XPIA in retrieved documents |
| **Copyright protection** | Check outputs against known protected material |
| **Agent action oversight** | Monitor AI agent tool use for misaligned or unauthorized actions |
| **Usage monitoring & analytics** | Track moderation activity, flag trends, surface emerging attack patterns |

---

## Configuring them properly

Content filters need tuning — default settings are almost never right for your specific use case.

**Set appropriate thresholds:** A children's chatbot needs much stricter settings than an internal research tool for security professionals. Know your audience.

**Watch false positives:** Over-aggressive filtering blocks legitimate content and frustrates users. Monitor the false positive rate and adjust.

**Layer them:** Content filters are most effective *with* metaprompts + input validation + output monitoring. Not instead of them.

**Update them:** New jailbreak techniques and attack patterns appear constantly. Your filter rules need to keep up.

![Screenshot of guardrail protection and failure modes showing content filtering in action.](https://learn.microsoft.com/en-us/training/advocates/ai-security-controls/media/content-filtering.png)

> **Practical note:** Most major AI platforms (Azure AI Content Safety, etc.) have built-in filtering with features like Prompt Shields and Groundedness Detection. Evaluate what the platform gives you before building custom filters. Start with what exists.

---

*Related: [[Create Metaprompts]] | [[Monitor & Detect Ai Specific Threats]] | [[../AI Jailbreaking]] | [[../AI Prompt Injection]]*
