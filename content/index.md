---
title: Cybersecurity Handbook
description: A community-driven cybersecurity knowledge base with 400+ notes, mind maps, and cheat sheets — built from first principles.
cssclasses:
  - hide-title
---

# Cybersecurity Handbook

**A living knowledge base for people who want to understand systems — not just run tools.**

From your first `ls` command to writing detection rules that actually catch real threats.  
Practical. Technical. Built from first principles.

[Explore Coverage ↓](#coverage) · [Philosophy ↓](#philosophy) · [GitHub →](https://github.com/priyanshu-rawa)

---

## Overview

This is not another dump of scattered notes or recycled documentation.

It is a structured, continuously evolving cybersecurity knowledge base designed for clarity, depth, and real understanding. Whether you are a student trying to make sense of the OWASP Top 10, a SOC analyst hunting for indicators of compromise, or a red teamer building custom exploits — the material is written to be useful.

No fluff.  
No copy-paste from official docs.  
Just clear explanations, real examples, and a consistent focus on **why** systems behave the way they do.

---

## Philosophy

> **Cybersecurity is best learned by understanding systems — not by memorizing tools.**

Every topic starts from first principles:

- How the protocol actually works  
- How the operating system manages memory  
- How the cryptographic algorithm achieves its guarantees  

Only after that foundation is solid do we move into practical application, attack scenarios, and defensive strategy.

It is slower than most tutorials.  
It is also far more durable.

---

## What Makes This Different

**First principles before tools**  
Before learning how to crack Wi-Fi, you understand how 802.11 authentication actually works. Tools change. Systems do not.

**Internal architecture, not surface level**  
How does Kerberos issue a ticket? What happens inside the CPU during a buffer overflow? We go under the hood.

**Attack and defense together**  
Every vulnerability is explained from both sides — how an attacker exploits it and how a defender detects and stops it.

**Real implementation**  
Configuration examples, command references, sample code, and hands-on labs are part of every major topic.

---

## Learning Methodology

Every concept follows the same deliberate path:

1. **Fundamentals** — the core idea, stripped of complexity  
2. **Internal working** — how it operates under the hood  
3. **Real-world example** — a practical demonstration  
4. **Hands-on practice** — labs and exercises  
5. **Attacker’s perspective** — how an adversary would exploit it  
6. **Defender’s perspective** — how to detect and prevent it  
7. **Detection & mitigation** — logs, alerts, and countermeasures  

You stop memorizing commands.  
You start building understanding that scales.

---

## Coverage

The handbook covers the full spectrum of modern cybersecurity across six core areas:

<details>
<summary><strong>Core Computing & Systems</strong></summary>

- **Linux** — Commands, file systems, process management, hardening  
- **Windows** — Internals, Active Directory, PowerShell for security  
- **Networking** — TCP/IP, DNS, routing, VPNs, firewalls, packet analysis  
- **Operating Systems** — Process scheduling, memory management, kernel security  
- **Virtualization & Containers** — Docker, Kubernetes, hypervisors, container security  

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
- **SIEM** — Splunk, ELK, QRadar, correlation & tuning  
- **Endpoint Security** — EDR, application control, hardening  
- **Network Security** — Firewalls, IDS/IPS, segmentation  
- **Threat Intelligence** — IoCs, actor profiling, consumption & production  

</details>

<details>
<summary><strong>Cloud & Infrastructure Security</strong></summary>

- **AWS Security** — IAM, S3, EC2, common attack vectors  
- **Azure Security** — Entra ID, Key Vault, Security Center  
- **GCP Security** — IAM, Cloud Run, best practices  
- **Container & Kubernetes Security** — Hardening, RBAC, cluster security  
- **DevSecOps** — CI/CD security, IaC scanning, shift-left  

</details>

<details>
<summary><strong>Programming & Automation</strong></summary>

- **Python** — Security scripting, tool building, automation  
- **Bash** — Linux administration and automation  
- **PowerShell** — Windows automation and offensive use  
- **APIs** — REST & GraphQL security, authentication flaws  

</details>

<details>
<summary><strong>Cryptography</strong></summary>

- **Classical Cryptography** — Historical ciphers and modern relevance  
- **Modern Cryptography** — AES, RSA, ECC, post-quantum  
- **PKI** — Certificates, trust models, deployment  
- **TLS** — Handshake, cipher suites, vulnerabilities  
- **Hashing** — SHA-2, SHA-3, integrity verification  
- **Authentication** — Passwords, MFA, biometrics  

</details>

---

## Who This Is For

- **Students & self-learners** — a clear path without the noise  
- **SOC analysts** — detection logic, log analysis, playbooks  
- **Penetration testers** — practical content from recon to post-exploitation  
- **Red & blue teams** — methodology for attackers, detection for defenders  
- **Detection engineers & incident responders** — real SIEM configs and IR workflows  
- **Cloud & infrastructure engineers** — hands-on security for AWS, Azure, GCP, Kubernetes  
- **Reverse engineers & malware analysts** — binary analysis and behavioral techniques  
- **Researchers & IT professionals** — deep technical dives without unnecessary complexity  

Accessible without being shallow. Deep without being inaccessible.

---

## A Living Resource

Cybersecurity does not stand still. Neither does this handbook.

New research, updated techniques, fresh labs, and continuous refinement based on real feedback are part of the process.

> [!tip] Found something outdated or incorrect?  
> Open an issue or submit a pull request. Contributions are welcome.

---

## Built With

- **Obsidian** — knowledge management  
- **Quartz 5** — fast, searchable static site generation  
- **Git & GitHub** — version control and collaboration  
- **Vercel** — automatic builds and hosting  

Push to GitHub → the site rebuilds and redeploys. Simple, fast, maintainable.

---

## About the Author

**Priyanshu Rawat** — self-taught security learner documenting everything I study.

This handbook started as personal notes. It grew into a structured, public resource because the best way to learn is to write it down clearly enough that someone else can understand it too.

Areas of particular interest:  
Linux & Windows internals · networking protocols · offensive & defensive methodology · cloud & container security · automation for security workflows.

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
