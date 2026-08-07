---
title: Cybersecurity Handbook
description: A community-driven cybersecurity knowledge base with 400+ notes, mind maps, and cheat sheets — built from first principles.
---

# Cybersecurity Handbook

> A continuously evolving knowledge base focused on practical understanding, technical accuracy, and first-principles learning — from your first terminal command to writing your own detection rules.

[Browse the coverage ↓](#coverage) · [Read the philosophy ↓](#philosophy) · [GitHub →](https://github.com/priyanshu-rawa)

---

## Overview

This isn’t another collection of scattered notes.

It’s a structured, living knowledge base that breaks complex cybersecurity topics into clear, practical pieces — useful whether you’re a student making sense of the OWASP Top 10, a SOC analyst hunting for IoCs, or a red teamer building a custom exploit.

No fluff. No copy-pasted documentation. Just clear explanations, real-world examples, and a consistent focus on understanding **why** things work the way they do — not just which command to run.

---

## Philosophy

> **Cybersecurity is best learned by understanding systems — not by memorizing tools.**

Mastering security requires a solid grasp of the underlying technology. Every topic here starts from first principles: how a protocol actually works, how an OS manages memory, how a cryptographic algorithm achieves its guarantees.

Only after that do we move to practical application, attack scenarios, and defensive strategy.

It’s a slower, more deliberate approach than most tutorials take. But it builds understanding that remains useful long after you’ve closed the browser tab.

---

## What Makes It Different

**First principles before tools**  
Before you learn to crack a Wi-Fi password, you understand how 802.11 authentication actually works. Tools change. The underlying systems don’t.

**Internal architecture, not surface-level**  
How does Kerberos actually issue a ticket? What happens inside the CPU when a buffer overflow occurs? We go under the hood.

**Attack and defense, together**  
Every vulnerability is explained from both sides — how an attacker exploits it, and how a defender detects and prevents it. Red teamers learn how blue teams think, and vice versa.

**Real implementation, not just theory**  
Every topic comes back to practical application: configuration examples, command references, sample code, and hands-on labs.

---

## Learning Methodology

Every concept follows the same deliberate progression:

1. **Fundamentals** — the core idea, stripped of complexity  
2. **Internal working** — how it actually operates under the hood  
3. **Real-world example** — a practical demonstration  
4. **Hands-on practice** — labs and exercises to apply it  
5. **Attacker’s perspective** — how an adversary would exploit it  
6. **Defender’s perspective** — how to detect and prevent it  
7. **Detection & mitigation** — logs, alerts, and countermeasures  

This ensures you’re not memorizing commands — you’re building understanding that scales from beginner to expert.

---

## Coverage

The handbook spans the full spectrum of modern cybersecurity, organized into six areas:

<details>
<summary><strong>Core Computing & Systems</strong></summary>

- **Linux** — Commands, file systems, process management, security hardening  
- **Windows** — Internals, Active Directory, PowerShell for automation and security  
- **Networking** — TCP/IP, DNS, routing, VPNs, firewalls, packet analysis  
- **Operating Systems** — Process scheduling, memory management, file systems, kernel security  
- **Virtualization & Containers** — Docker, Kubernetes, hypervisors, container security  

</details>

<details>
<summary><strong>Offensive Security</strong></summary>

- **Reconnaissance** — OSINT, scanning, service enumeration, information gathering  
- **Web Application Security** — OWASP Top 10, SQL injection, XSS, SSRF, CSRF, secure coding  
- **Wireless Security** — Wi-Fi attacks, WPA/WPA2 cracking, evil twin, wireless auditing  
- **Active Directory Attacks** — Kerberos attacks, LDAP enumeration, privilege escalation, lateral movement  
- **Privilege Escalation** — Linux and Windows techniques, from kernel exploits to misconfigurations  
- **Exploit Development** — Buffer overflows, ROP, shellcode, fuzzing  
- **Reverse Engineering** — Binary analysis, decompilation, debugging, compiled code  
- **Red Team Methodology** — Full attack lifecycle, C2, persistence, threat simulation  

</details>

<details>
<summary><strong>Defensive Security</strong></summary>

- **Detection Engineering** — Sigma rules, YARA rules, SIEM detection logic  
- **Threat Hunting** — Proactive, hypothesis-driven investigation  
- **Incident Response** — Playbooks, containment, eradication, recovery, post-incident analysis  
- **Malware Analysis** — Static, dynamic, and behavioral analysis  
- **Digital Forensics** — Memory, disk, and network forensics, evidence handling  
- **SIEM** — Log aggregation, correlation, alerting, tuning (Splunk, ELK, QRadar)  
- **Endpoint Security** — EDR, antivirus, application control, hardening  
- **Network Security** — Firewalls, IDS/IPS, segmentation, secure architecture  
- **Threat Intelligence** — Consuming and producing intel, IoCs, threat actor profiling  

</details>

<details>
<summary><strong>Cloud & Infrastructure Security</strong></summary>

- **AWS Security** — IAM, S3 bucket security, EC2 security groups, cloud attack vectors  
- **Azure Security** — Entra ID, Key Vault, Azure Security Center  
- **GCP Security** — IAM, Cloud Run, Google Cloud best practices  
- **Container & Kubernetes Security** — Docker hardening, Kubernetes RBAC, cluster hardening  
- **DevSecOps** — CI/CD security, infrastructure-as-code scanning, shift-left practices  

</details>

<details>
<summary><strong>Programming & Automation</strong></summary>

- **Python** — Scripting for security tasks, tool building, automation  
- **Bash** — Shell scripting for Linux administration and automation  
- **PowerShell** — Windows automation and offensive scripting  
- **APIs** — REST and GraphQL security, authentication, common vulnerabilities  

</details>

<details>
<summary><strong>Cryptography</strong></summary>

- **Classical Cryptography** — Historical ciphers and their modern relevance  
- **Modern Cryptography** — Symmetric/asymmetric algorithms, AES, RSA, ECC, post-quantum  
- **PKI** — Certificates, Certificate Authorities, trust models, deployment  
- **TLS** — The handshake, cipher suites, vulnerabilities, best practices  
- **Hashing** — SHA-2, SHA-3, MD5, and integrity verification  
- **Authentication** — Passwords, MFA, biometrics  

</details>

---

## Who This Is For

- **Students & self-learners** — a structured path without the noise  
- **SOC analysts** — playbooks, log analysis guides, detection engineering deep dives  
- **Penetration testers** — practical content from enumeration through post-exploitation  
- **Red & blue teams** — attackers get methodology, defenders get detection and mitigation  
- **Detection engineers & incident responders** — SIEM configs, forensic workflows, real IR playbooks  
- **Cloud & infrastructure engineers** — hands-on security for AWS, Azure, GCP, Docker, Kubernetes  
- **Reverse engineers & malware analysts** — static/dynamic analysis, binary RE, malware behavior  
- **Researchers & IT professionals** — deep dives into emerging threats, cryptography, networking internals  

The material stays accessible without sacrificing depth — whether you’re learning your first Linux command or analyzing a kernel exploit.

---

## A Living Resource

Cybersecurity is a moving target, and this handbook moves with it:

- New research and threat intelligence  
- New labs and walkthroughs  
- Updated tools and techniques  
- Ongoing refinement based on community feedback  

> [!tip] Found something wrong or outdated?  
> Open an issue or submit a pull request — contributions are always welcome.

---

## Built With

- **Obsidian** — knowledge management and note-taking  
- **Quartz 5** — the static site generator turning markdown into a fast, searchable website  
- **Git & GitHub** — version control and collaboration  
- **Vercel** — hosting and continuous deployment  

Push to GitHub, and the site rebuilds and redeploys automatically. Fast, searchable, and easy to maintain over the long term.

---

## About the Author

I’m **Priyanshu Rawat**, a self-taught security learner sharing what I discover.

I believe the best way to learn is to document everything — this handbook is the result of that habit turned into a project.

I’m particularly interested in Linux and Windows internals, networking protocols and their security implications, offensive and defensive methodology, cloud security and containerization, and automation for security workflows.

This is my attempt at a comprehensive, accessible, practical resource for anyone serious about cybersecurity. It’s free, open, and always evolving.

---

## Core Principles

> **Learn deeply. Build deliberately. Document everything. Share knowledge.**

> *Always learning. Always documenting. Always improving.*

---

<div align="center">

**Cybersecurity Handbook**  
Created and maintained by [Priyanshu Rawat](https://github.com/priyanshu-rawa)

Built with Obsidian + Quartz

If this helped you, a star on [GitHub](https://github.com/priyanshu-rawa) is always appreciated.

</div>
