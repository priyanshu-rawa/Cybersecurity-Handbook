> A continuously evolving cybersecurity knowledge base focused on practical understanding, technical accuracy, and first-principles learning.

## 📖 Overview

This isn't just another collection of notes. It's a structured, living knowledge base that breaks down complex cybersecurity topics into digestible, practical chunks. Whether you're a student trying to make sense of the OWASP Top 10, a SOC analyst hunting for IoCs, or a red teamer crafting a custom exploit, you'll find something useful here.

The content is designed to grow with you – from the first time you open a terminal to the day you're building your own detection rules. No fluff, no copy-pasted documentation. Just clear explanations, real-world examples, and a focus on understanding *why* things work the way they do.



## 🧠 Philosophy

> **Cybersecurity is best learned by understanding systems – not by memorizing tools.**

I believe that mastering security requires a solid grasp of the underlying technology. That's why every topic here starts from first principles – explaining how a protocol works, how an OS manages memory, or how a cryptographic algorithm achieves its guarantees. Only then do we move to practical application, attack scenarios, and defensive strategies.

It's a slow, deliberate approach. But it builds the kind of deep understanding that stays with you long after you've closed the browser.


## 👥 Who This is For

This handbook is for anyone who wants to understand cybersecurity at a professional level – and that includes a wide range of roles:

- **Students & Self-Learners** – If you're starting from scratch, this gives you a structured path without the noise.

- **Security Analysts (SOC)** – You'll find playbooks, log analysis guides, and detection engineering deep dives.

- **Penetration Testers** – From enumeration to post-exploitation, there's practical content you can use in your next engagement.

- **Red & Blue Teams** – Attackers get the methodology, defenders get the detection and mitigation strategies. Both sides learn how the other thinks.

- **Detection Engineers & Incident Responders** – SIEM configurations, forensic workflows, and real-world incident response playbooks.

- **Cloud & Infrastructure Engineers** – Security in AWS, Azure, GCP, Docker, and Kubernetes is covered with a practical, hands-on focus.

- **Reverse Engineers & Malware Analysts** – Static and dynamic analysis, binary reverse engineering, and malware behavior studies.

- **Researchers & IT Professionals** – Deep dives into emerging threats, cryptography, and networking internals.

The content is designed to be accessible without sacrificing depth. Whether you're learning your first Linux command or analyzing a kernel exploit, the material remains useful.


## ✨ Design Principles

Every article in this handbook follows a consistent structure – because consistency aids learning.

- **First Principles First** – Before diving into tools or commands, we explain the fundamental concepts. For example, before you learn how to crack a WiFi password, you understand how 802.11 authentication works.

- **Internal Architecture** – We look under the hood. How does Kerberos actually issue tickets? What happens inside a CPU when a buffer overflow occurs?

- **Real-World Implementation** – Theory is great, but we always bring it back to practical application. You'll find configuration examples, command references, and sample code.

- **Attack & Defense Together** – Every vulnerability is explained from both angles: how an attacker exploits it, and how a defender detects and prevents it.

- **Visuals Where They Help** – Diagrams, flowcharts, and tables are used sparingly but effectively, to illustrate complex interactions.

The goal is not to overwhelm you with information, but to guide you through a logical learning path. By the end of each topic, you should be able to explain it to someone else.


## 🧠 Coverage

The handbook spans the full spectrum of modern cybersecurity. Here's a high-level breakdown:

<details>
<summary><strong>🖥️ Core Computing & Systems</strong></summary>

- **Linux** – Commands, file systems, process management, security hardening.
- **Windows** – Internals, Active Directory, PowerShell for automation and security.
- **Networking** – TCP/IP, DNS, routing, VPNs, firewalls, and packet analysis.
- **Operating Systems** – Process scheduling, memory management, file systems, and kernel security.
- **Virtualization & Containers** – Docker, Kubernetes, hypervisors, and container security.
</details>

<details>
<summary><strong>⚔️ Offensive Security</strong></summary>

- **Reconnaissance** – OSINT, scanning, service enumeration, and information gathering.
- **Web Application Security** – OWASP Top 10, SQL injection, XSS, SSRF, CSRF, and secure coding practices.
- **Wireless Security** – WiFi attacks, cracking WPA/WPA2, evil twin, and wireless auditing.
- **Active Directory Attacks** – Kerberos attacks, LDAP enumeration, privilege escalation, and lateral movement.
- **Privilege Escalation** – Linux and Windows privilege escalation techniques, from kernel exploits to misconfigurations.
- **Exploit Development** – Buffer overflows, return-oriented programming (ROP), shellcode, and fuzzing.
- **Reverse Engineering** – Binary analysis, decompilation, debugging, and understanding compiled code.
- **Red Team Methodology** – Full attack lifecycle, C2, persistence, and threat simulation.
</details>

<details>
<summary><strong>🛡️ Defensive Security</strong></summary>

- **Detection Engineering** – Writing Sigma rules, YARA rules, and developing detection logic for SIEMs.
- **Threat Hunting** – Proactive search for threats using data analysis and hypothesis-driven investigations.
- **Incident Response** – Playbooks, containment, eradication, recovery, and post-incident analysis.
- **Malware Analysis** – Static, dynamic, and behavioral analysis of malicious software.
- **Digital Forensics** – Memory forensics, disk forensics, network forensics, and evidence handling.
- **SIEM** – Log aggregation, correlation, alerting, and tuning SIEM solutions like Splunk, ELK, or QRadar.
- **Endpoint Security** – EDR, antivirus, application control, and hardening endpoints.
- **Network Security** – Firewalls, IDS/IPS, segmentation, and secure network architecture.
- **Threat Intelligence** – Consuming and producing threat intelligence, indicators of compromise (IoCs), and threat actor profiling.
</details>

<details>
<summary><strong>☁️ Cloud & Infrastructure Security</strong></summary>

- **AWS Security** – IAM, S3 bucket security, EC2 security groups, and cloud-specific attack vectors.
- **Azure Security** – Entra ID (formerly Azure AD), Key Vault, and Azure Security Center.
- **GCP Security** – IAM, Cloud Run, and security best practices for Google Cloud.
- **Container & Kubernetes Security** – Securing Docker containers, Kubernetes RBAC, and hardening clusters.
- **DevSecOps** – Integrating security into CI/CD pipelines, infrastructure as code scanning, and shift-left security.
</details>

<details>
<summary><strong>💻 Programming & Automation</strong></summary>

- **Python** – Scripting for security tasks, building tools, and automating repetitive processes.
- **Bash** – Shell scripting for Linux administration and automation.
- **PowerShell** – Windows automation and offensive scripting for red teams.
- **APIs** – REST and GraphQL security, API authentication, and common API vulnerabilities.
</details>

<details>
<summary><strong>🔐 Cryptography</strong></summary>

- **Classical Cryptography** – Historical ciphers and their modern relevance.
- **Modern Cryptography** – Symmetric and asymmetric algorithms, AES, RSA, ECC, and post-quantum cryptography.
- **PKI** – Certificates, Certificate Authorities, trust models, and practical PKI deployment.
- **TLS** – The TLS handshake, cipher suites, vulnerabilities, and best practices.
- **Hashing** – SHA-2, SHA-3, MD5, and the role of hashing in integrity verification.
- **Authentication** – Passwords, multi-factor authentication, and biometrics.
</details>


## 🔬 Learning Methodology

Every concept follows the same progression:

1. **Fundamentals** – Start with the core idea, stripped of all complexity.
2. **Internal Working** – Understand how it operates under the hood.
3. **Real-World Example** – See it in action with a practical demonstration.
4. **Hands-on Practice** – Apply the knowledge with labs or exercises.
5. **Attacker's Perspective** – Learn how an adversary would exploit it.
6. **Defender's Perspective** – Learn how to detect and prevent it.
7. **Detection & Mitigation** – Dive into logs, alerts, and countermeasures.

This approach ensures that you're not just memorizing commands, but truly understanding the technology. It's a method that scales from beginner to expert.


## 🌱 A Living Resource

Cybersecurity is a moving target. New vulnerabilities, attack techniques, and defense strategies emerge every day. This handbook is continuously updated with:

- Latest research and threat intelligence.
- New practical labs and walkthroughs.
- Updated tools and techniques.
- Feedback and contributions from the community.

Articles are regularly refined to stay accurate and relevant. If you spot an error or have a suggestion, contributions are always welcome – just open an issue or submit a pull request.


## 🛠️ Built With

The handbook is built using a modern, documentation-first workflow:

- **Obsidian** – For knowledge management and note-taking.
- **Quartz 5** – A static site generator that turns markdown into a beautiful, searchable website.
- **Git & GitHub** – For version control and collaboration.
- **Vercel** – For hosting and continuous deployment.

This setup ensures the handbook is fast, searchable, and easy to maintain over the long term.


## 👨‍💻 About the Author

I'm **Priyanshu Rawat**, a self-taught security learner sharing what I discover. I believe that the best way to learn is to document everything – and this handbook is the result of that philosophy.

I'm particularly interested in:

- Linux and Windows internals.
- Networking protocols and their security implications.
- Offensive and defensive security methodologies.
- Cloud security and containerization.
- Automation and scripting for security workflows.

This handbook is my attempt to build a comprehensive, accessible, and practical resource for anyone serious about cybersecurity. It's free, open, and always evolving.


## 📢 Core Principles

> 🎯 **Learn deeply.**  
> 🏗️ **Build deliberately.**  
> 📝 **Document everything.**  
> 🌍 **Share knowledge.**

> *Always Learning. Always Documenting. Always Improving.*


<div align="center">

**📘 Cybersecurity Handbook**

Created and maintained by **[Priyanshu Rawat](https://github.com/priyanshu-rawa)**

Built with ❤️ using **Obsidian + Quartz**

⭐ **If this helped you, drop a star on GitHub!** ⭐

*Always Learning. Always Documenting.*

</div>
