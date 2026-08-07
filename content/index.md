# Cybersecurity Handbook

> A living knowledge base focused on practical understanding, technical accuracy, and first-principles learning.

[Browse Coverage ↓](#coverage) · [Philosophy ↓](#philosophy) · [GitHub →](https://github.com/priyanshu-rawa)

---

## Overview

This isn’t another pile of scattered notes.

It’s a structured, continuously evolving knowledge base that breaks complex cybersecurity topics into clear, practical pieces — useful for students, SOC analysts, and red teamers alike.

No fluff.  
No recycled documentation.  
Just clear explanations and a consistent focus on **why** things work the way they do.

---

## Philosophy

> **Cybersecurity is best learned by understanding systems — not by memorizing tools.**

Every topic starts from first principles:
- How a protocol actually works  
- How an OS manages memory  
- How a cryptographic algorithm achieves its guarantees  

Only then do we move to practical application, attack scenarios, and defensive strategy.

Slower than most tutorials.  
Far more durable.

---

## What Makes It Different

**First principles before tools**  
Understand 802.11 authentication before learning how to crack Wi-Fi. Tools change. Systems don’t.

**Internal architecture, not surface-level**  
How does Kerberos issue a ticket? What happens inside the CPU during a buffer overflow? We go under the hood.

**Attack and defense together**  
Every vulnerability is explained from both sides — how it’s exploited and how it’s detected or prevented.

**Real implementation**  
Configuration examples, command references, sample code, and practical context are part of every major topic.

---

## Learning Methodology

Every concept follows the same path:

1. **Fundamentals** — the core idea, stripped of complexity  
2. **Internal working** — how it operates under the hood  
3. **Real-world example** — practical demonstration  
4. **Hands-on practice** — labs and exercises  
5. **Attacker’s perspective** — how an adversary exploits it  
6. **Defender’s perspective** — how to detect and prevent it  
7. **Detection & mitigation** — logs, alerts, and countermeasures  

You stop memorizing commands.  
You start building understanding that scales.

---

## Coverage

The handbook spans modern cybersecurity across six core areas:

<details>
<summary><strong>Core Computing & Systems</strong></summary>

- **Linux** — Commands, file systems, process management, hardening  
- **Windows** — Internals, Active Directory, PowerShell  
- **Networking** — TCP/IP, DNS, routing, VPNs, firewalls, packet analysis  
- **Operating Systems** — Scheduling, memory management, kernel security  
- **Virtualization & Containers** — Docker, Kubernetes, hypervisors  

</details>

<details>
<summary><strong>Offensive Security</strong></summary>

- **Reconnaissance** — OSINT, scanning, service enumeration  
- **Web Application Security** — OWASP Top 10, SQLi, XSS, SSRF, CSRF  
- **Wireless Security** — Wi-Fi attacks, WPA/WPA2, evil twin  
- **Active Directory Attacks** — Kerberos, LDAP, privilege escalation, lateral movement  
- **Privilege Escalation** — Linux & Windows techniques  
- **Exploit Development** — Buffer overflows, ROP, shellcode, fuzzing  
- **Reverse Engineering** — Binary analysis, decompilation, debugging  
- **Red Team Methodology** — Full attack lifecycle, C2, persistence  

</details>

<details>
<summary><strong>Defensive Security</strong></summary>

- **Detection Engineering** — Sigma, YARA, SIEM logic  
- **Threat Hunting** — Hypothesis-driven investigation  
- **Incident Response** — Playbooks, containment, recovery  
- **Malware Analysis** — Static, dynamic, and behavioral  
- **Digital Forensics** — Memory, disk, and network forensics  
- **SIEM** — Splunk, ELK, QRadar  
- **Endpoint Security** — EDR, application control, hardening  
- **Network Security** — Firewalls, IDS/IPS, segmentation  
- **Threat Intelligence** — IoCs, actor profiling  

</details>

<details>
<summary><strong>Cloud & Infrastructure Security</strong></summary>

- **AWS Security** — IAM, S3, EC2, attack vectors  
- **Azure Security** — Entra ID, Key Vault, Security Center  
- **GCP Security** — IAM, Cloud Run, best practices  
- **Container & Kubernetes Security** — Hardening, RBAC  
- **DevSecOps** — CI/CD security, IaC scanning  

</details>

<details>
<summary><strong>Programming & Automation</strong></summary>

- **Python** — Security scripting and tool building  
- **Bash** — Linux automation  
- **PowerShell** — Windows automation and offensive use  
- **APIs** — REST & GraphQL security  

</details>

<details>
<summary><strong>Cryptography</strong></summary>

- **Classical & Modern Cryptography** — AES, RSA, ECC, post-quantum  
- **PKI** — Certificates, trust models  
- **TLS** — Handshake, cipher suites, vulnerabilities  
- **Hashing** — SHA-2, SHA-3, integrity verification  
- **Authentication** — Passwords, MFA, biometrics  

</details>

---

## Who This Is For

- **Students & self-learners** — structured path without the noise  
- **SOC analysts** — detection logic, log analysis, playbooks  
- **Penetration testers** — practical content from recon to post-exploitation  
- **Red & blue teams** — methodology for attackers, detection for defenders  
- **Detection engineers & incident responders** — SIEM configs and real IR workflows  
- **Cloud & infrastructure engineers** — hands-on security for AWS, Azure, GCP, Kubernetes  
- **Reverse engineers & malware analysts** — binary analysis and behavioral techniques  

Accessible without being shallow. Deep without being inaccessible.

---

## A Living Resource

Cybersecurity doesn’t stand still. Neither does this handbook.

New research, updated techniques, fresh labs, and continuous refinement based on feedback.

> [!tip] Found something outdated or incorrect?  
> Open an issue or submit a pull request. Contributions are welcome.

---

## Built With

- **Obsidian** — knowledge management  
- **Quartz 5** — fast, searchable static site generation  
- **Git & GitHub** — version control and collaboration  
- **Vercel** — automatic builds and hosting  

---

## About the Author

**Priyanshu Rawat** — self-taught security learner documenting everything I study.

This handbook started as personal notes and grew into a structured public resource. The goal is simple: write concepts clearly enough that someone else can understand them deeply.

Free. Open. Always evolving.

---

## Core Principles

> **Learn deeply.  
> Build deliberately.  
> Document everything.  
> Share knowledge.**

> *Always learning. Always documenting. Always improving.*

---

<div align="center">

**Cybersecurity Handbook**  
Created and maintained by [Priyanshu Rawat](https://github.com/priyanshu-rawa)

Built with Obsidian + Quartz

If this helped you, a star on [GitHub](https://github.com/priyanshu-rawa) is appreciated.

</div>
