[![License](https://img.shields.io/github/license/priyanshu-rawa/Cybersecurity-Handbook?style=for-the-badge&logo=opensourceinitiative)](LICENSE)
[![Stars](https://img.shields.io/github/stars/priyanshu-rawa/Cybersecurity-Handbook?style=for-the-badge)](https://github.com/priyanshu-rawa/Cybersecurity-Handbook/stargazers)
[![Forks](https://img.shields.io/github/forks/priyanshu-rawa/Cybersecurity-Handbook?style=for-the-badge)](https://github.com/priyanshu-rawa/Cybersecurity-Handbook/network/members)
[![Issues](https://img.shields.io/github/issues/priyanshu-rawa/Cybersecurity-Handbook?style=for-the-badge)](https://github.com/priyanshu-rawa/Cybersecurity-Handbook/issues)
[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Site-4D6BFE?style=for-the-badge&logo=vercel)](https://cybersecurity-handbook.vercel.app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge&logo=github)](CONTRIBUTING.md)
[![Visitors](https://api.visitorbadge.io/api/visitors?path=priyanshu-rawa%2FCybersecurity-Handbook&label=Visitors&countColor=%23263759)](https://visitorbadge.io/status?path=priyanshu-rawa%2FCybersecurity-Handbook)

# 📘  Cybersecurity Handbook


> **An interactive, open-source knowledge base for cybersecurity professionals, students, and enthusiasts.** Built with Quartz, designed for clarity, and maintained by the community.

---

## 📖 Table of Contents

- [💡 Why This Exists](#-why-this-exists)
- [🎨 Key Features](#-key-features)
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

## ⚡ Quick Start

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

## 👀 Preview

### 🏠 Homepage

![Homepage](assets/images/homepage.png)

### 🕸️ Interactive Knowledge Graph

![Interactive Graph](assets/images/graph-view.png)

### 📖 Reader Mode

![Reader Mode](assets/images/read-mode.png)

---

## 📖  What's Inside

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

### 🔐 Defensive Security

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

### 🔑 Cryptography

| Category | Topics |
|----------|--------|
| Encryption | Symmetric, Asymmetric, AES, RSA |
| Hashing | SHA-256, MD5, Hash Functions |
| PKI | Digital Signatures, TLS, Certificates |

---

##  Philosophy

Cybersecurity is fundamentally built on understanding systems.

Without a solid grasp of operating systems, networking, protocols, authentication, memory, processes, and application architecture, tools become little more than buttons to press.

This handbook is built around one principle:

> **Understand the technology before learning how to secure or exploit it.**

Each topic aims to answer not only *what* something does, but also *how* it works internally and *why* it behaves that way.

---

## 📈  Roadmap

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

## 🌱 Contributing

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
## 🤝 Contributing

We welcome contributions of all kinds — from fixing a single typo to adding an entire new topic. Every contribution, no matter how small, helps make this handbook better for everyone.

> **💡 First time contributing to open source?** No worries! I'll guide you through it.

---

### 🌟 Ways You Can Contribute

| Area | Examples |
|------|----------|
| 📝 **Content** | Add new topics, fix errors, improve explanations, add practical examples |
| 🎨 **Design** | Improve visuals, add diagrams, enhance layout |
| 🔧 **Code** | Fix bugs, improve the Quartz setup, add features |
| 📖 **Documentation** | Improve clarity, fix formatting, add cross-references |
| 💬 **Community** | Report issues, suggest improvements, help others |

---

### 🚀 How to Contribute (Step-by-Step)

| Step | Action |
|------|--------|
| 1 | **Fork** the repository — click the "Fork" button at the top right |
| 2 | **Clone** your fork locally: `git clone https://github.com/your-username/Cybersecurity-Handbook.git` |
| 3 | **Create a branch** for your changes: `git checkout -b feature/your-feature-name` |
| 4 | **Make your changes** — add notes, fix typos, update content |
| 5 | **Stage your changes**: `git add .` |
| 6 | **Commit with a clear message**: `git commit -m "Add: New section on ransomware defense"` |
| 7 | **Push to your fork**: `git push origin feature/your-feature-name` |
| 8 | **Open a Pull Request** — go to the original repo and click "Compare & pull request" |

---

### 📋 Contribution Guidelines

| Aspect | Guideline |
|--------|-----------|
| **Content** | Write in clear, accessible English. Include practical examples and real-world scenarios. |
| **Formatting** | Use proper Markdown headings (`##`, `###`). Keep code blocks with language specifiers (e.g., ` ```bash`, ` ```python`). |
| **Images** | Store in `assets/images/`. Use descriptive, lowercase filenames (e.g., `network-osi-model.png`). |
| **Style** | Follow the existing visual tone. No markdown errors. Keep it concise and practical. |
| **Scope** | If you're unsure where to place a topic, open an issue first — we'll discuss the best location. |

---

### 🔍 What We're Looking For

| Type | Description |
|------|-------------|
| 📚 **New Topics** | Missing a subject? Add it! Check the coverage section to avoid duplicates. |
| 🛠️ **Corrections** | Found an error or outdated info? Fix it! |
| 💡 **Improvements** | Think something can be explained better? Reword it! |
| 🧪 **Labs & Exercises** | Practical walkthroughs and hands-on exercises. |
| 📊 **Diagrams** | Visual explanations of complex concepts. |
| 🔗 **Links & References** | Add relevant external resources. |

---

### 🧭 Where to Put Your Files

| File Type | Location |
|-----------|----------|
| Cybersecurity notes | `content/` (in the relevant category folder) |
| Images | `assets/images/` |
| Diagrams | `assets/diagrams/` |
| Labs | `content/` (in the relevant lab folder) |

---

### 📖 Need Help?

| Resource | Description |
|----------|-------------|
| 📧 **Open an Issue** | [Create a new issue](https://github.com/priyanshu-rawa/Cybersecurity-Handbook/issues) — we'll get back to you |
| 💬 **Start a Discussion** | Use the Discussions tab for ideas and suggestions |
| 📄 **View Full Guidelines** | See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines |
| 📋 **Code of Conduct** | Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing |

---

### ⭐ Recognition

All contributors will be acknowledged in the README and on the live site. Your work will help thousands of learners worldwide.

---

**Thank you for helping make this a world-class resource! 🚀**

---

## ☕ Support & Sponsorship

Maintaining a comprehensive cybersecurity knowledge base takes time, effort, and infrastructure costs. If this handbook has helped you, please consider supporting its continued development.

### Why Sponsor?

- **🎯 Recognition:** Your logo and link featured prominently on the GitHub repo and live site.
- **💰 Direct Impact:** Your funds help cover hosting, domain, and tooling costs.
- **👥 Community Growth:** Support an open resource that educates thousands of cybersecurity students and professionals.
- ** 🎯 Talent Pipeline:** Show your company's commitment to open-source security education.

### Sponsor Tiers

| Tier | Benefits |
|------|----------|
| **Bronze** | Name listed in README as a supporter. |
| **Silver** | Logo and link in README, plus social media shoutout. |
| **Gold** | Premium placement on the live site, acknowledgment in project updates. |
| **Platinum** | All Gold benefits + direct consulting/recruiting access to maintainers. |

> **👉 [Sponsor the project](https://github.com/sponsors/priyanshu-rawa)**  

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

**If this helped you, drop a ⭐ – it motivates me to keep building.**
