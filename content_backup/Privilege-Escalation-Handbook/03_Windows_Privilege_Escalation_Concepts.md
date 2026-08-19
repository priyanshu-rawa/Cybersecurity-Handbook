# Windows Privilege Escalation Concepts

> **Privilege Escalation Handbook** — File 03  
> Focus: security architecture that enables Windows privilege escalation  
> Techniques are covered in File 04

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Windows Security Architecture Overview](#2-windows-security-architecture-overview)
3. [Security Identifiers (SIDs)](#3-security-identifiers-sids)
4. [Access Tokens](#4-access-tokens)
5. [Integrity Levels & Mandatory Integrity Control](#5-integrity-levels--mandatory-integrity-control)
6. [User Account Control (UAC)](#6-user-account-control-uac)
7. [Privileges](#7-privileges)
8. [Access Control Lists (DACL / SACL)](#8-access-control-lists-dacl--sacl)
9. [Service Security](#9-service-security)
10. [Registry Security](#10-registry-security)
11. [NTFS Security](#11-ntfs-security)
12. [Authentication Packages & Credential Storage](#12-authentication-packages--credential-storage)
13. [Active Directory Concepts for PrivEsc](#13-active-directory-concepts-for-privesc)
14. [Process & Thread Security](#14-process--thread-security)
15. [How Concepts Map to Attack Vectors](#15-how-concepts-map-to-attack-vectors)
16. [References](#16-references)

---

## 1. Introduction

Windows privilege escalation is rarely about a single “exploit button.” It is about understanding **who you are** (token), **what you can do** (privileges + groups), **what objects you can touch** (DACL), and **what runs automatically as higher privilege** (services, tasks, drivers).

This file builds the mental model. File 04 applies it with concrete techniques.

> **Pro tip:** On Windows, always dump your token groups and privileges first (`whoami /all`). Many “privesc” paths are already half-granted by misassigned rights.

---

## 2. Windows Security Architecture Overview

### 2.1 Core Components

| Component | Role |
|-----------|------|
| **LSA** (Local Security Authority) | Policy, authentication, token creation |
| **SRM** (Security Reference Monitor) | Access checks in kernel |
| **LSASS** | User-mode auth process; holds secrets |
| **SAM** | Local account database |
| **Security Descriptors** | Owner, DACL, SACL, labels on objects |
| **Access Tokens** | Process/thread identity + privileges |

### 2.2 Subject → Object Access Check (Simplified)

1. Subject presents **access token**.
2. Object has **security descriptor** (DACL).
3. SRM evaluates desired access against DACL + privileges + integrity level.
4. Grant or deny; optionally audit via SACL.

### 2.3 Local vs Domain

| Context | Identity store | Typical privesc focus |
|---------|----------------|------------------------|
| Workgroup / local | SAM | Services, UAC, tokens, unquoted paths |
| Domain-joined | AD + local SAM | Both local + AD abuse paths |
| Domain controller | AD DS | DCSync, tickets, domain groups |

---

## 3. Security Identifiers (SIDs)

### 3.1 What Is a SID?

A **Security Identifier** uniquely identifies a principal (user, group, computer, well-known authority).

Example formats:

```text
S-1-5-21-<domain>-<RID>     # domain/local account
S-1-5-18                     # Local System
S-1-5-19                     # Local Service
S-1-5-20                     # Network Service
S-1-5-32-544                 # Administrators (built-in)
S-1-5-32-545                 # Users
S-1-5-32-546                 # Guests
```

### 3.2 Well-Known SIDs (High Value)

| SID | Name | Why it matters |
|-----|------|----------------|
| S-1-5-18 | SYSTEM | Highest local machine identity |
| S-1-5-32-544 | Administrators | Local admin group |
| S-1-5-32-547 | Power Users | Legacy elevation paths |
| S-1-1-0 | Everyone | Over-permissive DACLs |
| S-1-5-11 | Authenticated Users | Common mis-ACL target |
| S-1-5-32-555 | Remote Desktop Users | Lateral access |
| S-1-5-32-562 | Distributed COM Users | DCOM abuse surface |

### 3.3 RIDs

Relative IDs for built-in accounts (local):

| RID | Account |
|-----|---------|
| 500 | Administrator |
| 501 | Guest |
| 502 | KRBTGT (domain) |
| 512 | Domain Admins (domain) |
| 515 | Domain Computers |
| 516 | Domain Controllers |

### 3.4 Commands

```cmd
whoami /user
whoami /groups
wmic useraccount get name,sid
```

```powershell
[System.Security.Principal.WindowsIdentity]::GetCurrent().User.Value
Get-LocalUser | Select Name, SID
```

### 3.5 Attack Vector Angle

- Misconfigured DACLs granting **Everyone** or **Authenticated Users** write access to service binaries/registry keys.
- SIDHistory abuse in AD (migration attributes) for privilege retention.
- Knowing SYSTEM SID helps when reading ACLs and scheduled task principals.

---

## 4. Access Tokens

### 4.1 Token Contents

An access token typically includes:

- User SID
- Group SIDs
- Privileges (enabled/disabled)
- Owner defaults
- Integrity level
- Restricted SIDs (sometimes)
- Elevated vs limited token linkage (UAC)

### 4.2 Primary vs Impersonation Tokens

| Type | Description |
|------|-------------|
| **Primary token** | Assigned to process at creation |
| **Impersonation token** | Thread can adopt another user’s security context |

Impersonation levels:

| Level | Capability |
|-------|------------|
| Anonymous | Almost none |
| Identification | Know identity, limited |
| Impersonation | Act as user **on local system** |
| Delegation | Act as user on remote systems too |

### 4.3 Why Tokens Are Attack Vectors

- **Token impersonation / theft**: SeImpersonatePrivilege → potato-family attacks.
- **Token duplication**: From privileged processes if you can open them.
- **UAC split tokens**: Admin users run most apps with filtered tokens.

### 4.4 Inspection

```cmd
whoami /all
whoami /priv
```

```powershell
whoami /groups /fo list
Get-Process -IncludeUserName | Sort-Object UserName
```

Tools: Process Explorer, Process Hacker, `TokenViewer`, Seatbelt `TokenPrivileges`.

### 4.5 NETWORK SERVICE / LOCAL SERVICE

These service accounts often hold **SeImpersonatePrivilege**, enabling local privilege escalation via named pipe / COM tricks when a privileged client connects (potato family — File 04).

---

## 5. Integrity Levels & Mandatory Integrity Control

### 5.1 Integrity Levels (IL)

| Level | SID (label) | Examples |
|-------|-------------|----------|
| Low | S-1-16-4096 | Protected Mode IE, some sandboxes |
| Medium | S-1-16-8192 | Standard user processes |
| High | S-1-16-12288 | Elevated admin |
| System | S-1-16-16384 | SYSTEM services |

### 5.2 MIC Rules (Simplified)

- Lower IL generally cannot write to higher IL objects.
- UAC elevation moves Medium → High for elevated processes.
- UIAccess and other special cases exist.

### 5.3 Why It Matters for PrivEsc

- UAC bypasses often aim to start a **High integrity** process without proper consent UX.
- Writing to High IL locations from Medium fails — attackers target **writable High/System paths** via weak DACLs instead.

### 5.4 Viewing IL

```cmd
whoami /groups | findstr Level
```

Or Process Explorer “Integrity” column.

---

## 6. User Account Control (UAC)

### 6.1 Purpose

UAC separates **standard rights** from **administrative rights** for users in Administrators group using **split tokens**:

- Filtered (medium IL) token for daily use
- Linked full admin token for elevation

### 6.2 Consent / Credential Prompts

| Policy / scenario | Behavior |
|-------------------|----------|
| Admin consent prompt | Click Yes to elevate |
| Credential prompt | Non-admin must enter admin creds |
| Auto-elevate | Some Microsoft binaries elevate silently (auto-elevation) |

### 6.3 UAC Levels (Conceptual)

Registry policy under:

```text
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System
```

Notable values:

| Value | Role |
|-------|------|
| `EnableLUA` | Master UAC switch |
| `ConsentPromptBehaviorAdmin` | Prompt behavior for admins |
| `ConsentPromptBehaviorUser` | For standard users |
| `PromptOnSecureDesktop` | Secure desktop dimming |
| `FilterAdministratorToken` | Built-in Administrator filtering |

### 6.4 Auto-Elevation

Certain Windows binaries marked for auto-elevation can start elevated without a prompt under specific conditions. Attackers abuse this for **UAC bypass** chains (File 04).

### 6.5 Why UAC Is Not a Security Boundary

Microsoft has stated UAC is primarily a **convenience / safety** feature against accidental admin actions, not a hard security boundary against malware running as an admin user. From a red team view:

- Code execution as local admin user ≠ full high-integrity admin yet
- But many reliable UAC bypasses exist when already admin-group member

> **Warning note for defenders:** Do not treat “UAC enabled” as equivalent to “malware cannot get SYSTEM.” Combine with AppLocker/WDAC, EDR, least privilege, and no standing local admin.

### 6.6 Checking Elevation

```cmd
whoami /groups | findstr /i "High Mandatory"
net session >nul 2>&1 && echo Elevated || echo Not elevated
```

---

## 7. Privileges

### 7.1 Privileges vs Rights vs Permissions

| Term | Meaning |
|------|---------|
| **Privilege** | System-wide right in token (e.g., SeDebugPrivilege) |
| **Logon right** | Who may log on interactively/network/service |
| **Permission** | DACL entry on a specific object |

### 7.2 High-Value Privileges for Attackers

| Privilege | Attack use |
|-----------|------------|
| **SeImpersonatePrivilege** | Potato attacks → SYSTEM |
| **SeAssignPrimaryTokenPrivilege** | Token assignment / service style elevation |
| **SeDebugPrivilege** | Open almost any process; LSASS dump; inject |
| **SeBackupPrivilege** | Read any file (backup semantics) |
| **SeRestorePrivilege** | Write any file (restore semantics) |
| **SeTakeOwnershipPrivilege** | Take ownership then change DACL |
| **SeLoadDriverPrivilege** | Load vulnerable drivers |
| **SeTcbPrivilege** | Act as part of OS (very powerful) |
| **SeCreateTokenPrivilege** | Create arbitrary tokens (rare) |

### 7.3 Enabling Privileges

Privileges may be **present but disabled**. Attack tools enable them via `AdjustTokenPrivileges`.

```cmd
whoami /priv
```

### 7.4 Service Accounts & Default Privileges

IIS app pools, SQL Server service accounts, and many third-party services run with SeImpersonate — a frequent foothold after web/SQL compromise.

---

## 8. Access Control Lists (DACL / SACL)

### 8.1 Security Descriptor Parts

- **Owner**
- **DACL** — who is allowed/denied what
- **SACL** — what is audited
- **Integrity label** (MIC)

### 8.2 ACE Types

- Access Allowed
- Access Denied (evaluated with care; order matters conceptually with canonical ACL order)
- Object-specific ACEs (AD, directory objects)

### 8.3 Common Dangerous ACE Patterns

| Principal | Permission on | Risk |
|-----------|---------------|------|
| Everyone / Auth Users | Write/Modify service binary | Replace with payload |
| Everyone | Full Control service | Reconfigure service |
| Users | Write property on service registry | ImagePath hijack |
| Auth Users | GenericAll on AD object | Takeover |

### 8.4 Tools to Inspect

```cmd
icacls C:\path\file.exe
sc sdshow ServiceName
```

```powershell
Get-Acl C:\path | Format-List
Get-Acl HKLM:\SYSTEM\CurrentControlSet\Services\ServiceName
```

GUI: `secpol.msc`, advanced security tabs, Sysinternals AccessChk:

```cmd
accesschk.exe -uwcqv "Authenticated Users" *
accesschk.exe -uwdqs Users C:\
```

---

## 9. Service Security

### 9.1 How Services Run

- Configured in SCM (Service Control Manager)
- Binary path: `ImagePath`
- Account: LocalSystem, LocalService, NetworkService, or custom
- Start type: auto, manual, disabled
- Optional: triggers, failure actions, dependencies

### 9.2 Security on Services

Three layers commonly abused:

1. **Service DACL** — who can change config / start/stop
2. **Registry key DACL** for `HKLM\SYSTEM\CurrentControlSet\Services\<Name>`
3. **File DACL** on the service executable and its directory

### 9.3 Why Services Are Prime PrivEsc Targets

- Many run as **SYSTEM**
- Admins install third-party agents with weak ACLs
- Unquoted paths + weak directory perms = classic combo
- DLL search order issues in service context

### 9.4 Inspection Commands

```cmd
sc qc ServiceName
sc qc ServiceName
sc sdshow ServiceName
sc query state= all
wmic service get name,pathname,startname,startmode
```

```powershell
Get-CimInstance Win32_Service | Select Name, State, StartName, PathName
```

---

## 10. Registry Security

### 10.1 Hives of Interest

| Hive | Interest |
|------|----------|
| `HKLM\SYSTEM\CurrentControlSet\Services` | Service ImagePath |
| `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run` | Persistence |
| `HKLM\SOFTWARE\Policies` | Hardening / GPO remnants |
| `HKCU\...` | Per-user persistence / hijacks |
| `HKLM\SAM` / `SECURITY` | Secrets (needs high priv to read) |

### 10.2 Autostart Extensibility Points (ASEPs)

Registry Run keys, shell extensions, IFEO, AppInit (legacy), Winlogon notifications — more persistence than pure privesc, but weak ACLs on HKLM run keys can yield elevation if executed in elevated context.

### 10.3 AlwaysInstallElevated

Policies:

```text
HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer\AlwaysInstallElevated
HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer\AlwaysInstallElevated
```

If both are `1`, MSI packages install with elevated privileges → trivial privesc (File 04).

### 10.4 Attack Vector Angle

Writable service registry keys allow changing `ImagePath` to attacker binary → restart service → SYSTEM.

---

## 11. NTFS Security

### 11.1 Permissions Overview

Common rights: Read, Write, Modify, Full Control, Read & Execute, List folder.

Special: **Write DAC**, **Write Owner**, **Delete**, **FILE_WRITE_DATA** on directories (create files).

### 11.2 Inheritance

Child objects inherit ACEs unless protected. Mis-set inheritance on `C:\Program Files\Vendor` often leaves `Users:(M)` on service folders.

### 11.3 Tools

```cmd
icacls "C:\Program Files\Vulnerable App" /T
```

```powershell
Get-ChildItem "C:\Program Files" -Directory | ForEach-Object {
  $acl = Get-Acl $_.FullName
  # review
}
```

### 11.4 Related Concepts

- **Alternate Data Streams (ADS)** — hiding payloads
- **Opportunistic locks / file locking** races — advanced
- **Junctions / reparse points** — path confusion attacks

---

## 12. Authentication Packages & Credential Storage

### 12.1 LSASS Role

LSASS hosts:

- Logon sessions
- Kerberos tickets (domain)
- NTLM material (version/config dependent)
- Cached credentials (domain)

Dumping LSASS is a **credential access** technique that enables privilege escalation and lateral movement (File 04).

### 12.2 SAM & SYSTEM

Local password hashes live in SAM, encrypted with keys tied to SYSTEM hive. Reading them typically requires SYSTEM or equivalent backup privileges.

### 12.3 DPAPI

Data Protection API protects user secrets (browsers, RDP, etc.) with user or machine keys. Machine DPAPI secrets may be reachable after SYSTEM.

### 12.4 LSA Secrets

Service account passwords (auto-logon, service creds) may be stored as LSA secrets — extractable as SYSTEM (e.g., with Mimikatz `lsadump::secrets`).

### 12.5 Credential Manager / cmdkey

```cmd
cmdkey /list
```

Saved creds can escalate or move laterally.

---

## 13. Active Directory Concepts for PrivEsc

### 13.1 Why AD Changes the Game

On domain-joined hosts, local admin is powerful **on that host**, but domain privilege escalation targets:

- Domain Users → high-value groups
- Service tickets / TGT abuse
- ACL misconfigs on AD objects
- GPO permissions

### 13.2 Security Principals

- Users, groups, computers
- gMSAs / sMSAs
- Managed service accounts
- Trusts between domains/forests

### 13.3 Kerberos Basics (Attack-Relevant)

| Item | Role |
|------|------|
| **TGT** | Proves authentication to KDC |
| **TGS / service ticket** | Access to SPN-enabled services |
| **SPN** | Maps service to account — Kerberoasting target |
| **KRBTGT** | Key for forging Golden Tickets |
| **PAC** | Authorization data in tickets |

### 13.4 Group Hierarchy Highlights

| Group | Impact |
|-------|--------|
| Domain Admins | Domain dominance |
| Enterprise Admins | Forest-wide |
| Account Operators | User/group management abuse |
| Backup Operators | DC file access paths |
| Server Operators | Local server control |
| Print Operators | Historical LPE vectors |
| DNSAdmins | DLL loading tricks historically |
| Group Policy Creator Owners | GPO abuse |

### 13.5 ACL-Based AD Attacks (Conceptual)

- **GenericAll / GenericWrite** on user → reset password / SPN set
- **WriteDACL** → grant yourself more rights
- **DCSync rights** (Replicating Directory Changes) → dump hashes
- **GPO Edit** → software installation / scheduled tasks as SYSTEM on OUs

### 13.6 Authentication Nuances

- **Kerberos** vs **NTLM**
- **LDAP signing / channel binding**
- **SMB signing**
- **Constrained / unconstrained / resource-based constrained delegation**

Unconstrained delegation and RBCD are high-impact privilege paths in AD assessments (File 04).

---

## 14. Process & Thread Security

### 14.1 Process Access Rights

Opening a process with `PROCESS_ALL_ACCESS` or specific rights enables:

- Memory read (credential dump)
- Thread creation (injection)
- Token opening (duplication)

Protected Process Light (PPL) and RunAsPPL for LSASS raise the bar.

### 14.2 Parent-Child Relationships

Malware and attackers care about:

- Who spawns whom (detection)
- Inheriting handles/tokens
- Elevated children from auto-elevate parents (UAC bypass)

### 14.3 COM / RPC / Named Pipes

Windows IPC is central to potato attacks, DCOM lateral movement, and service communication. Understanding that **privileged clients talk to low-priv servers** (or vice versa) is key to impersonation abuse.

---

## 15. How Concepts Map to Attack Vectors

| Concept | Example attack (File 04) |
|---------|--------------------------|
| SeImpersonate | JuicyPotato / GodPotato / PrintSpoofer |
| UAC split token | Fodhelper / eventvwr bypasses |
| Weak service DACL | `sc config` ImagePath hijack |
| Weak NTFS on service | Replace service.exe |
| Unquoted path | Drop `C:\Program.exe` |
| AlwaysInstallElevated | Malicious MSI |
| SeDebug | LSASS dump → admin hash |
| Kerberos SPN | Kerberoast → service account |
| Pre-auth disabled | AS-REP Roast |
| KRBTGT hash | Golden Ticket |
| GPO write | Immediate scheduled task |
| Token IL | Medium → High elevation chains |

### 15.1 Mental Model Summary

```text
Identity (SID + groups)
   + Privileges (Se*)
   + Integrity level
   + Restricted tokens / UAC filtering
        |
        v
Access check against object DACL
        |
        v
If object is a SYSTEM service/task/autostart → privilege escalation
If object is credential store → identity expansion
If object is AD ACL → domain privilege escalation
```

### 15.2 Enumeration Starts With Concepts

Before running WinPEAS blindly, answer:

1. Who am I? (`whoami /all`)
2. Am I admin group but not elevated?
3. Do I have SeImpersonate / SeDebug / SeBackup?
4. What runs as SYSTEM that I can modify?
5. Am I domain-joined? Any AD ACL attack path from my user?

---

## 16. References

- [Microsoft — Access Tokens](https://learn.microsoft.com/en-us/windows/win32/secauthn/access-tokens)
- [Microsoft — Mandatory Integrity Control](https://learn.microsoft.com/en-us/windows/win32/secauthz/mandatory-integrity-control)
- [Microsoft — How UAC Works](https://learn.microsoft.com/en-us/windows/security/application-security/application-control/user-account-control/)
- [Microsoft — Privileges](https://learn.microsoft.com/en-us/windows/win32/secauthz/privilege-constants)
- [Microsoft — Security Descriptors and Access Control Lists](https://learn.microsoft.com/en-us/windows/win32/secauthz/access-control-lists)
- [MITRE ATT&CK — Privilege Escalation](https://attack.mitre.org/tactics/TA0004/)
- [HarmJ0y / SpecterOps AD writings](https://posts.specterops.io/)
- [Windows Internals (book)](https://learn.microsoft.com/en-us/sysinternals/resources/windows-internals) — conceptual depth

---

## Appendix A: whoami /all Field Guide

| Section | Read for |
|---------|----------|
| USER INFORMATION | SID of current user |
| GROUP INFORMATION | Admin? Backup Operators? Integrity? |
| PRIVILEGES INFORMATION | SeImpersonate, SeDebug, etc. |

## Appendix B: Local Admin vs SYSTEM vs Domain Admin

| Principal | Scope |
|-----------|--------|
| Local Users group member | Limited |
| Local Administrators (elevated) | Full control of one machine |
| SYSTEM | Machine-local ultimate; used by services |
| Domain Admin | Broad control of domain resources / DCs |
| Enterprise Admin | Forest configuration power |

## Appendix C: Lab Validation Ideas

1. Create weak service ACL → reconfigure as low-priv user.
2. Grant SeImpersonate to a test service account → potato lab.
3. Domain lab: set SPN on user → Kerberoast offline crack.
4. Compare Medium vs High integrity file write attempts.

---

*End of File 03 — Windows Privilege Escalation Concepts*  
*Next: `04_Windows_Privilege_Escalation_Techniques.md`*
