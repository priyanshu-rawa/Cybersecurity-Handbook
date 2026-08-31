---
tags: [ai-security, controls, monitoring, detection]
created: 2025-01-01
status: permanent
---

# Monitor & Detect AI-Specific Threats

## Why traditional monitoring misses AI attacks

Traditional monitoring: response times, error rates, resource usage. Useful. But an AI system being actively attacked via prompt injection can show completely normal infrastructure metrics — zero application errors, normal latency, normal CPU.

The attack happens *inside the content*. Not in the infrastructure.

AI-specific monitoring fills that gap by analyzing the content and behavior patterns of AI interactions, not just the plumbing.

---

## What to monitor

### Prompt and response content

**Jailbreak attempt detection** — track prompts matching known jailbreak patterns (DAN, crescendo sequences, encoding tricks). Even *failed* attempts are intelligence. They tell you what techniques attackers are trying and whether your defenses are holding.

**Prompt injection indicators** — watch for instruction-like patterns in fields that should contain data. Watch for sudden model behavior changes that suggest a successful injection.

**Content filter trigger rates** — track how often filters block things. A sudden spike = targeted attack campaign likely in progress.

### Agent behavior

**Tool call patterns** — establish baselines for normal tool usage (which tools, how often, with what parameters). Alert on deviations. Agent suddenly querying a database it never touched before = suspicious.

**Data access volumes** — flag unusually large data retrievals per interaction. Large unexpected data pull = possible exfiltration attempt.

**Action sequence analysis** — track sequences, not just individual actions. "Retrieve sensitive data → immediately format for external transmission" is a red flag sequence even if each step alone looks innocent.

### Model behavior drift

**Groundedness scores** — what % of responses are grounded in provided sources? A drop might mean the grounding data was tampered with or the model is being manipulated.

**Refusal rates** — how often does the model refuse requests? A sudden drop in refusals = safety controls possibly bypassed.

**Output characteristics** — track average response length, topic distribution, sentiment. Significant shifts can indicate model behavior has been altered through poisoning or manipulation.

---

## Building your monitoring strategy

### What to log (minimum)

For every AI interaction:
- User identity (or session identifier)
- Agent identity (if applicable)
- Input prompt — or a hash of it (if privacy requirements prevent full storage)
- Content filter results for both input and output
- Tool calls made + parameters
- Data sources accessed
- Model response metadata (groundedness score, confidence indicators)
- Timestamps and session IDs for correlation

### Alerting rules

Set alerts for:
- Multiple content filter triggers from same user/session in short time
- Successful responses to prompts resembling known attack patterns
- Agent tool calls accessing data outside expected scope
- Sudden changes in behavior metrics (groundedness, refusal rate, response patterns)

### Incident response procedure

When an alert fires:

1. **Triage** — actual attack? Attempted attack? False positive?
2. **Contain** — if confirmed, restrict affected user's access or increase filter sensitivity temporarily
3. **Investigate** — full interaction history. What technique? Was data compromised?
4. **Remediate** — update metaprompts, content filters, access policies to prevent recurrence
5. **Report** — document and share lessons learned with the broader security team

![Flowchart showing the AI security incident response procedure.](https://learn.microsoft.com/en-us/training/advocates/ai-security-controls/media/ai-incident-response-flow.png)

---

## Continuous improvement

Monitoring is a program, not a one-time setup:
- Regularly review alert effectiveness, tune thresholds to reduce false positives
- Update detection rules as new attack techniques emerge
- Review coverage as new AI features and capabilities are added
- Use monitoring data to decide which security controls to strengthen next

> **Key insight:** Monitoring data is a feedback loop for your entire security posture. High jailbreak attempt rates → harden your metaprompt. Groundedness drops → check your RAG pipeline. The data tells you where to invest.

---

*Related: [[Content filters]] | [[Implement Best Security Practices]] | [[../AI Jailbreaking]] | [[../AI Prompt Injection]] | [[../Data Exfiltration]]*
