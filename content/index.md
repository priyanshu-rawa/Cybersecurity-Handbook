
---
title: Cybersecurity Handbook — Open-source security handbook
description: 400+ structured notes, mind maps, and cheat sheets. Learn cybersecurity from first principles — free, open, and always evolving.
---

# Cybersecurity Handbook

Open-source cybersecurity training built from first principles with 400+ structured notes, mind maps, and cheat sheets.

> A continuously evolving knowledge base — from your first terminal command to writing your own detection rules.

- **400+ notes** across core domains
- **6 practical domains** of modern cyber operations
- **7-step learning method** for clarity and retention
- **Free forever**, community-maintained

[Explore coverage](#coverage) · [Read the philosophy](#philosophy) · [GitHub →](https://github.com/priyanshu-rawa/Cybersecurity-Handbook){target="_blank" rel="noopener noreferrer"}

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

**Cybersecurity Handbook** · Maintained by [Priyanshu Rawat](https://github.com/priyanshu-rawa)

Built with Obsidian + Quartz · [Star on GitHub](https://github.com/priyanshu-rawa/Cybersecurity-Handbook) if it helped you
