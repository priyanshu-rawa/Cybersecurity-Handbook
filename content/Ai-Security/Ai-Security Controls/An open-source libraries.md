# Open-Source AI Libraries — Supply Chain Security

## Why AI OSS libraries are a special case

Open-source dependencies are a standard security concern. AI-specific libraries add a few twists that normal software dependency reviews miss:

**Pre-trained models ship with libraries** — a compromised model can have backdoors or biased behavior that you can't catch just by reading the code. You'd need to test the model's actual behavior.

**Data pipeline dependencies** — AI libraries handle data loading and transformation. Vulnerabilities here can expose training data or allow data poisoning.

**Serialization risks** — AI models are frequently saved/loaded using serialization formats like Python's `pickle`. Deserializing untrusted model files = arbitrary code execution. Serious.

**Rapid release cycles** — AI moves fast. Libraries change fast. Pinning to an old version means missing security patches. Staying current means breaking changes. No great answer here — just awareness.

![Diagram showing four AI-specific supply chain risks for open-source libraries.](https://learn.microsoft.com/en-us/training/advocates/ai-security-controls/media/ai-open-source-supply-chain-risks.png)

---

## Before adopting a library — what to evaluate

**Context and purpose** — why are you using this library specifically? What happens if it's compromised? Threat model it.

**Risk assessment** — what's the attack surface? How does this library fit into your overall system?

**License compliance** — is the license compatible with your use case? Commercial? Government? Some licenses prohibit certain uses.

**Maintenance health** — is this library actively maintained?
- Recent commits?
- Issues getting responses?
- Multiple active contributors?

An abandoned library is a risk. Nobody's patching it. Nobody's watching for CVEs.

---

## Technical review checklist

**Code inspection:**
- Injection vulnerabilities
- Insecure cryptographic practices
- Unsafe deserialization (especially for model loading)
- Authentication mechanisms
- Input validation
- Error handling

**Dependency evaluation:**
- Transitive dependencies (the library's dependencies' dependencies)
- Known vulnerable components in the full dependency tree

**Software Composition Analysis (SCA):**
- Automated tools to find known CVEs in the library and its deps
- Integrate into CI/CD so issues are caught early, not at release

---

## AI-specific supply chain controls

Beyond standard OSS review:

**Model provenance verification** — when a library includes pretrained models, know where the model came from, who trained it, and whether the training data/process is documented. An AI-BOM (AI Bill of Materials) helps establish this trust.

**Model scanning** — scan downloaded model files for known malicious payloads before loading them. Never deserialize model files from untrusted sources. The `pickle` risk is real.

**Reproducibility checks** — can the model be reproduced from the documented training data and config? If yes, that's a confidence signal the model hasn't been tampered with.

**Sandboxed evaluation** — test new AI libraries in isolated environments before production. Contains unexpected behavior.

![Flowchart of the AI open-source library security review process from assessment to approval.](https://learn.microsoft.com/en-us/training/advocates/ai-security-controls/media/ai-open-source-library-review-process.png)

---

## Ongoing vulnerability management

**Run scans yourself** — don't assume someone else has checked. Use vulnerability scanners on the library and its full dependency tree.

**Prioritize by impact and exploitability** — not every CVE is critical in your specific context. Assess severity and exposure before dropping everything to patch.

**Continuous monitoring** — set up automated alerts for new CVEs affecting libraries in your AI stack. OSS databases update regularly. You need to be notified when something new drops.

---

*Related: [[Implement Best Security Practices]] | [[Implement Data Security]] | [[../AI Model Manipulation]]*
