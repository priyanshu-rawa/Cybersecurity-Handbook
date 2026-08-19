up:: [[Hacking Toolkit]]
# Kali Linux

Kali Linux is a Debian-based Linux distribution designed for digital forensics and [[penetration testing]]. It is developed, funded, and maintained by Offensive Security, a leading information security training company.

## Key Features

- **Comprehensive Toolset:** Includes over 600 pre-installed [[penetration testing]] programs, including [[Nmap]] (a network mapper), [[Wireshark]] (a packet analyzer), [[John the Ripper]] (a password cracker), and [[Aircrack-ng]] (a software suite for penetration-testing wireless LANs).
- **Live Boot Capability:** Can be run from a USB stick or DVD without needing installation, which is ideal for forensic purposes where no traces are to be left.
- **Custom Kernel:** Tailored specifically for [[penetration testing]], with patches that allow for injection of packets in wireless networks and other specific tasks.
- **Regular Updates:** Maintained with regular updates to tools and distributions, ensuring the latest software patches and improvements are available.

## Softwares Available 

Here's the list of some of the most important tools included in Kali Linux, organized alphabetically along with a description of what each tool does:

| **Tool Name**                | **Description**                                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **[[Aircrack-ng]]**          | A suite for assessing WiFi [[network security]]; includes monitoring, attacking, testing, and cracking capabilities.                       |
| **Apache**                   | A robust, commercial-grade, feature-packed web server that's widely used.                                                                  |
| **airgeddon**                | A multi-use bash script for Linux systems to audit wireless networks.                                                                      |
| **Armitage**                 | A graphical cyber attack management tool for [[Metasploit]] which visualizes targets and suggests exploits.                                |
| **Autopsy**                  | A digital forensics platform and graphical interface to The Sleuth Kit and other tools.                                                    |
| **binwalk**                  | A tool for searching a given binary image for embedded files and executable code.                                                          |
| **Burp Suite**               | An integrated platform for performing security testing of web applications.                                                                |
| **Chkrootkit**               | A tool to locally check for signs of a rootkit.                                                                                            |
| **cisco-auditing-tool**      | A tool to audit the security of Cisco devices.                                                                                             |
| **crunch**                   | A wordlist generator where you can specify a standard character set or a character set you specify.                                        |
| **Curl**                     | A command-line tool for getting or sending data using URL syntax.                                                                          |
| **DirBuster**                | A multi-threaded java application designed to brute force directories and files names on web/application servers.                          |
| **dnsenum**                  | A tool to enumerate DNS information.                                                                                                       |
| **dnsmap**                   | A passive DNS network mapper.                                                                                                              |
| **dnsrecon**                 | DNS Enumeration Script.                                                                                                                    |
| **dos2unix**                 | A tool to convert text files with DOS or MAC line breaks to Unix line breaks and vice versa.                                               |
| **enum4linux**               | A tool for enumerating information from Windows and Samba systems.                                                                         |
| **EtherApe**                 | A graphical network monitor for Unix modeled after etherman.                                                                               |
| **Ettercap**                 | A comprehensive suite for [[man-in-the-middle attacks]] on LAN, supports active and passive dissection of many protocols.                  |
| **ferret**                   | A tool for sniffing and analyzing LAN traffic.                                                                                             |
| **foremost**                 | A forensic program to recover lost files based on their headers, footers, and internal data structures.                                    |
| **Gobuster**                 | A tool used to brute-force URIs (directories and files) in web sites and DNS subdomains.                                                   |
| **Hashcat**                  | An advanced password recovery tool supporting a large number of Algorithm algorithms and approaches.                                       |
| **Hydra**                    | A very fast network logon cracker which supports many different services.                                                                  |
| **ike-scan**                 | A tool that uses IKE (the Internet Key Exchange protocol) to discover, fingerprint and test IPsec VPN servers.                             |
| **[[John the Ripper]]**      | A fast password cracker, currently available for many flavors of Unix, Windows, DOS, and OpenVMS.                                          |
| **Kismet**                   | A wireless network detector, sniffer, and intrusion detection system.                                                                      |
| **king-phisher**             | A tool for testing and promoting user awareness by simulating real world phishing attacks.                                                 |
| **knockpy**                  | A python tool designed to enumerate subdomains on a target domain through a wordlist.                                                      |
| **macchanger**               | A utility for viewing/manipulating the MAC address of network interfaces.                                                                  |
| **Maltego**                  | An interactive data mining tool that renders directed graphs for link analysis.                                                            |
| **masscan**                  | A TCP port scanner, spews SYN packets asynchronously, scanning entire Internet in under 5 minutes.                                         |
| **medusa**                   | A speedy, massively parallel, modular, login brute-forcer for network services.                                                            |
| **[[Metasploit]] Framework** | A tool for developing and executing exploit code against a remote target machine.                                                          |
| **[[mimikatz]]**             | A tool to extract plaintexts passwords, hash, PIN code and [[kerberos]] tickets from memory.                                               |
| **Ncat**                     | A network utility for reading from and writing to network connections using TCP or UDP.                                                    |
| **netcat**                   | Known as the Swiss-army knife of networking, it is a versatile networking tool.                                                            |
| **Nikto**                    | A web server scanner which performs comprehensive tests against web servers for multiple items.                                            |
| **[[Nmap]]**                 | A network discovery and security auditing tool.                                                                                            |
| **oclHashcat**               | An advanced GPU hash cracking utility.                                                                                                     |
| **OpenVAS**                  | A full-featured vulnerability scanner.                                                                                                     |
| **OWASP ZAP**                | An open-source web application security scanner.                                                                                           |
| **PDFCrack**                 | A tool for recovering passwords and content from PDF-files.                                                                                |
| **Recon-ng**                 | A full-featured web reconnaissance framework written in Python.                                                                            |
| **SET**                      | The Social-Engineer Toolkit (SET) is specifically designed to perform advanced attacks against the human element.                          |
| **SQLmap**                   | An open source penetration testing tool that automates the process of detecting and exploiting SQL injection flaws.                        |
| **Snort**                    | A free open source network intrusion detection system (IDS) and intrusion prevention system (IPS).                                         |
| **Tcpdump**                  | A powerful command-line packet analyzer; allows the user to display TCP/IP and other packets being transmitted or received over a network. |
| **Tor**                      | Enables anonymous communication through onion routing.                                                                                     |
| **Vega**                     | A free and open-source web security scanner and web security testing platform.                                                             |
| **Wget**                     | A free utility for non-interactive download of files from the Web.                                                                         |
| **[[Wireshark]]**            | A network protocol analyzer that lets you capture and interactively browse the traffic running on a computer network.                      |
| **Yersinia**                 | A network tool designed to take advantage of some weakeness in different network protocols.                                                |

## How It Works

Kali Linux is used by cybersecurity professionals and ethical hackers to test the security of networks and systems. Its tools support a wide range of strategies, from testing the strength of passwords to finding vulnerabilities in network configurations. Kali can be run from a live CD or USB drive, installed on a hard drive, set up as a virtual machine, or even run on a cloud server.

## Advantages

- **Security Focused:** Optimized for testing systems for vulnerabilities, making it a vital tool for security professionals.
- **Extensive Repository:** Houses a vast array of security tools, reducing the need for additional software.
- **Flexibility:** Supports multiple languages and has extensive hardware compatibility, including ARM devices like the Raspberry Pi.
- **Customizable:** Allows users to easily customize the distribution to include personal scripts or additional tools.

## Related Cybersecurity Policies

- **[[NIST Special Publication 800-115]],** "Technical Guide to Information Security Testing and Assessment": Provides guidelines that support the use of tools like those in Kali Linux for identifying vulnerabilities and security risks.
- **[[ISOIEC 27001|ISO/IEC 27001]]:** Outlines best practices in information security management, which can be supported through the security testing capabilities provided by Kali Linux.

## Documentation for How to Use It

Kali Linux provides extensive documentation which is crucial for both beginners and experienced users:
- **Official Kali Linux Documentation:** Available on the Kali Linux website, this resource covers everything from installation to advanced tool usage.
- **Kali Linux Tools Listing:** Each tool included in Kali Linux has its own webpage on the Kali Linux site detailing how to use it.
- **Books and Courses by Offensive Security:** Including "Kali Linux Revealed," a book covering the basics of Kali Linux which is available for free online and as a downloadable PDF.
- [[Linux Commands]]

## Current Status

Kali Linux continues to be actively developed with regular version releases that provide updated tools and improved functionality. The distribution remains one of the most popular choices among security professionals for [[penetration testing]] and security research.

## Revision History

- **2024-04-23:** Entry created.
