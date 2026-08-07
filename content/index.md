# Cybersecurity Handbook Homepage Enhancement Report

## Executive Summary

Your current `index.md` is content-rich but visually undifferentiated. A FAANG‑style landing page must convey authority, clarity, and immediate value within the first scroll. This report provides concrete, actionable recommendations to transform your homepage into a high‑impact entry point — without leaving Quartz's markdown‑first paradigm.

We cover:

- **Frontmatter** – rewrite title and description for SEO and click‑through.
- **Hero Section** – introduce a stat‑driven, product‑first hero.
- **Layout & Structure** – reorganise content for scannability and visual hierarchy.
- **Visual Enhancements** – leverage Quartz's CSS, callouts, and conditional layout.
- **Social & Sharing** – add an Open Graph image recommendation.

---

## 1. Frontmatter Overhaul

**Current:**

```
title: Cybersecurity Handbook
description: A community-driven cybersecurity knowledge base with 400+ notes, mind maps, and cheat sheets — built from first principles.
```

**Recommended:**

```
title: Cybersecurity Handbook — 400+ Structured Notes & Cheat Sheets
description: A community‑driven knowledge base with 400+ notes, mind maps, and cheat sheets. Learn cybersecurity from first principles — from your first terminal command to writing detection rules.
```

**Why:**

- **Title** front‑loads primary keyword (“Cybersecurity Handbook”) and adds a compelling hook (“400+ Structured Notes & Cheat Sheets”) that appears in search snippets.
- **Description** expands the value proposition, includes long‑tail keywords (“first principles”, “detection rules”), and directly answers the user's intent (“learn cybersecurity”).
- Both are specific, not generic, and align with the page's H1 (which we'll keep as “Cybersecurity Handbook”).

---

## 2. Hero Section Redesign

The current hero is a single paragraph and a link bar. Let's make it a stat‑driven, visually anchored hero that immediately communicates scale, depth, and community.

### New Hero Layout (Markdown)

```
# Cybersecurity Handbook

<div class="hero-stats">
  <span class="stat">📚 400+ Notes</span>
  <span class="stat">🧠 Mind Maps</span>
  <span class="stat">📋 Cheat Sheets</span>
  <span class="stat">🌐 Community‑Driven</span>
</div>

> A continuously evolving knowledge base built from first principles — from your first terminal command to writing your own detection rules.

[Browse the coverage ↓](#coverage) · [Read the philosophy ↓](#philosophy) · [GitHub →](https://github.com/priyanshu-rawa)
```

### CSS to Make It Pop

Add this to `quartz/styles/custom.scss` (or your theme's custom CSS):

```
.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin: 1.5rem 0 1rem;
}

.hero-stats .stat {
  background: var(--lightgray);
  padding: 0.5rem 1.2rem;
  border-radius: 2rem;
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--dark);
}
```

**Why:** Stats are scannable, trustworthy, and instantly convey value — a hallmark of great tech landing pages (Linear, Vercel, Stripe). The blockquote adds a human, authoritative voice.

---

## 3. Restructure Content for Scannability

### a) Learning Methodology → Numbered Steps with Emojis

Instead of a plain list, present it as a numbered visual progression:

```
## Learning Methodology

Every concept follows a 7‑step progression:

1. 🧱 **Fundamentals** – core idea, stripped of complexity  
2. ⚙️ **Internal working** – how it actually operates under the hood  
3. 🧪 **Real‑world example** – a practical demonstration  
4. 🖥️ **Hands‑on practice** – labs and exercises to apply it  
5. 🎯 **Attacker's perspective** – how an adversary would exploit it  
6. 🛡️ **Defender's perspective** – how to detect and prevent it  
7. 📊 **Detection & mitigation** – logs, alerts, and countermeasures
```

Emojis add visual interest and help break up text without needing extra CSS.

### b) Coverage → Grid of Category Cards

Replace the `<details>` blocks with a markdown table or grid. Since Quartz supports table styling, we can use a table with two columns:

```
## Coverage

| **Core Computing & Systems** | **Offensive Security** |
|------------------------------|------------------------|
| Linux · Windows · Networking · OS · Virtualization | Recon · Web App · Wireless · AD · PrivEsc · Exploit Dev · Reverse · Red Team |

| **Defensive Security** | **Cloud & Infrastructure** |
|------------------------|----------------------------|
| Detection Eng · Threat Hunting · IR · Malware Analysis · Forensics · SIEM · Endpoint · Network · Threat Intel | AWS · Azure · GCP · Container/K8s · DevSecOps |

| **Programming & Automation** | **Cryptography** |
|------------------------------|------------------|
| Python · Bash · PowerShell · APIs | Classical · Modern · PKI · TLS · Hashing · Authentication |
```

Alternatively, use a 3‑column grid via CSS (`.coverage-grid`). A table is simpler and works in any markdown renderer.

**Why:** The table condenses information, makes it scanable, and removes the extra click required to expand details — critical for busy professionals.

### c) "Who This Is For" → Badge Row

List the audience as a row of pill badges (similar to the hero stats):

```
## Who This Is For

<div class="audience-badges">
  <span class="badge">🎓 Students</span>
  <span class="badge">🕵️ SOC Analysts</span>
  <span class="badge">🔴 Penetration Testers</span>
  <span class="badge">🔵 Red & Blue Teams</span>
  <span class="badge">⚙️ Detection Engineers</span>
  <span class="badge">☁️ Cloud Engineers</span>
  <span class="badge">🐞 Reverse Engineers</span>
  <span class="badge">📊 Researchers</span>
</div>
```

Add CSS:

```
.audience-badges .badge {
  background: var(--secondary);
  padding: 0.3rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  display: inline-block;
  margin: 0.2rem;
}
```

---

## 4. Quartz Layout Customisations

### a) Hide Sidebars on Homepage

In `quartz.config.ts`, use the `condition: not-index` for left/right components (Explorer, Graph, etc.):

```
# in your plugin configuration
- source: github:quartz-community/explorer
  enabled: true
  layout:
    position: left
    priority: 50
    condition: not-index   # <-- hides on index.md
```

Or in the top‑level layout `byPageType` override:

```
layout:
  byPageType:
    content:  # default for all pages
      positions:
        left: [Explorer, Search]
        right: [Graph, Backlinks]
    index:   # explicit override for the root page
      positions:
        left: []    # no left sidebar
        right: []   # no right sidebar
```

### b) Use a Full‑Width Frame for the Homepage

Set `template: full-width` for the index page to remove sidebars entirely:

```
layout:
  byPageType:
    index:
      template: full-width
```

This gives you a clean, distraction‑free canvas for your hero and content.

### c) Custom Typography & Colors

In `quartz/styles/custom.scss`, define a security‑friendly palette:

```
:root {
  --primary: #1a2b3c;        /* Dark navy */
  --secondary: #2c3e50;      /* Muted slate */
  --accent: #4d6bfe;         /* Soft blue */
  --lightgray: #f0f4f8;
}
```

Use a clean, readable sans‑serif font (Inter, San Francisco, or system fonts). This aligns with the FAANG aesthetic — minimalist, professional, and technical.

---

## 5. Social Card (Open Graph) Recommendation

Create a custom social preview image that includes:

- The handbook title
- A visual representation of the 7‑step learning methodology or a hexagon grid of the six coverage areas
- The GitHub star count and note count as subtle badges

**Action:** Design this image (e.g., with Figma or Canva) and add to your frontmatter:

```
image: https://your-domain.com/social-card.png
```

Quartz will use this as the Open Graph image. A compelling social card can significantly increase click‑through from shares.

---

## 6. Sample Improved `index.md`

Below is a complete, revised version of your `index.md` incorporating all the above recommendations. Replace your current file with this.

```
---
title: Cybersecurity Handbook — 400+ Structured Notes & Cheat Sheets
description: A community‑driven knowledge base with 400+ notes, mind maps, and cheat sheets. Learn cybersecurity from first principles — from your first terminal command to writing detection rules.
image: https://cybersecurity-handbook.dev/social-card.png
---

# Cybersecurity Handbook

<div class="hero-stats">
  <span class="stat">📚 400+ Notes</span>
  <span class="stat">🧠 Mind Maps</span>
  <span class="stat">📋 Cheat Sheets</span>
  <span class="stat">🌐 Community‑Driven</span>
</div>

> A continuously evolving knowledge base built from first principles — from your first terminal command to writing your own detection rules.

[Browse the coverage ↓](#coverage) · [Read the philosophy ↓](#philosophy) · [GitHub →](https://github.com/priyanshu-rawa)

---

## Overview

This isn't another collection of scattered notes. It's a structured, living knowledge base that breaks complex cybersecurity topics into clear, practical pieces — useful whether you're a student making sense of the OWASP Top 10, a SOC analyst hunting for IoCs, or a red teamer building a custom exploit.

No fluff, no copy‑pasted documentation. Just clear explanations, real‑world examples, and a consistent focus on understanding *why* things work the way they do — not just which command to run.

## Philosophy

> Cybersecurity is best learned by understanding systems — not by memorizing tools.

Mastering security requires a solid grasp of the underlying technology. So every topic here starts from first principles: how a protocol actually works, how an OS manages memory, how a cryptographic algorithm achieves its guarantees. Only after that do we move to practical application, attack scenarios, and defensive strategy.

It's a slower, more deliberate approach than most tutorials take. But it builds understanding that's still useful long after you've closed the browser tab.

## What makes it different

**First principles before tools.** Before you learn to crack a WiFi password, you understand how 802.11 authentication actually works. Tools change; the underlying systems don't.

**Internal architecture, not surface‑level.** How does Kerberos actually issue a ticket? What happens inside the CPU when a buffer overflow occurs? We go under the hood.

**Attack and defense, together.** Every vulnerability is explained from both sides — how an attacker exploits it, and how a defender detects and prevents it. Red teamers learn how blue teams think, and vice versa.

**Real implementation, not just theory.** Every topic comes back to practical application: configuration examples, command references, sample code, and hands‑on labs.

## Learning methodology

Every concept in this handbook follows the same progression:

1. 🧱 **Fundamentals** — the core idea, stripped of complexity
2. ⚙️ **Internal working** — how it actually operates under the hood
3. 🧪 **Real‑world example** — a practical demonstration
4. 🖥️ **Hands‑on practice** — labs and exercises to apply it
5. 🎯 **Attacker's perspective** — how an adversary would exploit it
6. 🛡️ **Defender's perspective** — how to detect and prevent it
7. 📊 **Detection & mitigation** — logs, alerts, and countermeasures

This ensures you're not memorising commands — you're building understanding that scales from beginner to expert.

## Coverage

| **Core Computing & Systems** | **Offensive Security** |
|------------------------------|------------------------|
| Linux · Windows · Networking · OS · Virtualization | Recon · Web App · Wireless · AD · PrivEsc · Exploit Dev · Reverse · Red Team |

| **Defensive Security** | **Cloud & Infrastructure** |
|------------------------|----------------------------|
| Detection Eng · Threat Hunting · IR · Malware Analysis · Forensics · SIEM · Endpoint · Network · Threat Intel | AWS · Azure · GCP · Container/K8s · DevSecOps |

| **Programming & Automation** | **Cryptography** |
|------------------------------|------------------|
| Python · Bash · PowerShell · APIs | Classical · Modern · PKI · TLS · Hashing · Authentication |

## Who this is for

<div class="audience-badges">
  <span class="badge">🎓 Students</span>
  <span class="badge">🕵️ SOC Analysts</span>
  <span class="badge">🔴 Penetration Testers</span>
  <span class="badge">🔵 Red & Blue Teams</span>
  <span class="badge">⚙️ Detection Engineers</span>
  <span class="badge">☁️ Cloud Engineers</span>
  <span class="badge">🐞 Reverse Engineers</span>
  <span class="badge">📊 Researchers</span>
</div>

The material stays accessible without sacrificing depth — whether you're learning your first Linux command or analysing a kernel exploit.

## A living resource

Cybersecurity is a moving target, and this handbook moves with it: new research and threat intelligence, new labs and walkthroughs, updated tools and techniques, and ongoing refinement based on community feedback.

> [!tip] Found something wrong or outdated?
> Open an issue or submit a pull request — contributions are always welcome.

## Built with

- **Obsidian** — knowledge management and note‑taking
- **Quartz 5** — the static site generator turning markdown into a fast, searchable website
- **Git & GitHub** — version control and collaboration
- **Vercel** — hosting and continuous deployment

Push to GitHub, and the site rebuilds and redeploys automatically. Fast, searchable, and easy to maintain over the long term.

## About the author

I'm **Priyanshu Rawat**, a self‑taught security learner sharing what I discover. I believe the best way to learn is to document everything — this handbook is the result of that habit turned into a project.

I'm particularly interested in Linux and Windows internals, networking protocols and their security implications, offensive and defensive methodology, cloud security and containerisation, and automation for security workflows.

This is my attempt at a comprehensive, accessible, practical resource for anyone serious about cybersecurity. It's free, open, and always evolving.

## Core principles

> **Learn deeply. Build deliberately. Document everything. Share knowledge.**
>
> *Always learning. Always documenting. Always improving.*

---

<div align="center">

**Cybersecurity Handbook** · Created and maintained by [Priyanshu Rawat](https://github.com/priyanshu-rawa)

Built with Obsidian + Quartz

If this helped you, a star on [GitHub](https://github.com/priyanshu-rawa) is always appreciated.

</div>
```

---

## 7. Implementation Checklist

- □  
Replace `index.md` with the revised version above.
- □  
Add the custom CSS for `.hero-stats` and `.audience-badges` to `quartz/styles/custom.scss`.
- □  
Update `quartz.config.ts`:

- Set `condition: not-index` for sidebar components, or override `byPageType.index` with empty sidebars.
- Optionally set `template: full-width` for the index page.
- □  
Design and upload a social card image, update frontmatter `image` field.
- □  
Test locally (`npx quartz build --serve`) and verify the homepage looks as expected.
- □  
Push changes to GitHub; Vercel will auto‑deploy.

---

## Conclusion

With these changes, your homepage will transition from a standard note page to a polished, authoritative landing page that instantly communicates the scale, depth, and community behind your handbook. The result is a first impression that rivals the best tech documentation and product sites — all while staying within Quartz's markdown‑first ecosystem.

Your handbook deserves a front door that reflects the quality of its content. This plan delivers just that.

