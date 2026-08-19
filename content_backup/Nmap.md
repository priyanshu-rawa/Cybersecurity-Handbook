---
aliases:
  - Network Mapper
  - Network Mapper (Nmap)
---
up:: [[Hacking Toolkit]]
# Nmap (Network Mapper)

Nmap (Network Mapper) is an open-source network scanner used by network administrators and security professionals to discover devices and services on a network, assess network inventories, manage service upgrade schedules, and monitor host or service uptime. Nmap uses raw IP packets in novel ways to determine what hosts are available on the network, what services (application name and version) those hosts are offering, what operating systems (and OS versions) they are running, and what type of packet filters/[[firewalls]] are in use.

## Key Features

- **Host Discovery:** Identifies devices on the network, determining which hosts are available and the services they offer.
- **Port Scanning:** Enumerates open ports on target hosts.
- **Version Detection:** Helps in identifying the application name and version number of the services running on open ports.
- **OS Detection:** Determines the operating system and hardware characteristics of networked devices.
- **Scriptable Interaction:** Uses the Nmap Scripting Engine (NSE) for more advanced discovery and security auditing.

## How It Works

Nmap sends specially crafted packets to the target host and then analyzes the responses to discover hosts and services on a computer network. It supports several types of scans, most notably TCP SYN scans, which are used to determine if ports are open by sending a SYN packet and waiting for a response, and UDP scans for identifying open UDP ports.

## Advantages

- **Flexibility:** Offers a variety of options for scanning in different environments and for different purposes.
- **Wide Range of Features:** From basic network scanning to advanced vulnerability detection.
- **Extensive OS and Service Version Database:** Regularly updated to recognize the latest operating systems and network services.
- **Powerful Scripting Engine:** Allows users to write scripts for customized tasks.

## Exploitable Mechanisms/Weaknesses

- **Detectability:** Certain scans are easily detected by IDS/IPS, potentially alerting adversaries.
- **Misconfigurations:** Incorrectly configured scans can lead to incomplete or misleading results.

## Documentation and Resources

- **Official Nmap Website:** [Nmap Official Site](https://nmap.org/)
- **Official Nmap Documentation:** [Nmap Documentation](https://nmap.org/docs.html)
- **Nmap Network Scanning Book:** [Nmap Book](https://nmap.org/book/) by Gordon Lyon (also known as Fyodor Vaskovich), the creator of Nmap.

## Helpful Beginner Tips

- **Start with Simple Scans:** Begin by running simple scans, such as `nmap -sP 192.168.1.*` to discover which hosts are up in a local subnet.
- **Use the Zenmap GUI:** For beginners, using Nmap’s official GUI, Zenmap, can simplify the scanning process and help in understanding the command options.
- **Practice Ethical Scanning:** Always have permission to scan networks. Unauthorized scanning can be considered illegal or intrusive.
- **Learn from Examples:** Explore the wide range of scan types and scripts included in the Nmap documentation and book to better understand how to effectively use the tool.

## Subtopics

 - **[[Banner Grabbing]]**: a technique used to gain information about a computer system on a network and the services running on its open ports.
 - **[[Transmission Control Protocol (TCP)]]**:
	 - **[[TCP Message Types]]**: are part of the TCP header used to manage the state of a TCP connection
- **[[User Datagram Protocol (UDP)]]**: 


## Scripts

NMAP uses the Nmap Scripting Engine (NSE) to extend its functionality with scripts that can perform a wide range of functions from vulnerability detection to advanced network discovery:
- **Default Scripts (-sC):** Executes standard scripts for additional discovery.
- **Vulnerability Scanning:** Scripts in NSE can check for vulnerabilities within the network.

## How To Use Nmap

### Basic Usage

To run a simple scan on a target, you can use the following command:
```bash
nmap [target]
```
Where `[target]` can be an IP address, a range of IP addresses, or a domain name.

### Common Scanning Techniques

1. **Ping Scan:** To check if a host is online without scanning ports:
   ```bash
   nmap -sn [target]
   ```

2. **Scan Specific Ports:** To scan specific ports, use the `-p` option:
   ```bash
   nmap -p 80,443 [target]
   ```

3. **Aggressive Scan:** An aggressive scan performs service detection, OS detection, traceroute, and runs scripts against target services:
   ```bash
   nmap -A [target]
   ```

4. **Stealth Scan:** Use a SYN scan to be less intrusive and avoid logging the scan as a full connection:
   ```bash
   nmap -sS [target]
   ```

5. **UDP Scan:** Scanning UDP ports can be done with the `-sU` option:
   ```bash
   nmap -sU [target]
   ```

6. **Full Scan:** To scan all 65535 ports, use:
   ```bash
   nmap -p- [target]
   ```

### Interpreting Results

- **Open:** The port is accessible and responding to requests.
- **Closed:** The port is accessible but no application is listening on it.
- **Filtered:** Nmap cannot determine if the port is open because packet filtering prevents its probes from reaching the port.
- **Unfiltered:** The port is accessible, but Nmap cannot determine if it is open or closed.
- **Open|Filtered:** Nmap cannot determine whether the port is open or filtered.

### Advanced Usage

- **OS Detection:** Use the `-O` option to attempt to determine the operating system of the target:
  ```bash
  nmap -O [target]
  ```

- **Service Version Detection:** To determine service versions running on open ports, use the `-sV` option:
  ```bash
  nmap -sV [target]
  ```

- **Script Scanning:** Nmap's scripting engine (NSE) is extremely powerful and can be used to perform a variety of network security checks:
  ```bash
  nmap --script=default [target]
  ```

- **Output Options:** Save your scan results in a specific format for later analysis:
  ```bash
  nmap -oX output.xml [target]  # XML format
  nmap -oN output.nmap [target] # Normal format
  ```
## Scan Types

| **Scan Type**          | **Description**                                                                                                                    | **Primary Function**                              |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| **Sweep Scan**         | Involves pinging a range of IP addresses to identify which hosts are online. Commonly uses ICMP Echo requests or ARP for LANs.      | Quickly identify active hosts within a network.   |
| **Trace Scan**         | Uses the `--traceroute` option in Nmap to identify the path packets take to reach a specific host.                                  | Map the route packets take through the network.   |
| **Port Scanning**      | The core function of Nmap, this scan type probes ports on a host to identify network services and their status (open, closed, etc.). | Determine open, closed, or filtered ports on a host. |
| **Fingerprinting**     | Also known as OS detection, uses a series of TCP/IP stack behavior tests to identify the operating system of a target host.         | Identify the operating system of networked devices. |
| **Version Scanning**   | Uses the `-sV` option to probe ports to determine service/application version information running on open ports.                   | Identify application and service versions to assess compatibility or vulnerabilities. |
| **Vulnerability Scanning** | While not a direct feature of Nmap, the NSE (Nmap Scripting Engine) can be used to run scripts that check for known vulnerabilities. | Check for known vulnerabilities in services and protocols on the network. |
## Scan Options - Target Specifications 

| **Option**                                  | **Description**                                                                                                                                                                 | Examples                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Direct Input**                            | You can directly input hostnames, IP addresses, and networks as targets. Examples:                                                                                              | `scanme.nmap.org`, `192.168.0.1`, `10.0.0-255.1-254`. |
| **-iL `<inputfilename>`**                   | Specifies a file that contains a list of hosts or networks to scan. Each line in the file specifies a single target. Use this option to scan multiple targets listed in a file. | `nmap -iL inputfilename.txt`                          |
| **-iR `<num hosts>`**                       | Randomly selects the specified number of hosts to scan. Useful for sampling the network.                                                                                        | `nmap -iR 10` (to randomly scan ten hosts)            |
| **--exclude `<host1[,host2][,host3],...>`** | Excludes one or more specified hosts or networks from a scan. Useful when you want to avoid scanning specific targets.                                                          | `nmap --exclude 192.168.0.5,scanme.nmap.org`          |
| **--excludefile `<exclude_file>`**          | Similar to `--exclude`, but the excluded targets are listed in a file, with one target per line. This option is useful for maintaining a consistent set of exclusion rules.     | `nmap --excludefile excluded_hosts.txt`               |

## Scan Options - Host Discovery

| **Option**           | **Description**                                                      | **Example**                                     |
|----------------------|----------------------------------------------------------------------|-------------------------------------------------|
| **-sL**              | List Scan - simply lists targets without scanning them.              | `nmap -sL 192.168.1.0/24`                       |
| **-sn**              | Ping Scan - disables port scan, only checks if the host is up.       | `nmap -sn 192.168.1.0/24`                       |
| **-Pn**              | Treat all hosts as online and skip host discovery.                   | `nmap -Pn 192.168.1.0/24`                       |
| **-PS/PA/PU/PY**     | TCP SYN/ACK, UDP or SCTP discovery to given ports.                   | `nmap -PS22,80 192.168.1.0/24`                  |
| **-PE/PP/PM**        | ICMP echo, timestamp, and netmask request discovery probes.          | `nmap -PE 192.168.1.0/24`                       |
| **-PO**              | IP Protocol Ping to determine if a host is up by protocol.           | `nmap -PO 192.168.1.0/24`                       |
| **-n/-R**            | Never do DNS resolution/Always resolve (sometimes is default).       | `nmap -n 192.168.1.0/24`, `nmap -R 192.168.1.0/24` |
| **--dns-servers**    | Specify custom DNS servers.                                          | `nmap --dns-servers 8.8.8.8 192.168.1.0/24`     |
| **--system-dns**     | Use the OS's DNS resolver.                                           | `nmap --system-dns 192.168.1.0/24`              |
| **--traceroute**     | Trace the hop path to each host.                                     | `nmap --traceroute 192.168.1.0/24`              |

## Scan Options - Scan Techniques 

| **Option**       | **Scan Technique**                          | **Description**                                                                                                                 | **Example**                                          |
|------------------|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
| **-sS**          | TCP SYN Scan                                | Initiates a half-open connection to the target, less likely to be logged.                                                      | `nmap -sS 192.168.1.1`                              |
| **-sT**          | TCP Connect() Scan                          | Uses the standard TCP/IP `connect()` system call to scan. More likely to be logged by the target.                               | `nmap -sT 192.168.1.1`                              |
| **-sA**          | TCP ACK Scan                                | Useful for mapping out firewall rule sets and finding unfiltered ports.                                                        | `nmap -sA 192.168.1.1`                              |
| **-sW**          | TCP Window Scan                             | Similar to ACK scan, but reveals more information about whether the port is open based on the window size of the returned packet.| `nmap -sW 192.168.1.1`                              |
| **-sM**          | TCP Maimon Scan                             | Variation of the FIN scan that can be used to bypass certain packet filters.                                                   | `nmap -sM 192.168.1.1`                              |
| **-sU**          | UDP Scan                                    | Sends UDP packets to the target ports. Useful for finding open UDP ports.                                                      | `nmap -sU 192.168.1.1`                              |
| **-sN/sF/sX**    | TCP Null, FIN, and Xmas Scans               | These scans turn off certain flags in a TCP header to elicit a response from hosts.                                            | `nmap -sN 192.168.1.1`, `nmap -sF 192.168.1.1`, `nmap -sX 192.168.1.1` |
| **--scanflags**  | Custom TCP Scan Flags                        | Allows you to customize the TCP flags in a packet to create specialized scans.                                                 | `nmap --scanflags URGACKPSHRSTSYNFIN 192.168.1.1`   |
| **-sI**          | Idle Scan                                   | Uses a "zombie" host to scan a target, which can allow the scanner to remain anonymous.                                        | `nmap -sI zombiehost 192.168.1.1`                   |
| **-sY/sZ**       | SCTP INIT/COOKIE-ECHO Scans                 | Scans using SCTP messages to find listening ports.                                                                             | `nmap -sY 192.168.1.1`, `nmap -sZ 192.168.1.1`      |
| **-sO**          | IP Protocol Scan                            | Determines which IP protocols are supported by the target.                                                                     | `nmap -sO 192.168.1.1`                              |
| **-b**           | FTP Bounce Scan                             | Uses the FTP protocol's feature to scan other hosts through an FTP relay.                                                      | `nmap -b FTPrelayhost 192.168.1.1`                  |

## Scan Options - Port Specification & Scan Order

| **Option**       | **Function**                                        | **Description**                                                                                          | **Example**                                                |
|------------------|-----------------------------------------------------|----------------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| **-p**           | Port Ranges                                         | Specifies particular ports or ranges of ports to scan.                                                   | `-p22`, `-p1-65535`, `-p U:53,111,137,T:21-25,80,139,8080` |
| **-F**           | Fast Mode                                           | Scans fewer ports than the default scan, limiting to the most commonly used ports.                       | `nmap -F 192.168.1.1`                                      |
| **-r**           | Consecutive Scan                                    | Scans ports in numerical order rather than randomizing the scan order.                                   | `nmap -r 192.168.1.1`                                      |
| **--top-ports**  | Top Ports                                           | Scans a specific number of the most common ports as determined by Nmap's built-in frequency data.        | `nmap --top-ports 10 192.168.1.1`                          |
| **--port-ratio** | Port Ratio                                          | Scans ports more common than a given ratio (a value between 0 and 1).                                    | `nmap --port-ratio 0.1 192.168.1.1`                        |

##  Scan Options - Service/Version Detection

| **Option**              | **Function**                              | **Description**                                                                         | **Example**                                           |
|-------------------------|-------------------------------------------|-----------------------------------------------------------------------------------------|-------------------------------------------------------|
| **-sV**                 | Service/Version Detection                 | Probes open ports to determine service and version information.                          | `nmap -sV 192.168.1.1`                               |
| **--version-intensity** | Version Scan Intensity Level              | Sets the intensity of the version detection scan from 0 (light) to 9 (try all probes).  | `nmap -sV --version-intensity 5 192.168.1.1`         |
| **--version-light**     | Light Version Scan                        | Limits to most likely probes, equivalent to an intensity level of 2.                     | `nmap -sV --version-light 192.168.1.1`               |
| **--version-all**       | Exhaustive Version Scan                   | Tries every single probe, equivalent to an intensity level of 9.                         | `nmap -sV --version-all 192.168.1.1`                 |
| **--version-trace**     | Version Scan Trace                        | Shows detailed version scan activity, useful for debugging.                              | `nmap -sV --version-trace 192.168.1.1`               |

## Scan Options - Script Scan

| **Option**                | **Function**                              | **Description**                                                                                     | **Example**                                             |
|---------------------------|-------------------------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------|
| **-sC**                   | Default Script Scan                       | Equivalent to `--script=default`, which runs default scripts against target hosts.                  | `nmap -sC 192.168.1.1`                                  |
| **--script**              | Specify Custom Scripts                    | Allows the user to specify individual scripts, directories, or categories of scripts to execute.    | `nmap --script=http-title,ssl-cert 192.168.1.1`         |
| **--script-args**         | Provide Arguments to Scripts              | Used to pass arguments to scripts in key=value format, separated by commas.                         | `nmap --script-args user=admin,pass=password 192.168.1.1` |
| **--script-trace**        | Trace Script Activity                     | Shows all the data sent and received by Nmap scripts, useful for debugging.                         | `nmap --script-trace --script=http-title 192.168.1.1`    |
| **--script-updatedb**     | Update Script Database                    | Updates the script database to ensure the latest scripts are used.                                  | `nmap --script-updatedb`                                 |

## Scan Option - OS Detection

| **Option**          | **Function**                                | **Description**                                                      |
|---------------------|---------------------------------------------|----------------------------------------------------------------------|
| **-O**              | Enable OS Detection                         | Activates Nmap's OS detection feature to attempt to identify the operating system of the target host. |
| **--osscan-limit**  | Limit OS Detection                          | Restricts OS detection to targets that are likely to be accurately identified (such as those that are up and have at least one open and one closed TCP port). |
| **--osscan-guess**  | Aggressive OS Guessing                      | Makes Nmap guess the OS more aggressively when detection is uncertain. |

## Scan Options - Timing & Performance

Here's a table that outlines the timing and performance-related scan options for Nmap:

| **Option**                     | **Function**                                | **Description**                                                                                                      | **Example**                                   |
|--------------------------------|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| **-T<0-5>**                    | Timing Template                             | Sets the timing aggressiveness of the scan, with higher numbers being faster but potentially less stealthy and more resource-intensive. | `nmap -T4 192.168.1.1`                       |
| **--min-hostgroup**            | Minimum Host Group Size                     | Sets the minimum number of hosts scanned in parallel.                                                                | `nmap --min-hostgroup 10 192.168.1.0/24`     |
| **--max-hostgroup**            | Maximum Host Group Size                     | Sets the maximum number of hosts scanned in parallel.                                                                | `nmap --max-hostgroup 100 192.168.1.0/24`    |
| **--min-parallelism**          | Minimum Probe Parallelization               | Sets the minimum number of probe parallelization (number of probe packets sent in parallel).                         | `nmap --min-parallelism 10 192.168.1.1`      |
| **--max-parallelism**          | Maximum Probe Parallelization               | Sets the maximum number of probe parallelization.                                                                    | `nmap --max-parallelism 100 192.168.1.1`     |
| **--min-rtt-timeout**          | Minimum RTT Timeout                         | Sets the minimum round trip time (RTT) timeout for a probe.                                                          | `nmap --min-rtt-timeout 100ms 192.168.1.1`   |
| **--max-rtt-timeout**          | Maximum RTT Timeout                         | Sets the maximum round trip time (RTT) timeout for a probe.                                                          | `nmap --max-rtt-timeout 2s 192.168.1.1`      |
| **--initial-rtt-timeout**      | Initial RTT Timeout                         | Sets the initial round trip time (RTT) timeout for a probe.                                                          | `nmap --initial-rtt-timeout 1s 192.168.1.1`  |
| **--max-retries**              | Maximum Retries                             | Sets the cap for the number of port scan probe retransmissions.                                                      | `nmap --max-retries 5 192.168.1.1`           |
| **--host-timeout**             | Host Timeout                                | Specifies the maximum amount of time to spend scanning a target before giving up.                                    | `nmap --host-timeout 30m 192.168.1.1`        |
| **--scan-delay**               | Minimum Delay Between Probes                | Sets a delay between individual probe packets to reduce scan speed and bandwidth usage.                              | `nmap --scan-delay 1s 192.168.1.1`           |
| **--max-scan-delay**           | Maximum Delay Between Probes                | Sets the maximum delay allowed between probes, useful to ensure timely scanning while being polite to the network.   | `nmap --max-scan-delay 10s 192.168.1.1`      |
| **--min-rate**                 | Minimum Packet Rate                         | Ensures that scanning does not fall below a specified packets-per-second rate.                                        | `nmap --min-rate 50 192.168.1.1`             |
| **--max-rate**                 | Maximum Packet Rate                         | Limits the rate of sending packets to avoid overwhelming the network and target hosts.                                | `nmap --max-rate 10 192.168.1.1`             |

## Scan Options - 

## Scan Options - 

## Current Status - 

Nmap continues to be developed and updated with new features and improvements, maintaining its relevance as one of the most powerful and versatile network scanning tools available today.

## Revision History

- **2024-04-23:** Entry created.
