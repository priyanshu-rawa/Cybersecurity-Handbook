---
tags: [ai-security, testing, red-teaming, planning]
created: 2025-01-01
status: permanent
---

# Planning an AI Red Teaming Exercise

## Three goals to keep in mind

1. Verify that standard software security practices are being followed — AI doesn't exempt you
2. Test the LLM base model and find gaps in existing safety systems for your specific context
3. Generate feedback on failures to drive actual improvements

The process has four phases: recruit the team → design tests → perform tests → report results.

---

## Phase 1: Recruit the Red Team

The people make or break this. A few principles:

**Diverse experience and expertise** — different backgrounds surface different vulnerabilities. A nurse testing a healthcare chatbot will find things a sysadmin won't. That's the point.

**Both adversarial and benign mindsets** — unlike traditional red teams (all security pros), AI red teams include ordinary users. Regular users discover harmful behaviors through normal interaction patterns that security experts might never think to test.

**Assign members to specific harms** — security experts → jailbreaks and metaprompt extraction. Domain experts → domain-specific harmful outputs. Rotate assignments across rounds for fresh perspective.

**Clear objectives** — give each member: the goal, which product features to test, which types of issues to look for, time expectations, how to record results. No ambiguity.

**Consistent result recording format:**
- Date
- Unique identifier (for reproducibility)
- Input prompt
- Description or screenshot of output

---

## Phase 2: Design Adversarial Tests

Test at both layers:

**The LLM base model** — through API endpoint with its safety system active. Find gaps in the context of your specific application.

**The AI-enabled application** — through the UI, full system including application-level safety mechanisms.

Test both layers *before* and *after* mitigations are in place. You need to know what mitigations actually fixed.

---

## Phase 3: Perform Tests

### Step 1: Determine scope of harm

Start with organizational policies on trust, safety, and responsible AI. Work with legal and policy teams to prioritize the most important harms for this specific application.

Output: a prioritized harm list with examples.

> **Note:** Creative red teamers find harms that policy lists miss. Multiple organizations have had reputational incidents from AI behaviors nobody thought to test for. Assume your harm list is incomplete. Creative testing is how you discover the gaps.

### Step 2: Extend the list through open-ended testing

Supplement the policy list with harms found through creative exploration. Add everything discovered to the master list. Prioritize based on severity and likelihood in your specific context.

### Step 3: Retest after mitigations

Apply your mitigations, then test the full harm list again. New harms may appear. Existing mitigations may be insufficient. Update the list, shift priorities, keep going.

### Step 4: Automate at scale

Manual testing is essential but doesn't scale. Supplement with automated red teaming tools.

**PyRIT (Python Risk Identification Tool)** — open source, from Microsoft:
1. **Automated scans** — adversarial probing using curated seed prompts per risk category, with attack strategies that bypass safety alignments
2. **Scoring** — produces an Attack Success Rate (ASR): percentage of successful attacks. Gives you a quantifiable risk posture.
3. **Reporting** — scorecards of attack techniques and risk categories, tracked over time for compliance and continuous monitoring

Run automated tools in a non-production environment configured with production-like resources. They're a complement to manual testing — automation finds risks at scale, humans provide deeper analysis.

For AI agents specifically, automation can test risk categories hard to reach manually: prohibited actions, sensitive data leakage through tool calls, task adherence failures.

---

## Phase 4: Report Results

**What to capture:** Don't overwhelm red teamers. For smaller exercises, a shared spreadsheet works. For systematic testing at scale, use automated tools.

**What to share with stakeholders:**
- Top identified issues
- Link to raw data
- Testing plan for upcoming rounds
- Acknowledgment of red teamers

**Important framing:** Red teaming exposes and raises understanding of risk surface. It is *not* a replacement for systematic measurement and mitigation work. Specific examples from red teaming don't indicate how pervasive a harm is — they just show the harm is possible.

> **Personal note:** The reporting framing matters. Stakeholders sometimes interpret "the red team found X" as "X is constantly happening." Clarify: finding it means it's possible and needs addressing. Not that it's rampant.

---

## Ongoing commitment

AI security testing is not a one-time thing. Models update. Metaprompts change. New attack techniques emerge. Organizations need continuous testing and validation — not a single pre-launch audit.

After every significant model update or metaprompt change: retest.

---

*Related: [[Ai-Red Teaming]] | [[Categories of red teaming]] | [[../Ai-Security Controls/Monitor & Detect Ai Specific Threats]]*
