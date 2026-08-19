---
---

# Automated Tools and Resources for Privilege Escalation

> **Privilege Escalation Handbook** — File 07  
> Tooling catalog, usage patterns, comparisons, and authoritative resources  
> Prefer understanding techniques (Files 01–06) before relying solely on scanners

---

## Table of Contents

1. [How to Use Automation Wisely](#1-how-to-use-automation-wisely)
2. [Linux Enumeration & PrivEsc Tools](#2-linux-enumeration--privesc-tools)
3. [Windows Enumeration & PrivEsc Tools](#3-windows-enumeration--privesc-tools)
4. [Cloud Assessment Tools](#4-cloud-assessment-tools)
5. [Kubernetes & Container Tools](#5-kubernetes--container-tools)
6. [Reference Sites: GTFOBins, LOLBAS & More](#6-reference-sites-gtfobins-lolbas--more)
7. [Credential & Post-Ex Adjacent Tools](#7-credential--post-ex-adjacent-tools)
8. [Comparison Tables](#8-comparison-tables)
9. [Suggested Toolchains by Scenario](#9-suggested-toolchains-by-scenario)
10. [Online Learning & Cheat Sheets](#10-online-learning--cheat-sheets)
11. [Building a Personal Toolkit](#11-building-a-personal-toolkit)
12. [References](#12-references)

---

## 1. How to Use Automation Wisely

### 1.1 Strengths

- Breadth: catches obscure misconfigs humans skip  
- Speed: minutes vs hours of manual finds  
- Consistency: good for multi-host sprawl  

### 1.2 Weaknesses

- Noise and false confidence  
- Miss novel/logic bugs  
- High detection footprint  
- Version lag vs new techniques  

### 1.3 Best Practice Workflow

```text
1. Manual identity snapshot (whoami/id, sudo -l)
2. Targeted manual checks (SUID, services, tokens)
3. Run automated enum with output saved
4. Triage HIGH findings manually
5. Exploit with understanding — not blind scripts
6. Re-run tools after major state changes
```

> **Pro tip:** Read tool output offline on your attack host. Grep for ` ste`, `writable`, `CVE`, `password`, `docker`, `SeImpersonate`.

### 1.4 OPSEC Tiers

| Tier | Approach |
|------|----------|
| Loud lab/CTF | Full LinPEAS/WinPEAS |
| Corporate pentest | LSE level 1–2, Seatbelt subsets, manual |
| Stealth RT | Living-off-the-land only; custom scripts |

---

## 2. Linux Enumeration & PrivEsc Tools

### 2.1 LinPEAS (PEASS-ng)

**Purpose:** Comprehensive Linux privilege escalation enumeration.

**Repo:** [PEASS-ng](https://github.com/peass-ng/PEASS-ng)

**Usage:**

```bash
# Download
curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh -o linpeas.sh
chmod +x linpeas.sh
./linpeas.sh | tee linpeas.out

# Faster / quieter-ish options (see --help for current flags)
./linpeas.sh -q
./linpeas.sh -s   # superfast / less checks depending on version
```

**Highlights:** Color-coded findings, CVE hints, cloud metadata, container checks, password greps.

**Noise:** High — many file reads and process inspections.

### 2.2 LinEnum

**Purpose:** Classic bash enumeration script; easy to edit.

**Repo:** [LinEnum](https://github.com/rebootuser/LinEnum)

```bash
./LinEnum.sh -t  # thorough
./LinEnum.sh -r report -e /tmp/out
```

**When:** Smaller footprint preference; teaching environments.

### 2.3 linux-smart-enumeration (LSE / lse.sh)

**Purpose:** Level-based depth control — excellent for balancing noise vs coverage.

**Repo:** [linux-smart-enumeration](https://github.com/diego-treitos/linux-smart-enumeration)

```bash
./lse.sh          # default level 0
./lse.sh -l 1
./lse.sh -l 2     # deeper, slower
./lse.sh -i       # interactive
./lse.sh -l 1 -c  # color
```

> **Pro tip:** Start at level 0–1 on production assessments; escalate depth only if needed.

### 2.4 Linux Exploit Suggester (LES)

**Purpose:** Map kernel/version to possible public exploits.

**Repos:** [linux-exploit-suggester](https://github.com/mzet-/linux-exploit-suggester) and successors like [LES2](https://github.com/jondonas/linux-exploit-suggester-2)

```bash
./linux-exploit-suggester.sh
uname -a | ./linux-exploit-suggester.sh
```

**Warning:** Suggestions ≠ reliable exploit. Verify CVE applicability, compile carefully, avoid blind runs.

### 2.5 pspy

**Purpose:** Watch processes without root — catch cron/jobs.

**Repo:** [pspy](https://github.com/DominicBreuker/pspy)

```bash
./pspy64 -pf -i 1000
./pspy32 -pf
```

Leave running while you do other enum; note root commands and intervals.

### 2.6 Other Linux Helpers

| Tool | Role |
|------|------|
| **unix-privesc-check** | Older comprehensive checks |
| **traitor** | Auto-exploit some misconfigs (use carefully) |
| **GTFOBLookup** | Offline GTFOBins helper |
| **suid3num** | SUID binary analysis aids |
| **BeRoot** | Cross-platform priv checks |

### 2.7 Linux Tool Comparison

| Tool | Breadth | Noise | Control | Auto-exploit |
|------|---------|-------|---------|--------------|
| LinPEAS | Excellent | High | Medium | No (hints) |
| LinEnum | Good | Med | High (edit script) | No |
| LSE | Good | Low→High by level | Excellent | No |
| LES | Kernel focus | Low | Medium | No |
| pspy | Process time | Low–Med | High | No |
| traitor | Targeted | Med | Low | Yes (caution) |

---

## 3. Windows Enumeration & PrivEsc Tools

### 3.1 WinPEAS

**Purpose:** Windows counterpart to LinPEAS.

```cmd
winPEASx64.exe
winPEASx64.exe quiet cmd fast
winPEASx64.exe log=winpeas.out
```

Covers services, token privs, UAC, AlwaysInstallElevated, sensitive files, and more.

### 3.2 PowerUp (PowerSploit)

**Purpose:** PowerShell priv-esc checks and helpers.

```powershell
Import-Module .\PowerUp.ps1
Invoke-AllChecks
Get-ModifiableService
Get-UnquotedService
Find-ProcessDLLHijack
```

**Note:** PowerSploit is archived/signatured — still educational; expect AV hits.

### 3.3 SharpUp

**Purpose:** C# reimplementation of many PowerUp checks — often stealthier to load than huge PS.

```cmd
SharpUp.exe
SharpUp.exe audit
```

### 3.4 Seatbelt

**Purpose:** Host situational awareness (GhostPack) — not only privesc.

```cmd
Seatbelt.exe -group=all
Seatbelt.exe -group=system
Seatbelt.exe TokenPrivileges
Seatbelt.exe WindowsVault
```

Excellent pre-exfil and env understanding.

### 3.5 JAWS (Just Another Windows [Enum] Script)

**Purpose:** Lightweight PowerShell enum.

```powershell
.\jaws-enum.ps1 -OutputFilename jaws.txt
```

### 3.6 Watson / Sherlock / Wes-ng

**Purpose:** Suggest missing patches / known PE CVEs.

```cmd
# Watson (C#) on host
Watson.exe
# wes-ng offline on attacker with systeminfo
python wes.py systeminfo.txt --exploits-only
```

### 3.7 AccessChk / Sysinternals

```cmd
accesschk.exe -uwcqv "Authenticated Users" *
accesschk.exe -uwdqs Users C:\
accesschk.exe -kvuqsw hklm\System\CurrentControlSet\Services
```

Autoruns, Process Explorer, Process Monitor for DLL hijack hunting.

### 3.8 Windows Tool Comparison

| Tool | Language | Breadth | AV attention | Best for |
|------|----------|---------|--------------|----------|
| WinPEAS | Native | Excellent | High | Full sweep |
| PowerUp | PS | Good + abuse funcs | Very high | Labs |
| SharpUp | .NET | Good | Med–High | Faster checks |
| Seatbelt | .NET | Host intel | Med–High | Awareness |
| JAWS | PS | Moderate | Med | Light enum |
| AccessChk | Native | ACL focus | Lower | Service ACLs |
| Watson/wes | Mixed | Patch CVEs | Med | Missing KBs |

---

## 4. Cloud Assessment Tools

### 4.1 Pacu (AWS)

**Repo:** [RhinoSecurityLabs/pacu](https://github.com/RhinoSecurityLabs/pacu)

```bash
pacu
# set keys, run modules e.g. iam__enum_permissions, iam__privesc_scan
```

Modular AWS exploitation: enum, privesc path finding, data exfil modules.

### 4.2 CloudFox

**Repo:** [BishopFox/cloudfox](https://github.com/BishopFox/cloudfox)

Situational awareness across AWS (and evolving multi-cloud support): endpoints, creds, principals, attack surface mapping — great for recon before abuse.

```bash
cloudfox aws all-checks
```

### 4.3 enumerate-iam

Brute-checks which AWS APIs current keys can call — noisy but revealing when policies are unclear.

### 4.4 PMapper / Principal Mapper

Graph IAM who-can-assume-who relationships for AWS accounts.

### 4.5 Azure Tools

| Tool | Role |
|------|------|
| **AzureHound** | Collect Entra/Azure data for BloodHound |
| **ROAdoots / RoadTools** | Entra exploration |
| **MicroBurst** | Azure audit/attack scripts |
| **PowerZure** | Azure assessment framework |
| **Stormspotter** | Historical attack path graphing (check maintenance) |
| **Az CLI / Az PS** | Official enumeration |

### 4.6 GCP

Primarily `gcloud` + custom scripts + HackTricks Cloud checklists; community scanners evolve quickly — verify before use.

### 4.7 Multi-Cloud / CSPM (Defensive but Useful)

ScoutSuite, Prowler, CloudSploit — misconfig scanners; red teams use them for findings quality.

```bash
prowler aws
scout aws --profile target
```

---

## 5. Kubernetes & Container Tools

### 5.1 Peirates

**Repo:** [inguardians/peirates](https://github.com/inguardians/peirates)

Interactive K8s post-exploitation from inside a pod: SA token use, steal secrets, spawn pods, etc.

### 5.2 KubiScan

Finds risky RoleBindings / ClusterRoleBindings (e.g., subjects with dangerous privileges).

### 5.3 Kubescape

**Repo:** [kubescape/kubescape](https://github.com/kubescape/kubescape)

Misconfiguration and compliance scanning (NSA/CISA frameworks, etc.).

```bash
kubescape scan framework nsa
```

### 5.4 kube-bench / kube-hunter

- **kube-bench** — CIS benchmark checks  
- **kube-hunter** — active/passive cluster attack surface (careful in prod)  

### 5.5 kubectl Plugins & Helpers

| Tool | Role |
|------|------|
| `kubectl-who-can` | Who can perform verb on resource |
| `rakkess` | Access matrix |
| `kdigger` | Context discovery from pod |
| `amicontained` | Container confinement assessment |
| `deepce` | Docker escape enum helper |

### 5.6 Trivy / Grype

Image vulnerability scanning — useful when escalating via vulnerable sidecars/nodes components.

---

## 6. Reference Sites: GTFOBins, LOLBAS & More

### 6.1 GTFOBins

**URL:** [https://gtfobins.github.io/](https://gtfobins.github.io/)

Unix binaries that can be abused for:

- Shell  
- SUID  
- sudo  
- Capabilities  
- File read/write  
- Reverse shells  

**Workflow:** `sudo -l` or SUID list → search binary → copy recipe → test.

### 6.2 LOLBAS

**URL:** [https://lolbas-project.github.io/](https://lolbas-project.github.io/)

Living Off the Land Binaries And Scripts (Windows):

- AWL bypass  
- Execute  
- Download  
- Compile  
- Persist  

Examples: `certutil`, `mshta`, `regsvr32`, `rundll32`, `bitsadmin`, `wmic`.

### 6.3 WADComs / GTFOArgs / Others

- **WADComs** — Windows/AD command cheats  
- **LOLDrivers** — vulnerable drivers  
- **Filesec** / **Hijack Libs** style projects — DLL hijack intel  

### 6.4 HackTricks

**URL:** [https://book.hacktricks.xyz/](https://book.hacktricks.xyz/)  
**Cloud:** [https://cloud.hacktricks.xyz/](https://cloud.hacktricks.xyz/)

Living encyclopedia for PE, lateral, cloud, containers.

### 6.5 PayloadsAllTheThings

**URL:** [https://github.com/swisskyrepo/PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)

Cheatsheets for shells, PE, file transfer, and more.

### 6.6 MITRE ATT&CK

**URL:** [https://attack.mitre.org/](https://attack.mitre.org/)

Map findings to techniques for reports (T1548, T1068, T1134, T1558, …).

---

## 7. Credential & Post-Ex Adjacent Tools

Not pure “privesc scanners,” but often used immediately after elevation or to enable it:

| Tool | Use |
|------|-----|
| **Mimikatz** | Windows secrets (signatured) |
| **pypykatz** | Offline parse dumps |
| **Impacket** | secretsdump, GetUserSPNs, psexec, ticketer |
| **Rubeus** | Kerberos abuse |
| **BloodHound / SharpHound / AzureHound** | Pathfinding |
| **CrackMapExec / NetExec** | Fleet auth spray & post |
| **LaZagne** | Password recovery multi-app |
| **hashcat / john** | Offline cracking |
| **SecretFinder / trufflehog** | Secret discovery in code |

---

## 8. Comparison Tables

### 8.1 Linux vs Windows Starter Kits

| Goal | Linux | Windows |
|------|-------|---------|
| Full auto enum | LinPEAS | WinPEAS |
| Controlled depth | LSE | Seatbelt groups |
| Process timing | pspy | Procmon (GUI) |
| Kernel/patch hints | LES | Watson / wes-ng |
| Abuse helpers | GTFOBins | PowerUp / LOLBAS |
| ACL deep dive | manual find/getcap | AccessChk |

### 8.2 Cloud Starter Kits

| Cloud | Recon | Privesc assist |
|-------|-------|----------------|
| AWS | CloudFox, aws cli | Pacu, PMapper |
| Azure | AzureHound, az | MicroBurst, RoadTools |
| GCP | gcloud | Manual + HackTricks |
| Multi | Prowler/Scout | — |

### 8.3 Noise vs Value Matrix

| Tool | Value | Noise | Recommend first? |
|------|-------|-------|------------------|
| Manual whoami/id/sudo | Critical | Low | Always |
| LSE -l1 / Seatbelt subset | High | Med | Yes |
| Full PEAS | High | High | After manual |
| traitor auto-exploit | Variable | Med | Labs only |
| kube-hunter active | Med | High | Scoped only |

---

## 9. Suggested Toolchains by Scenario

### 9.1 OSCP-Style Linux Box

```text
id → sudo -l → LinEnum or LinPEAS → pspy → GTFOBins → exploit
Optional: LES if stuck
```

### 9.2 Windows Workstation Domain-Joined

```text
whoami /all → Seatbelt/WinPEAS → PowerUp/SharpUp
→ BloodHound collection → Rubeus/Impacket as paths appear
```

### 9.3 AWS Assumed Role Assessment

```text
sts get-caller-identity → CloudFox → enumerate-iam / Pacu modules
→ validate each path manually in non-prod first
```

### 9.4 Compromised Kubernetes Pod

```text
amicontained / kdigger → kubectl auth can-i --list
→ Peirates or manual curl SA API → KubiScan offline if kubeconfig
```

### 9.5 CI Runner Compromise

```text
env | sort → list secrets → cloud CLIs if present
→ check Docker sock → check homedir creds → map OIDC roles
```

---

## 10. Online Learning & Cheat Sheets

| Resource | Type |
|----------|------|
| HackTheBox / THM PrivEsc rooms | Practice |
| OverTheWire | Linux fundamentals |
| PayloadAllTheThings | Cheatsheets |
| HackTricks | Deep reference |
| Microsoft Learn security | Windows concepts |
| AWS Skill Builder / IAM docs | Cloud IAM |
| Kubernetes official security | K8s hardening |
| IppSec YouTube | Walkthrough methodology |
| 0xdf blog | Writeup quality |

### 10.1 Books (Optional Depth)

- *Windows Internals*  
- *The Hacker Playbook* series  
- *Operator Handbook*  
- *Kubernetes Security* titles  

---

## 11. Building a Personal Toolkit

### 11.1 Directory Layout Example

```text
toolkit/
  linux/   linpeas.sh lse.sh pspy64
  windows/ winpeas.exe sharpup.exe seatbelt.exe accesschk.exe
  cloud/   pacu cloudfox
  k8s/     peirates kubescape
  transfer/ static python http helpers
  notes/   this handbook
```

### 11.2 Version Pinning

Record SHA256 of tools used in each engagement for evidence integrity and reproducibility.

```bash
sha256sum linpeas.sh >> engagement-tooling.txt
```

### 11.3 Offline Mirrors

Air-gapped labs need local copies of GTFOBins snippets, PEAS, Sysinternals.

### 11.4 Custom Scripts

Automate **your** first 20 commands per OS — often more valuable than mega-tools:

```bash
#!/bin/sh
echo "## id"; id
echo "## sudo"; sudo -l 2>/dev/null
echo "## suid"; find /usr -perm -4000 -type f 2>/dev/null
echo "## caps"; getcap -r /usr/bin 2>/dev/null
echo "## cron"; ls -la /etc/cron* 2>/dev/null
```

---

## 12. References

- [PEASS-ng](https://github.com/peass-ng/PEASS-ng)  
- [GTFOBins](https://gtfobins.github.io/)  
- [LOLBAS](https://lolbas-project.github.io/)  
- [HackTricks](https://book.hacktricks.xyz/)  
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)  
- [GhostPack](https://github.com/GhostPack) (Seatbelt, Rubeus, etc.)  
- [PowerSploit](https://github.com/PowerShellMafia/PowerSploit)  
- [Pacu](https://github.com/RhinoSecurityLabs/pacu)  
- [CloudFox](https://github.com/BishopFox/cloudfox)  
- [Peirates](https://github.com/inguardians/peirates)  
- [Kubescape](https://github.com/kubescape/kubescape)  
- [MITRE ATT&CK](https://attack.mitre.org/)  
- [Sysinternals](https://learn.microsoft.com/en-us/sysinternals/)  

---

## Appendix A: One-Page Command Card

```bash
# Linux quick
curl -L <linpeas-url> | sh | tee /tmp/lp.out
./lse.sh -l 1
./pspy64 -pf -i 1000

# Windows quick
winPEASx64.exe quiet cmd
SharpUp.exe audit
Seatbelt.exe -group=system

# AWS quick
aws sts get-caller-identity
cloudfox aws all-checks

# K8s quick
kubectl auth can-i --list
# peirates from pod
```

## Appendix B: Reporting Integration

When a tool finds something:

1. Reproduce manually  
2. Screenshot/command evidence  
3. Map to ATT&CK  
4. Business impact + remediations  
5. Note tool name/version in appendix  

## Appendix C: Ethical Reminder

Automated exploit modes and mass cloud IAM changes can cause **outages**. Default to **enumerate and propose**, exploit only with explicit scope.

---

*End of File 07 — Automated Tools and Resources for PrivEsc*  
*Next: `08_Detection_Evasion_and_Clearing_Tracks.md`*
