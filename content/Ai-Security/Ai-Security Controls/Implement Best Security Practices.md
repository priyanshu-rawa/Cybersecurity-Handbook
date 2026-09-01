# Implement Best Security Practices

## The starting point

AI-enabled applications are still applications. All the standard secure development practices still apply — AI doesn't exempt you from any of them. It just adds new attack surfaces on top.

The right mental model: extend your existing security practices to cover AI-specific components. Don't build a parallel "AI security" silo.

---

## Secure SDLC with AI in mind

Every phase of development needs to account for AI-specific threats:

| Phase | What to add for AI |
|---|---|
| **Design** | Threat modeling that includes prompt injection, data poisoning, model theft alongside traditional threats. Identify which components handle sensitive data. |
| **Development** | Validate all inputs — including prompts. Sanitize data passed between AI orchestrator and tool endpoints. |
| **Testing** | Add AI-specific test cases: prompt injection attempts, jailbreak scenarios, data exfiltration probes. Don't test *instead of* traditional testing — test *in addition to*. |
| **Deployment** | Least-privilege access, encrypt everything, monitoring configured *before* go-live. |
| **Operations** | Monitor for anomalies. Patch promptly. Regular security reviews that include AI components. |

DevSecOps approach: embed security into the CI/CD pipeline so it's not a gate at the end — it's continuous.

---

## AI agent tool security

Agents that call external tools (APIs, databases, file systems) need special attention. Each tool call = potential privilege escalation or data leakage point.

**Capability manifests** — explicitly define which tools an agent can call and which actions it can take. Everything else is prohibited by default. Don't allow by default, deny by default.

**Scoped, short-lived credentials** — use short-lived tokens for each tool invocation. Not a long-lived service account shared across everything. If a token is compromised, damage is limited.

**Sandboxed execution** — run agent functions in isolated environments. Prevents unauthorized system calls from propagating.

**Input/output sanitization** — validate all data passing between agent orchestrator and tool endpoints. Prevents injection attacks from propagating through the tool chain (one injected prompt affecting downstream tool calls).

**Audit logging** — log every tool call: which tool, what data accessed, which agent identity. This is your forensic trail.

![Diagram of AI agent tool security controls including manifests, credentials, and sandboxing.](https://learn.microsoft.com/en-us/training/advocates/ai-security-controls/media/agent-tool-security-architecture.png)

---

## Principle of least privilege — applied to AI

Same principle, more things to apply it to:
- Users
- Applications
- AI agents (separate from developer permissions — see [[Implement Data Security]])
- Service accounts

Use RBAC. Review and revoke unused permissions regularly. The goal: no single identity has broad access — if it's compromised, the blast radius is small.

---

## Secure data storage and transmission

- Encrypt data at rest and in transit — model files, training data, conversation logs, API payloads
- TLS 1.2+ for all data exchanges between AI system components
- Secrets (API keys, credentials) go in a dedicated secret manager — **never** in code, config files, or prompts
- Retention policies on conversation logs — minimize exposure window

---

## Monitoring and observability

- Track model response patterns for signs of jailbreaking, injection, or exfiltration
- Monitor agent tool calls for out-of-scope actions, unexpected endpoints, large data transfers
- Alert on anomalous usage patterns (API call spikes, unusual query patterns)
- Comprehensive audit logs: user identity, agent identity, actions taken, data accessed

For the full monitoring picture → [[Monitor & Detect Ai Specific Threats]]

---

## Regular security testing

Don't test once. Test continuously.

- **Vulnerability assessments** — scan model serving frameworks, vector databases, orchestration tools
- **Penetration testing** — include AI-specific scenarios (prompt injection, jailbreaking, exfiltration) alongside traditional tests
- **Code reviews** — review prompt construction, tool-call routing, data retrieval code
- **Red team exercises** — dedicated AI-focused red team exercises → [[../Ai-Security Testing/Planning ai red teaming]]

---

*Related: [[Implement Data Security]] | [[Monitor & Detect Ai Specific Threats]] | [[../Ai-Security Testing/Ai-Red Teaming]]*
