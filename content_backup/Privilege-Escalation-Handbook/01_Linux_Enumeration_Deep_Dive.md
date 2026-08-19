# Linux Enumeration Deep Dive

> **Privilege Escalation Handbook** — File 01  
> Audience: penetration testers, red teamers, security analysts  
> Scope: post-compromise Linux host enumeration before privilege escalation

---

## Table of Contents

1. [Introduction & Methodology](#1-introduction--methodology)
2. [System Information](#2-system-information)
3. [Users, Groups & Authentication](#3-users-groups--authentication)
4. [Processes & Services](#4-processes--services)
5. [Network Enumeration](#5-network-enumeration)
6. [Filesystem & Permissions](#6-filesystem--permissions)
7. [Credentials & Sensitive Files](#7-credentials--sensitive-files)
8. [Cron, Timers & Scheduled Tasks](#8-cron-timers--scheduled-tasks)
9. [Environment Variables & PATH](#9-environment-variables--path)
10. [Containers & Virtualization](#10-containers--virtualization)
11. [Advanced & Stealth Techniques](#11-advanced--stealth-techniques)
12. [Automation & Scripting](#12-automation--scripting)
13. [Enumeration Checklist](#13-enumeration-checklist)
14. [References](#14-references)

---

## 1. Introduction & Methodology

### 1.1 Why Enumeration Matters

Privilege escalation rarely starts with a kernel exploit. Most successful escalations begin with **thorough, structured enumeration**: identifying misconfigurations, weak file permissions, reusable credentials, and privileged processes that can be abused.

> **Pro tip:** Spend more time enumerating than exploiting. A clean map of the host often reveals multiple paths; the first path is not always the safest or most reliable.

### 1.2 Legal & Operational Notes

- Only enumerate systems you are **authorized** to assess.
- Prefer non-destructive commands first; avoid noisy kernel modules and mass file writes unless scoped.
- Document findings with timestamps, hostnames, and evidence paths for the report.

### 1.3 Enumeration Phases

| Phase | Goal | Noise level |
|-------|------|-------------|
| Passive / local | Read files, list processes, check identity | Low |
| Active local | Search FS, check SUID, dump configs | Medium |
| Network | Port scan, service banners, lateral mapping | Medium–High |
| Automated | LinPEAS, LinEnum, LSE | Medium–High |

### 1.4 Quick Identity Snapshot

```bash
whoami
id
hostname
uname -a
cat /etc/os-release 2>/dev/null || cat /etc/issue
pwd
echo $SHELL
tty
```

Record UID/GID, group memberships (especially `sudo`, `docker`, `lxd`, `disk`, `adm`, `wheel`), and whether you are in a restricted shell or container.

---

## 2. System Information

### 2.1 Kernel & Architecture

```bash
uname -a
uname -r                    # kernel release
uname -m                    # architecture (x86_64, aarch64, etc.)
cat /proc/version
cat /proc/sys/kernel/osrelease
arch
```

| Field | Why it matters |
|-------|----------------|
| Kernel version | Match public local privilege escalation (LPE) CVEs |
| Architecture | Correct exploit / binary compilation target |
| Distro | Package paths, default services, security defaults |

### 2.2 Distribution & Release

```bash
cat /etc/os-release
lsb_release -a 2>/dev/null
cat /etc/*-release 2>/dev/null
cat /etc/issue
cat /etc/issue.net
```

### 2.3 Hardware & Resources

```bash
lscpu 2>/dev/null
cat /proc/cpuinfo | head -40
free -h
df -h
lsblk 2>/dev/null
cat /proc/meminfo | head -20
```

### 2.4 Boot & Runtime Mode

```bash
# Virtualization / container hints
systemd-detect-virt 2>/dev/null
cat /proc/1/cgroup
ls -la / | head
# Secure boot / SELinux / AppArmor
getenforce 2>/dev/null
sestatus 2>/dev/null
aa-status 2>/dev/null
cat /sys/kernel/security/lsm 2>/dev/null
```

### 2.5 Installed Packages & Compilers

```bash
# Debian/Ubuntu
dpkg -l 2>/dev/null | head -50
which gcc g++ python python3 perl ruby php nc ncat socat curl wget nmap 2>/dev/null

# RHEL/CentOS/Fedora
rpm -qa 2>/dev/null | head -50

# Compilers = ability to build exploits locally
ls /usr/bin/*gcc* /usr/bin/*cc* 2>/dev/null
```

> **Warning:** Compiling noisy exploits on production hosts may trigger EDR. Prefer prebuilt, tested binaries when authorized, or compile offline and transfer.

### 2.6 Kernel Modules & Loaded Drivers

```bash
lsmod
cat /proc/modules
modinfo <module> 2>/dev/null
find /lib/modules/$(uname -r) -type f -name "*.ko*" 2>/dev/null | head
```

---

## 3. Users, Groups & Authentication

### 3.1 Current User Context

```bash
id
whoami
groups
cat /etc/passwd | grep -v nologin | grep -v false
getent passwd
```

### 3.2 Password & Shadow Files

```bash
ls -la /etc/passwd /etc/shadow /etc/group /etc/gshadow 2>/dev/null
# Readable shadow? Critical finding
cat /etc/shadow 2>/dev/null
# Empty password fields in passwd (legacy)
awk -F: '($2 == "") {print $1}' /etc/passwd
```

| File | Normal perms | Finding if weak |
|------|--------------|-----------------|
| `/etc/passwd` | 644 | Expected readable; watch for UID 0 clones |
| `/etc/shadow` | 640 root:shadow | World-readable = offline crack |
| `/etc/group` | 644 | Group membership intel |

### 3.3 Sudo Configuration

```bash
sudo -l 2>/dev/null
sudo -l -U $(whoami) 2>/dev/null
cat /etc/sudoers 2>/dev/null
ls -la /etc/sudoers.d/ 2>/dev/null
cat /etc/sudoers.d/* 2>/dev/null
```

Look for:

- `NOPASSWD` entries
- Wildcards (`*`) on paths
- `SETENV` / env_keep
- Ability to run interpreters, editors, or package managers as root

Cross-reference with [GTFOBins](https://gtfobins.github.io/).

### 3.4 Login History & Sessions

```bash
w
who
last -a 2>/dev/null | head -30
lastlog 2>/dev/null | head -30
cat /var/log/auth.log 2>/dev/null | tail -50
cat /var/log/secure 2>/dev/null | tail -50
```

### 3.5 Interesting Groups

```bash
# Privileged / sensitive groups
getent group | grep -E 'sudo|wheel|docker|lxd|disk|adm|shadow|root|staff|video|dialout'
id
```

| Group | Typical impact |
|-------|----------------|
| `sudo` / `wheel` | Privilege escalation via sudo |
| `docker` | Often root-equivalent via container escape |
| `lxd` / `lxc` | Container escape to host |
| `disk` | Raw disk access → read any file |
| `adm` | Read many logs |
| `shadow` | Read `/etc/shadow` |

### 3.6 SSH Keys & Authorized Keys

```bash
find /home /root -name "id_rsa" -o -name "id_ed25519" -o -name "authorized_keys" 2>/dev/null
ls -la ~/.ssh/ 2>/dev/null
cat ~/.ssh/authorized_keys 2>/dev/null
cat ~/.ssh/id_rsa 2>/dev/null
find / -name "authorized_keys" 2>/dev/null
```

### 3.7 LDAP / Domain-Joined Linux

```bash
realm list 2>/dev/null
cat /etc/sssd/sssd.conf 2>/dev/null
getent passwd | head
id <domain_user>
```

---

## 4. Processes & Services

### 4.1 Process Listing

```bash
ps aux
ps auxf
ps -ef
pstree -a 2>/dev/null
top -b -n 1 | head -40
```

Focus on:

- Processes running as **root** that use user-writable configs/binaries
- Web servers, DBs, backup agents, monitoring agents
- Unusual interpreters (`python`, `perl`, `bash`) running as root

### 4.2 Process Capabilities & Open Files

```bash
# Capabilities on running processes (if available)
getpcaps $(pgrep -d, . 2>/dev/null) 2>/dev/null | head
# Open files for a PID
ls -l /proc/<PID>/fd 2>/dev/null
cat /proc/<PID>/cmdline | tr '\0' ' '; echo
cat /proc/<PID>/environ | tr '\0' '\n' 2>/dev/null
```

### 4.3 Services (systemd)

```bash
systemctl list-units --type=service --state=running 2>/dev/null
systemctl list-unit-files --type=service 2>/dev/null | grep enabled
ls -la /etc/systemd/system/ /lib/systemd/system/ 2>/dev/null
# Writable unit files?
find /etc/systemd/system /lib/systemd/system -type f -writable 2>/dev/null
```

### 4.4 Init Scripts (SysV)

```bash
ls -la /etc/init.d/ 2>/dev/null
ls -la /etc/rc*.d/ 2>/dev/null
```

### 4.5 Listening Services Correlation

Map root processes to listening ports (see Network section). A root service bound to a writable binary path is a classic privesc lead.

> **Real-world context:** Backup agents, outdated monitoring collectors, and custom internal tools often run as root with weak file permissions—higher ROI than hunting exotic CVEs.

---

## 5. Network Enumeration

### 5.1 Interfaces & Routes

```bash
ip a
ip route
ip neigh
ifconfig -a 2>/dev/null
route -n 2>/dev/null
cat /etc/resolv.conf
cat /etc/hosts
hostname -I 2>/dev/null
```

### 5.2 Listening Ports

```bash
ss -tulnp
ss -anp
netstat -tulnp 2>/dev/null
netstat -anp 2>/dev/null
lsof -i -P -n 2>/dev/null | head -50
```

| State | Meaning for privesc |
|-------|---------------------|
| Localhost-only high ports | Internal admin panels, DBs, Redis, Docker APIs |
| `0.0.0.0:2375` | Unauthenticated Docker API (critical) |
| `127.0.0.1:3306` | Local MySQL—credentials may be in configs |

### 5.3 Firewall Rules

```bash
iptables -L -n -v 2>/dev/null
nft list ruleset 2>/dev/null
firewall-cmd --list-all 2>/dev/null
ufw status verbose 2>/dev/null
```

### 5.4 Active Connections

```bash
ss -tpn
netstat -antp 2>/dev/null
```

### 5.5 Network Shares & Mounts

```bash
mount
cat /etc/fstab
df -h
findmnt
showmount -e <host> 2>/dev/null   # from another host if NFS server
```

Look for NFS exports with `no_root_squash` (covered in File 02).

---

## 6. Filesystem & Permissions

### 6.1 SUID / SGID Binaries

```bash
find / -perm -4000 -type f 2>/dev/null
find / -perm -2000 -type f 2>/dev/null
find / -perm -6000 -type f 2>/dev/null
```

Compare unusual SUID binaries against [GTFOBins](https://gtfobins.github.io/).

### 6.2 World-Writable Files & Directories

```bash
find / -writable -type d 2>/dev/null | head -100
find / -writable -type f 2>/dev/null | head -100
find / -perm -0002 -type d 2>/dev/null | grep -v proc
find / -perm -0002 -type f 2>/dev/null | grep -v proc
```

High-value writable paths:

- `/etc/cron.*`
- Service binaries and unit files
- Web roots with executable code
- Scripts invoked by root cron

### 6.3 Capabilities on Binaries

```bash
getcap -r / 2>/dev/null
```

Notable capabilities: `cap_setuid`, `cap_setgid`, `cap_dac_read_search`, `cap_dac_override`, `cap_sys_admin`, `cap_sys_ptrace`, `cap_net_raw`.

### 6.4 Interesting Directories

```bash
ls -la /opt /var/www /srv /home /tmp /var/tmp /dev/shm 2>/dev/null
ls -la /var/backups 2>/dev/null
ls -la /var/mail /var/spool/mail 2>/dev/null
```

### 6.5 Recent & Large Files

```bash
find /home /var/www /opt -type f -mtime -7 2>/dev/null | head -50
find / -type f -size +50M 2>/dev/null | head -30
find /var/log -type f -readable 2>/dev/null | head
```

### 6.6 Backup & Config Patterns

```bash
find / -name "*.bak" -o -name "*.old" -o -name "*.backup" -o -name "*~" 2>/dev/null | head -50
find / -name "wp-config.php" -o -name ".env" -o -name "config.php" 2>/dev/null
```

---

## 7. Credentials & Sensitive Files

### 7.1 Common Credential Locations

```bash
# History
cat ~/.bash_history ~/.zsh_history ~/.ash_history 2>/dev/null
# Configs
grep -RniE 'password|passwd|pwd|secret|api[_-]?key|token' /var/www /opt /home 2>/dev/null | head -100
# Environment files
find / -name ".env" 2>/dev/null
# Database configs
find /etc -name "*.conf" 2>/dev/null | head
```

### 7.2 Browser & App Credentials (if desktop)

```bash
ls ~/.mozilla ~/.config/google-chrome ~/.config/chromium 2>/dev/null
```

### 7.3 Cloud & Dev Credentials

```bash
ls -la ~/.aws/ ~/.azure/ ~/.config/gcloud/ ~/.kube/ ~/.docker/ 2>/dev/null
cat ~/.aws/credentials 2>/dev/null
cat ~/.kube/config 2>/dev/null
cat ~/.docker/config.json 2>/dev/null
env | grep -iE 'key|token|secret|pass|aws|azure|gcp'
```

### 7.4 Private Keys

```bash
find / -name "*.pem" -o -name "*.key" -o -name "id_rsa" -o -name "*.pfx" 2>/dev/null | head -50
grep -rl "BEGIN.*PRIVATE KEY" /home /opt /var/www /etc 2>/dev/null | head
```

### 7.5 Mail & Spool

```bash
ls -la /var/mail /var/spool/mail 2>/dev/null
cat /var/mail/$(whoami) 2>/dev/null
```

### 7.6 Scripts with Hardcoded Secrets

```bash
grep -RniE 'mysql|postgres|mongodb|redis|password\s*=' /usr/local/bin /opt /home 2>/dev/null | head -80
```

> **Pro tip:** Always check **backup copies** of configs (`wp-config.php.bak`, `settings.py~`). Admins often fix production files but leave secrets in backups with weaker permissions.

---

## 8. Cron, Timers & Scheduled Tasks

### 8.1 User & System Crontabs

```bash
crontab -l
ls -la /etc/cron.* /etc/crontab 2>/dev/null
cat /etc/crontab
cat /etc/cron.d/* 2>/dev/null
cat /etc/cron.daily/* /etc/cron.hourly/* /etc/cron.weekly/* 2>/dev/null
ls -la /var/spool/cron/ 2>/dev/null
cat /var/spool/cron/crontabs/* 2>/dev/null
```

### 8.2 systemd Timers

```bash
systemctl list-timers --all 2>/dev/null
ls /etc/systemd/system/*.timer /lib/systemd/system/*.timer 2>/dev/null
```

### 8.3 Writable Cron Targets

```bash
# Scripts called by cron that are writable by you
# Manually inspect paths in crontab output
ls -la /path/to/script.sh
```

### 8.4 Anacron & at

```bash
cat /etc/anacrontab 2>/dev/null
atq 2>/dev/null
```

Enumeration goal: root-owned jobs that execute **user-writable** scripts, or PATH-dependent commands without absolute paths (PATH hijacking).

---

## 9. Environment Variables & PATH

### 9.1 Full Environment

```bash
env
printenv
set
export -p
```

### 9.2 PATH Analysis

```bash
echo $PATH
# Writable directories in PATH?
echo $PATH | tr ':' '\n' | while read d; do
  [ -w "$d" ] && echo "WRITABLE: $d"
done
```

### 9.3 LD_* Variables

```bash
env | grep -i LD_
cat /etc/ld.so.conf /etc/ld.so.conf.d/* 2>/dev/null
ldconfig -p 2>/dev/null | head
```

If `sudo -l` shows `env_keep+=LD_PRELOAD` or `SETENV`, note for File 02 techniques.

### 9.4 Shell Restrictions

```bash
echo $SHELLOPTS
echo $BASHOPTS
# rbash / restricted?
type cd
type export
```

---

## 10. Containers & Virtualization

### 10.1 Am I in a Container?

```bash
cat /proc/1/cgroup
ls -la /.dockerenv 2>/dev/null
cat /proc/self/status | grep -i seccomp
capsh --print 2>/dev/null
mount | grep -E 'docker|overlay|lxc'
hostname
ps aux | head
```

### 10.2 Docker Presence on Host

```bash
id | grep docker
docker ps 2>/dev/null
docker images 2>/dev/null
ls -la /var/run/docker.sock 2>/dev/null
curl --unix-socket /var/run/docker.sock http://localhost/version 2>/dev/null
```

### 10.3 LXD / LXC

```bash
id | grep -E 'lxd|lxc'
lxc list 2>/dev/null
lxd version 2>/dev/null
```

### 10.4 Kubernetes Indicators

```bash
ls /var/run/secrets/kubernetes.io/serviceaccount/ 2>/dev/null
cat /var/run/secrets/kubernetes.io/serviceaccount/token 2>/dev/null | head -c 50; echo
env | grep -i kube
curl -k https://kubernetes.default.svc 2>/dev/null
```

Container and cloud privesc details are expanded in **File 06**.

---

## 11. Advanced & Stealth Techniques

### 11.1 Process Spying (without root)

Use [pspy](https://github.com/DominicBreuker/pspy) to observe cron and short-lived root processes:

```bash
./pspy64 -pf -i 1000
```

### 11.2 Reading Files via /proc

```bash
# Sometimes readable even when path is not (race / deleted files)
ls -l /proc/*/fd 2>/dev/null | grep -i deleted
# Maps
cat /proc/<PID>/maps 2>/dev/null | head
```

### 11.3 Extended Attributes & ACLs

```bash
getfacl -R /home 2>/dev/null | head -50
lsattr /etc/passwd /etc/shadow 2>/dev/null
getfattr -d /path/file 2>/dev/null
```

### 11.4 AppArmor / SELinux Contexts

```bash
aa-status 2>/dev/null
ps auxZ 2>/dev/null | head
id -Z 2>/dev/null
ls -Z /bin/bash 2>/dev/null
```

### 11.5 Kernel Exploit Hints (enumeration only)

```bash
uname -r
cat /proc/sys/kernel/kptr_restrict
cat /proc/sys/kernel/dmesg_restrict
cat /proc/sys/kernel/unprivileged_userns_clone 2>/dev/null
cat /proc/sys/kernel/unprivileged_bpf_disabled 2>/dev/null
sysctl -a 2>/dev/null | grep -E 'kptr|dmesg|userns|bpf'
```

### 11.6 Polkit / pkexec

```bash
ls -la $(which pkexec) 2>/dev/null
pkexec --version 2>/dev/null
# Historical CVEs (e.g. PwnKit) — version-dependent
```

### 11.7 Password Reuse & Hash Cracking Prep

If you obtain hashes:

```bash
# unshadow (on attacker box with john)
unshadow passwd shadow > unshadowed.txt
john unshadowed.txt --wordlist=rockyou.txt
hashcat -m 1800 unshadowed.txt rockyou.txt
```

---

## 12. Automation & Scripting

### 12.1 Recommended Tools (overview)

| Tool | Purpose | Notes |
|------|---------|-------|
| LinPEAS | Broad automated enum | Noisy but thorough |
| LinEnum | Classic bash enum | Easy to tweak |
| linux-smart-enumeration (lse.sh) | Level-based depth | Good for controlled noise |
| LES (Linux Exploit Suggester) | Kernel CVE mapping | Verify before use |
| pspy | Process monitoring | No root required |

Detailed usage is in **File 07**.

### 12.2 Minimal One-Liner Recon

```bash
echo "[*] Host: $(hostname) | User: $(id) | Kernel: $(uname -r)"; \
echo "[*] Sudo:"; sudo -l 2>/dev/null; \
echo "[*] SUID sample:"; find /usr -perm -4000 -type f 2>/dev/null | head; \
echo "[*] Docker sock:"; ls -la /var/run/docker.sock 2>/dev/null; \
echo "[*] Caps:"; getcap -r /usr/bin 2>/dev/null | head
```

### 12.3 Saving Output Safely

```bash
mkdir -p /tmp/.enum_$(date +%s)
# Prefer world-writable tmp areas you control; clean up after engagement
OUT=/dev/shm/.e
(uname -a; id; sudo -l; ss -tulnp) > "$OUT" 2>&1
```

> **Warning:** Writing enum dumps to shared `/tmp` may leak findings to other users. Prefer `/dev/shm` with restrictive permissions or exfiltrate to your C2 channel.

### 12.4 Script Hygiene

- Redirect stderr: `2>/dev/null` where noise hides signal
- Timeout long finds: `timeout 60 find / ...`
- Avoid recursive greps on huge filesystems without limits on production

---

## 13. Enumeration Checklist

Use this as a pre-escalation gate:

- [ ] Identity: `id`, groups, shell type
- [ ] OS/kernel/arch recorded
- [ ] `sudo -l` reviewed (NOPASSWD, GTFOBins)
- [ ] SUID/SGID list reviewed
- [ ] Capabilities (`getcap -r /`) reviewed
- [ ] Cron/timers inspected for writable targets
- [ ] PATH writable dirs checked
- [ ] World-writable service files / scripts
- [ ] Credentials in histories, `.env`, configs, cloud CLIs
- [ ] SSH keys and `authorized_keys`
- [ ] Network listeners (esp. localhost)
- [ ] Docker/LXD/K8s indicators
- [ ] NFS/mount options in `fstab`
- [ ] Interesting running processes as root
- [ ] Automated tool run (LinPEAS/LSE) if in scope
- [ ] Findings prioritized by impact and reliability

### Prioritization Matrix

| Finding type | Typical reliability | Typical impact |
|--------------|---------------------|----------------|
| sudo NOPASSWD + GTFOBins | High | High |
| docker group / docker.sock | High | Critical |
| Writable root cron script | High | High |
| Readable shadow | High | High (offline) |
| Kernel exploit | Variable | Critical (noisy) |
| Cred reuse | Medium | Lateral + local |

---

## 14. References

- [HackTricks — Linux Privilege Escalation](https://book.hacktricks.xyz/linux-hardening/privilege-escalation)
- [GTFOBins](https://gtfobins.github.io/)
- [PayloadsAllTheThings — Linux Priv Esc](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Linux%20-%20Privilege%20Escalation.md)
- [MITRE ATT&CK — Discovery (TA0007)](https://attack.mitre.org/tactics/TA0007/)
- [Linux man-pages](https://man7.org/linux/man-pages/)
- [pspy](https://github.com/DominicBreuker/pspy)
- [PEASS-ng / LinPEAS](https://github.com/peass-ng/PEASS-ng)

---

## Appendix A: Command Quick Reference Table

| Area | Commands |
|------|----------|
| System | `uname -a`, `cat /etc/os-release`, `hostnamectl` |
| Users | `id`, `cat /etc/passwd`, `sudo -l`, `getent group` |
| Processes | `ps auxf`, `systemctl list-units`, `/proc/<pid>/` |
| Network | `ip a`, `ss -tulnp`, `cat /etc/resolv.conf` |
| Files | `find -perm -4000`, `getcap -r /`, `find -writable` |
| Creds | `env`, history files, `.aws`, `.kube`, `.env` |
| Schedule | `crontab -l`, `/etc/cron*`, `systemctl list-timers` |
| Containers | `/.dockerenv`, `docker.sock`, K8s serviceaccount |

## Appendix B: Sample Enumeration Report Snippet

```text
Host: web-prod-03 (10.10.14.22)
User: www-data (uid=33) groups=33(www-data)
Kernel: 5.4.0-150-generic (Ubuntu 20.04.6 LTS)
Findings:
  [HIGH] /usr/local/bin/backup.sh writable; executed by root cron every 5 min
  [HIGH] User can run /usr/bin/vim as root via sudo NOPASSWD
  [MED]  MySQL creds in /var/www/html/config.php
  [INFO] No docker group; no unusual SUID beyond distro defaults
Next steps: GTFOBins vim sudo shell; secondary path cron write.
```

## Appendix C: Noise Management

| Action | Relative noise | Notes |
|--------|----------------|-------|
| Reading `/etc` and home configs | Low | Prefer first |
| Full-filesystem `find /` | Medium | Time-box |
| LinPEAS full | High | May trip HIDS |
| Compiling exploits on target | High | Avoid if possible |
| Mass port scans from host | High | Scope carefully |

---

*End of File 01 — Linux Enumeration Deep Dive*  
*Next: `02_Linux_Privilege_Escalation_Techniques.md`*
