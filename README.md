[![License](https://img.shields.io/github/license/priyanshu-rawa/Cybersecurity-Handbook?style=for-the-badge&logo=opensourceinitiative)](LICENSE)
[![Stars](https://img.shields.io/github/stars/priyanshu-rawa/Cybersecurity-Handbook?style=for-the-badge&logo=github)](https://github.com/priyanshu-rawa/Cybersecurity-Handbook/stargazers)
[![Forks](https://img.shields.io/github/forks/priyanshu-rawa/Cybersecurity-Handbook?style=for-the-badge&logo=github)](https://github.com/priyanshu-rawa/Cybersecurity-Handbook/network/members)
[![Issues](https://img.shields.io/github/issues/priyanshu-rawa/Cybersecurity-Handbook?style=for-the-badge&logo=github)](https://github.com/priyanshu-rawa/Cybersecurity-Handbook/issues)
[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Site-4D6BFE?style=for-the-badge&logo=vercel)](https://your-quartz-site.vercel.app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge&logo=github)](CONTRIBUTING.md)

# 🛡️ Cybersecurity Handbook

> **An interactive, open-source knowledge base for cybersecurity professionals, students, and enthusiasts.** Built with Quartz, designed for clarity, and maintained by the community.

---

## 📖 Table of Contents

- [🚀 Why This Exists](#-why-this-exists)
- [✨ Key Features](#-key-features)
- [🛠️ Quick Start](#️-quick-start)
- [🖼️ Preview](#️-preview)
- [📚 What's Inside](#-whats-inside)
- [🧠 Philosophy](#-philosophy)
- [🗺️ Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [💖 Support & Sponsorship](#-support--sponsorship)
- [📄 License](#-license)

---

## 🚀 Why This Exists

The world of cybersecurity moves fast. New vulnerabilities, tools, and best practices emerge daily. Yet, most resources are scattered across forums, blogs, and paid courses — inaccessible to many who need them most.

**This handbook is different.**

- **📖 Open & Free:** No paywalls, no ads. Just knowledge.
- **🌐 Interactive:** Powered by Quartz, it's a living document with search, graphs, and deep linking.
- **👥 Community-Driven:** Built by cybersecurity professionals for the next generation.
- **🔍 Practical & Current:** Covers real-world threats, tools, and defense strategies.

Whether you're preparing for your first security certification, defending a corporate network, or just curious about how the digital world stays safe, this handbook is for you.

---

## ✨ Key Features

- 📚 **400+ Comprehensive Notes** — From OSINT to cryptography to cloud security
- 🌐 **Interactive Knowledge Graph** — See how topics connect visually
- 🔍 **Full-Text Search** — Find exactly what you need, instantly
- 🌓 **Dark/Light Mode** — Read comfortably in any environment
- 📱 **Mobile-Friendly** — Access from any device, anywhere
- 🧠 **First-Principles Learning** — Understand *why*, not just *how*

---

## 🛠️ Quick Start

Get the handbook running locally in under 2 minutes.

### Prerequisites

- **Node.js** (v18 or later)
- **npm** or **yarn**

### Installation & Run

#### **Linux/macOS (bash/zsh)**

```bash
# Clone the repository
git clone https://github.com/priyanshu-rawa/Cybersecurity-Handbook.git
cd Cybersecurity-Handbook

# Install dependencies
npm install

# Start the development server
npm run quartz:dev
```

#### **Windows (PowerShell)**

```powershell
# Clone the repository
git clone https://github.com/priyanshu-rawa/Cybersecurity-Handbook.git
cd Cybersecurity-Handbook

# Install dependencies
npm install

# Start the development server
npm run quartz:dev
```

### Build for Production

```bash
# Build static site
npm run quartz:build

# Preview the build locally
npm run quartz:serve
```

---

## 🖼️ Preview

### 🏠 Homepage

![Homepage](assets/images/homepage.png)

### 🕸️ Interactive Knowledge Graph

![Interactive Graph](assets/images/graph-view.png)

### 📖 Reader Mode

![Reader Mode](assets/images/read-mode.png)

---

## 📚 What's Inside

### 🧠 Operating Systems

| Category | Topics |
|----------|--------|
| Linux | Linux Internals, Commands, Security |
| Windows | Windows Internals, Active Directory, Security |
| Networking | TCP/IP, DNS, HTTP/HTTPS, VPN, Firewalls |

### ⚔️ Offensive Security

| Category | Topics |
|----------|--------|
| Web Security | OWASP Top 10, SQL Injection, XSS |
| Vulnerability Assessment | Scanning, Enumeration, Exploitation |
| Penetration Testing | Methodologies, Tools, Reporting |
| Post-Exploitation | Persistence, Lateral Movement, Privilege Escalation |

### 🛡️ Defensive Security

| Category | Topics |
|----------|--------|
| Security Operations (SOC) | Monitoring, Incident Response |
| Detection Engineering | SIEM, Log Analysis, Threat Hunting |
| Digital Forensics | Memory Forensics, Network Forensics, Malware Analysis |

### ☁️ Cloud & Infrastructure

| Category | Topics |
|----------|--------|
| Cloud Security | AWS, Azure, GCP, Zero Trust |
| Container Security | Docker, Kubernetes, DevSecOps |
| IAM | Identity Management, Federation, MFA |

### 💻 Programming & Automation

| Category | Topics |
|----------|--------|
| Languages | Python, Bash, PowerShell |
| Automation | Scripting, CI/CD, Git |

### 🔐 Cryptography

| Category | Topics |
|----------|--------|
| Encryption | Symmetric, Asymmetric, AES, RSA |
| Hashing | SHA-256, MD5, Hash Functions |
| PKI | Digital Signatures, TLS, Certificates |

---

## 🧠 Philosophy

Cybersecurity is fundamentally built on understanding systems.

Without a solid grasp of operating systems, networking, protocols, authentication, memory, processes, and application architecture, tools become little more than buttons to press.

This handbook is built around one principle:

> **Understand the technology before learning how to secure or exploit it.**

Each topic aims to answer not only *what* something does, but also *how* it works internally and *why* it behaves that way.

---

## 🗺️ Roadmap

Planned improvements include:

- [ ] Expanded Linux internals documentation
- [ ] Windows internals series
- [ ] Networking deep dives
- [ ] Active Directory attack and defense labs
- [ ] SOC investigation playbooks
- [ ] Detection engineering content
- [ ] Malware analysis workflows
- [ ] Reverse engineering notes
- [ ] Cloud security documentation
- [ ] Interactive diagrams
- [ ] Architecture illustrations
- [ ] Practical lab environments

---

## 🤝 Contributing

We welcome contributions of all kinds! Whether you're fixing a typo, adding a new topic, or improving the visual design, your help makes this handbook better for everyone.

### How to Contribute

1. **Fork** the repository
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and commit:
   ```bash
   git commit -m "Add: New section on ransomware defense strategies"
   ```
4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against the `main` branch

### Contribution Guidelines

- **Content**: Write in clear, accessible English. Include practical examples.
- **Formatting**: Use proper markdown headings (`##`, `###`). Keep code blocks with language specifiers.
- **Images**: Store in `assets/images/`. Use descriptive filenames.
- **Style**: Follow the existing visual tone. No markdown errors.

> 📖 **Full guidelines** are available in [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 💖 Support & Sponsorship

Maintaining a comprehensive cybersecurity knowledge base takes time, effort, and infrastructure costs. If this handbook has helped you, please consider supporting its continued development.

### Why Sponsor?

- **🎯 Recognition:** Your logo and link featured prominently on the GitHub repo and live site.
- **💰 Direct Impact:** Your funds help cover hosting, domain, and tooling costs.
- **👥 Community Growth:** Support an open resource that educates thousands of cybersecurity students and professionals.
- **🚀 Talent Pipeline:** Show your company's commitment to open-source security education.

### Sponsor Tiers

| Tier | Benefits |
|------|----------|
| **Bronze** | Name listed in README as a supporter. |
| **Silver** | Logo and link in README, plus social media shoutout. |
| **Gold** | Premium placement on the live site, acknowledgment in project updates. |
| **Platinum** | All Gold benefits + direct consulting/recruiting access to maintainers. |

> **👉 [Sponsor the project](https://github.com/sponsors/priyanshu-rawa)** or reach out at `cybersec-handbook@example.com` for custom sponsorship arrangements.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to use, modify, distribute, and even commercialize this work, as long as you retain the copyright notice. We encourage you to contribute back improvements!

---

## ⭐ Star, Fork, Share

If you find this handbook useful:

- ⭐ **Star** the repo to show your appreciation.
- 🍴 **Fork** it to customize or contribute.
- 📢 **Share** it with your network — on Twitter, LinkedIn, or your favorite cybersecurity community.

Every star and share helps someone discover this resource.

---

<div align="center">

**🛡️ Cybersecurity Handbook**

*A continuously evolving cybersecurity knowledge base built through documentation, experimentation, and practical learning.*

**Always Learning · Always Documenting · Always Improving**

</div>

**If this helped you, drop a ⭐ – it motivates us to keep building.**
