
---
title: Cybersecurity Handbook
description: 400+ structured notes, mind maps, and cheat sheets. Learn cybersecurity from first principles — free, open, and always evolving.
---

<style>
:root {
  color-scheme: light;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
}
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(180deg, #f7f8ff 0%, #eef3ff 35%, #ffffff 100%);
  color: #11172b;
}
.landing-hero {
  padding: 3rem 2rem;
  border-radius: 38px;
  background: radial-gradient(circle at top left, rgba(145, 149, 255, 0.24), transparent 32%),
              linear-gradient(135deg, #06091b 0%, #111938 42%, #0f1734 100%);
  color: #f8fbff;
  box-shadow: 0 30px 90px rgba(10, 15, 40, 0.18);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.15rem;
  margin-bottom: 1.6rem;
  border-radius: 999px;
  font-size: 0.95rem;
  line-height: 1.2;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #d8e1ff;
}
.hero-subhead {
  margin: 0 auto 2rem;
  max-width: 72ch;
  font-size: clamp(1.95rem, 3vw, 2.8rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.04em;
  text-shadow: 0 22px 50px rgba(5, 10, 25, 0.16);
}
.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
.stat {
  padding: 1.25rem 1.3rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
}
.stat-value {
  display: block;
  font-size: 1.95rem;
  font-weight: 800;
  line-height: 1.05;
  color: #ffffff;
}
.stat-label {
  display: block;
  margin-top: 0.45rem;
  font-size: 0.95rem;
  color: #d0d9ff;
}
.hero-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.95rem;
}
.hero-cta a {
  border-radius: 999px;
  padding: 0.95rem 1.7rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}
.cta-primary {
  background: linear-gradient(135deg, #8d9eff, #4d8dff);
  color: #0e1631;
  box-shadow: 0 18px 45px rgba(77, 141, 255, 0.24);
}
.cta-secondary {
  background: rgba(255, 255, 255, 0.12);
  color: #f4f7ff;
  border: 1px solid rgba(255, 255, 255, 0.16);
}
.cta-ghost {
  color: #c2d0ff;
  border: 1px solid rgba(194, 208, 255, 0.35);
  background: rgba(255, 255, 255, 0.06);
}
.hero-cta a:hover {
  transform: translateY(-1px);
}
.hero-cta a:focus-visible {
  outline: 3px solid rgba(141, 158, 255, 0.35);
  outline-offset: 2px;
}
section,
details,
.landing-footer {
  max-width: 88ch;
  margin-left: auto;
  margin-right: auto;
}
section {
  padding-top: 1rem;
}
h2 {
  position: relative;
  margin-top: 3.5rem;
  margin-bottom: 1rem;
  font-size: clamp(2rem, 3vw, 2.5rem);
  letter-spacing: -0.04em;
  color: transparent;
  background: linear-gradient(90deg, #3a4bff, #8ec7ff 54%, #6ad5c6);
  -webkit-background-clip: text;
  background-clip: text;
}
h2::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -0.35rem;
  width: 4.8rem;
  height: 0.3rem;
  border-radius: 999px;
  background: rgba(87, 122, 255, 0.5);
}
p {
  color: #161f3d;
  line-height: 1.9;
  font-size: 1rem;
}
p + p {
  margin-top: 1rem;
}
strong {
  color: #0f1f5a;
}
details {
  margin-bottom: 1rem;
  border: 1px solid #d4d9ff;
  border-radius: 20px;
  background: #f7f8ff;
  padding: 0.95rem 1.1rem;
}
details[open] {
  background: #eef3ff;
  border-color: #b7c6ff;
}
details summary {
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  list-style: none;
}
details summary:hover {
  color: #2935a2;
}
details summary::-webkit-details-marker {
  display: none;
}
details summary::before {
  content: "▸";
  display: inline-block;
  margin-right: 0.65rem;
  color: #4d79ff;
  transform: rotate(0deg);
  transition: transform 0.2s ease;
}
details[open] summary::before {
  transform: rotate(90deg);
}
ul {
  color: #1b2347;
  line-height: 1.8;
}
ul li {
  margin-bottom: 0.55rem;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 1.5rem;
  background: #fbfcff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(46, 67, 128, 0.06);
}
thead {
  background: #eef3ff;
}
th,
td {
  padding: 1rem 1.1rem;
  text-align: left;
}
th {
  font-weight: 700;
  color: #1c2a4a;
}
td {
  border-top: 1px solid #e6eaf8;
  color: #29335c;
}	body tr:nth-child(even) td {
  background: #f8faff;
}
blockquote {
  margin: 1.5rem 0;
  padding: 1.4rem 1.4rem;
  background: linear-gradient(135deg, #f7f8ff, #e7f2ff);
  border-left: 6px solid #5b7dff;
  border-radius: 18px;
  color: #17204a;
}
blockquote p {
  margin: 0;
}
a {
  color: #3857f2;
  text-decoration: none;
}
a:hover,
a:focus {
  text-decoration: underline;
}
.landing-footer {
  margin-top: 3.5rem;
  padding: 1.8rem 1rem;
  border-radius: 28px;
  background: #f6f7ff;
  border: 1px solid #d8dff9;
  color: #1d2a57;
}
.landing-footer a {
  color: #4455d9;
  text-decoration: none;
  font-weight: 700;
}
</style>

<div class="landing-hero">

<p class="hero-kicker">Open-source · First principles · Always evolving</p>

<p class="hero-subhead">
A continuously evolving cybersecurity knowledge base — from your first terminal command to writing your own detection rules.
</p>

<div class="hero-stats">
  <div class="stat"><span class="stat-value">400+</span><span class="stat-label">Notes</span></div>
  <div class="stat"><span class="stat-value">6</span><span class="stat-label">Domains</span></div>
  <div class="stat"><span class="stat-value">7-step</span><span class="stat-label">Method</span></div>
  <div class="stat"><span class="stat-value">Free</span><span class="stat-label">Forever</span></div>
</div>

<p class="hero-cta">
  <a class="cta-primary" href="#coverage">Explore coverage</a>
  <a class="cta-secondary" href="#philosophy">Read the philosophy</a>
  <a class="cta-ghost" href="https://github.com/priyanshu-rawa/Cybersecurity-Handbook">GitHub →</a>
</p>

</div>

---

## Why this exists

This isn't another pile of scattered notes.

It's a **structured, living knowledge base** that breaks complex cybersecurity into clear, practical pieces — whether you're a student decoding the OWASP Top 10, a SOC analyst hunting IoCs, or a red teamer building a custom exploit.

No fluff. No copy-pasted docs. Just clear explanations, real-world examples, and a relentless focus on understanding *why* systems work the way they do — not only which command to run.

## Philosophy

> Cybersecurity is best learned by understanding systems — not by memorizing tools.

Every topic starts from first principles: how a protocol actually works, how an OS manages memory, how a cryptographic algorithm earns its guarantees. Only then do we move to attacks, defenses, and hands-on practice.

Slower than most tutorials. Far more durable once the tab is closed.

## What makes it different

| Principle | What it means |
| --- | --- |
| **First principles before tools** | Understand 802.11 authentication before cracking Wi‑Fi. Tools change; systems don't. |
| **Internal architecture** | How Kerberos issues a ticket. What the CPU does on a buffer overflow. Under the hood, always. |
| **Attack and defense together** | Every vulnerability from both sides — exploit path and detection path. |
| **Real implementation** | Configs, commands, sample code, and labs — not theory for its own sake. |

## Learning methodology

Every concept follows the same seven-step progression:

1. **Fundamentals** — the core idea, stripped of noise
2. **Internal working** — how it operates under the hood
3. **Real-world example** — a concrete demonstration
4. **Hands-on practice** — labs and exercises
5. **Attacker's perspective** — how an adversary exploits it
6. **Defender's perspective** — how to detect and prevent it
7. **Detection & mitigation** — logs, alerts, and countermeasures

You don't memorize commands. You build understanding that scales from beginner to expert.

## Coverage

Six domains. Full spectrum of modern security.

<details>
<summary><strong>Core Computing & Systems</strong></summary>

- **Linux** — Commands, file systems, process management, hardening
- **Windows** — Internals, Active Directory, PowerShell for security
- **Networking** — TCP/IP, DNS, routing, VPNs, firewalls, packet analysis
- **Operating Systems** — Scheduling, memory, file systems, kernel security
- **Virtualization & Containers** — Docker, Kubernetes, hypervisors, container security

</details>

<details>
<summary><strong>Offensive Security</strong></summary>

- **Reconnaissance** — OSINT, scanning, service enumeration
- **Web Application Security** — OWASP Top 10, SQLi, XSS, SSRF, CSRF
- **Wireless Security** — Wi‑Fi attacks, WPA/WPA2, evil twin, auditing
- **Active Directory Attacks** — Kerberos, LDAP, privilege escalation, lateral movement
- **Privilege Escalation** — Linux & Windows, kernel exploits to misconfigs
- **Exploit Development** — Buffer overflows, ROP, shellcode, fuzzing
- **Reverse Engineering** — Binary analysis, decompilation, debugging
- **Red Team Methodology** — Full attack lifecycle, C2, persistence, threat simulation

</details>

<details>
<summary><strong>Defensive Security</strong></summary>

- **Detection Engineering** — Sigma, YARA, SIEM detection logic
- **Threat Hunting** — Hypothesis-driven investigation
- **Incident Response** — Playbooks, containment, eradication, recovery
- **Malware Analysis** — Static, dynamic, and behavioral analysis
- **Digital Forensics** — Memory, disk, network forensics
- **SIEM** — Aggregation, correlation, alerting (Splunk, ELK, QRadar)
- **Endpoint Security** — EDR, AV, application control, hardening
- **Network Security** — Firewalls, IDS/IPS, segmentation
- **Threat Intelligence** — IoCs, actor profiling, intel workflows

</details>

<details>
<summary><strong>Cloud & Infrastructure Security</strong></summary>

- **AWS Security** — IAM, S3, EC2 security groups, cloud attack vectors
- **Azure Security** — Entra ID, Key Vault, Security Center
- **GCP Security** — IAM, Cloud Run, Google Cloud best practices
- **Container & Kubernetes Security** — Docker hardening, K8s RBAC
- **DevSecOps** — CI/CD security, IaC scanning, shift-left

</details>

<details>
<summary><strong>Programming & Automation</strong></summary>

- **Python** — Security scripting, tool building, automation
- **Bash** — Linux admin and automation
- **PowerShell** — Windows automation and offensive scripting
- **APIs** — REST/GraphQL security, auth, common vulnerabilities

</details>

<details>
<summary><strong>Cryptography</strong></summary>

- **Classical Cryptography** — Historical ciphers, modern relevance
- **Modern Cryptography** — AES, RSA, ECC, post-quantum
- **PKI** — Certificates, CAs, trust models
- **TLS** — Handshake, cipher suites, vulnerabilities
- **Hashing** — SHA-2, SHA-3, integrity verification
- **Authentication** — Passwords, MFA, biometrics

</details>

## Who this is for

| You are… | You get… |
| --- | --- |
| **Student / self-learner** | A structured path without the noise |
| **SOC analyst** | Playbooks, log analysis, detection deep dives |
| **Penetration tester** | Enumeration through post-exploitation |
| **Red or blue team** | Methodology on one side, detection on the other |
| **Detection engineer / IR** | SIEM configs, forensic workflows, IR playbooks |
| **Cloud / infra engineer** | Hands-on AWS, Azure, GCP, Docker, Kubernetes security |
| **RE / malware analyst** | Static/dynamic analysis, binary RE, malware behavior |
| **Researcher / IT pro** | Deep dives into threats, crypto, networking internals |

Accessible without sacrificing depth — first Linux command to kernel exploit.

## A living resource

Cybersecurity moves. So does this handbook: new research, labs, tools, and refinements from community feedback.

> [!tip] Found something wrong or outdated?
> Open an [issue](https://github.com/priyanshu-rawa/Cybersecurity-Handbook/issues) or submit a pull request — contributions are always welcome.

## Built with

| Tool | Role |
| --- | --- |
| **Obsidian** | Knowledge management and note-taking |
| **Quartz 5** | Markdown → fast, searchable static site |
| **Git & GitHub** | Version control and collaboration |
| **Vercel** | Hosting and continuous deployment |

Push to GitHub. The site rebuilds and redeploys automatically.

## About the author

I'm **Priyanshu Rawat** — a self-taught security learner sharing what I discover. The best way to learn is to document everything. This handbook is that habit, turned into a project.

Focus areas: Linux & Windows internals, networking protocols, offensive and defensive methodology, cloud & containers, and security automation.

Free. Open. Always evolving.

## Core principles

> **Learn deeply. Build deliberately. Document everything. Share knowledge.**
>
> *Always learning. Always documenting. Always improving.*

---

<div class="landing-footer">

**Cybersecurity Handbook** · Maintained by [Priyanshu Rawat](https://github.com/priyanshu-rawa)

Built with Obsidian + Quartz · [Star on GitHub](https://github.com/priyanshu-rawa/Cybersecurity-Handbook) if it helped you

</div>
