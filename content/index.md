---
title: Cybersecurity Handbook
description: A community-driven cybersecurity knowledge base with 400+ notes, mind maps, and cheat sheets — built from first principles.
---

# Cybersecurity Handbook

**New:** A complete Privilege Escalation Handbook has been added. You’ll find the full folder on the left in the Explorer.

A structured collection of notes on cybersecurity — written to explain how systems actually work, not just which tools to run.

Built for people who want real understanding: students, self-learners, SOC analysts, and those moving toward more technical roles.

[Explore Coverage ↓](#coverage) · [GitHub →](https://github.com/priyanshu-rawa)

---

## Why this exists

Most learning material in cybersecurity falls into two extremes.  
Either it’s too high-level and vague, or it’s just a list of tools and commands with almost no explanation of *why* anything works.

I wanted something in between.

This handbook is my attempt to document topics properly — starting from first principles, then moving into practical use, attack techniques, and defensive approaches. The goal is simple: build understanding that still holds up after the tools change.

---

## Approach

> “Security is not a product, but a process.”  
> — Bruce Schneier

Every topic is written with the same general structure:

- Start with the core idea  
- Explain how it works internally  
- Show real-world context  
- Cover how it can be attacked  
- Cover how it can be detected or defended  

This is slower than most tutorials. It is also more useful in the long run.

---

## Who this is for

**Beginners**  
Clear explanations of fundamentals without assuming too much prior knowledge. Good starting point if you are still building your base in networking, authentication, and core security concepts.

**Intermediate learners**  
Deeper material on protocols, wireless security, web application security, identity management, and practical offensive and defensive techniques.

**Advanced readers**  
More technical sections including the new Privilege Escalation Handbook (Linux, Windows, cloud and containers), post-quantum cryptography, detection concepts, and system internals.

---

## Coverage

### Core Fundamentals
CIA Triad, risk management, security principles, common frameworks (NIST, ISO), ethics and legal considerations.

> **Tip:** Spend real time on the fundamentals. Most advanced techniques are just applications of these ideas under pressure.

### Network & Protocol Security
TCP/IP, ARP, DNS, firewalls, VPNs, wireless security (including practical work with the Aircrack-ng suite).

> **Note (2026):** Vulnerability exploitation continues to be a major initial access vector. Strong protocol knowledge remains one of the highest-leverage skills you can develop.

### Application & API Security
OWASP concepts, secure coding practices, API security, and common web vulnerabilities.

### Identity & Access Management
Authentication mechanisms, MFA, RBAC/ABAC, Kerberos, privileged access management.

> **Current reality:** Identity-related issues still appear in a very high percentage of real incidents. Understanding authentication and authorization deeply is no longer optional.

### Cryptography
Symmetric and asymmetric encryption, hashing, PKI, TLS, and post-quantum algorithms (including CRYSTALS-Kyber, Dilithium, and related schemes).

> **Tip:** “Harvest now, decrypt later” is already a practical concern. Having a working mental model of post-quantum cryptography is becoming increasingly useful.

### Offensive Security
Reconnaissance, web attacks, wireless attacks, Active Directory techniques, privilege escalation, and reverse engineering fundamentals.

### Defensive Security
Detection engineering, threat hunting, incident response, digital forensics, SIEM concepts, and malware analysis basics.

### Cloud & Infrastructure
AWS, Azure, GCP security concepts, container security (Docker/Kubernetes), and DevSecOps practices.

---

## Learning path suggestion

1. Build a solid base in fundamentals and networking  
2. Move into identity, cryptography, and application security  
3. Study both offensive techniques and defensive detection  
4. Go deeper into areas that match your interests (privilege escalation, cloud, forensics, etc.)

You do not need to read everything in order. Use the structure as a map, not a rigid curriculum.

---

## A living project

This handbook continues to grow. New notes are added as I study new topics or improve existing ones. The Privilege Escalation section is currently one of the more complete and practical parts of the project.

If you find errors, outdated information, or missing context, feel free to open an issue or submit a pull request. Contributions are welcome.

---

## Built with

- **Obsidian** for writing and organizing notes  
- **Quartz** for turning the notes into a fast, searchable website  
- **GitHub + Vercel** for version control and deployment  

---

## About the author

I’m **Priyanshu Rawat**, a self-taught learner documenting what I study in cybersecurity.

This project started as personal notes. Over time it became useful enough that it made sense to clean it up and share it. The goal has always been the same: write things clearly enough that the next person (including future me) can actually understand them.

Free and open. That won’t change.

---

## Core idea

> Learn deeply.  
> Build deliberately.  
> Document everything.  
> Share knowledge.

---

<div align="center">

**Cybersecurity Handbook**  
Maintained by [Priyanshu Rawat](https://github.com/priyanshu-rawa)

Built with Obsidian + Quartz

</div>
