---
aliases:
  - Aircrack-ng suite
---
up:: [[Deauthentication attack]]
# Aircrack-ng

**Aircrack-ng** is an advanced suite of software tools designed for auditing and testing the security of wireless networks. This open-source framework is primarily used for [[network security]] diagnostics and is particularly effective in executing attacks like packet sniffing, deauthentication, and the cracking of WEP and WPA/WPA2-PSK keys.

## Key Features

- **Versatility:** Supports a wide range of wireless network adapters.
- **Comprehensive Tools:** Includes utilities for network monitoring, packet capturing, and password cracking.
- **Cross-Platform:** Available for Linux, Windows, and OS X platforms.
- **Active Development:** Regularly updated to address new vulnerabilities and improve functionality.
- **Community Support:** Benefits from a large, active community of users and developers.

Here's a table comparing the different tools within the Aircrack-ng suite, each designed for specific tasks related to [[network security]] testing, particularly focusing on WiFi networks.

| **Tool**           | **Purpose**                                                                 | **Usage Example**                               |
|--------------------|-----------------------------------------------------------------------------|-------------------------------------------------|
| **airmon-ng**      | Manages monitor mode on wireless network cards.                             | `airmon-ng start wlan0`                         |
| **airodump-ng**    | Captures raw 802.11 frames for inspection and network traffic monitoring.   | `airodump-ng wlan0mon`                          |
| **aireplay-ng**    | Injects frames to generate traffic and manipulate WiFi associations and authentication. | `aireplay-ng --deauth 100 -a [BSSID] wlan0mon`  |
| **aircrack-ng**    | Cracks WEP and WPA/WPA2-PSK keys using captured packets.                    | `aircrack-ng -w wordlist.txt -b [BSSID] [capfile.cap]` |
| **airbase-ng**     | Creates a fake AP and allows complex attack scenarios.                      | `airbase-ng -e "Fake AP" -c 6 wlan0mon`         |
| **airodump-ng**    | Captures packets from a specific network to aid in analysis and cracking.   | `airodump-ng --bssid [Target BSSID] -c [Channel] wlan0mon` |
| **airserv-ng**     | Turns a wireless card into an access point server for other Aircrack-ng tools to connect. | `airserv-ng -d wlan0mon -p 6666`               |
| **airtun-ng**      | Creates a virtual tunnel interface for decrypting WEP traffic.              | `airtun-ng -a [BSSID] wlan0mon`                 |
| **packetforge-ng** | Forges arbitrary packets to be used in injection attacks.                   | `packetforge-ng -0 -a [BSSID] -h [Source MAC] -k 255.255.255.255 -l 255.255.255.255 -y [PRGA file] -w [output file]` |
| **airdecap-ng**    | Decrypts WEP/WPA/WPA2 capture files to plaintext.                           | `airdecap-ng -e "AP Name" -p [password] [capfile.cap]` |
| **airdecloak-ng**  | Removes WEP cloaking from a packet capture to reveal hidden data.           | `airdecloak-ng -0 [inputfile.cap]`              |
| **besside-ng**     | Automated tool for capturing WPA handshakes, WEP keys, and providing WPA cracking. | `besside-ng wlan0mon`                           |
## Problem Addressed

Aircrack-ng addresses the need for robust tools to test [[network security]] from a defensive standpoint, helping administrators:

- **Identify Vulnerabilities:** Detect weak points in a wireless network’s security before they can be exploited maliciously.
- **Improve Security Posture:** Guide ongoing improvements to security configurations and policies.
- **Educate Practitioners:** Provide practical, hands-on experience for network administrators and security professionals.

## Implications

- **Security Testing:** Enables thorough testing of [[network security]] measures.
- **[[Ethical Hacking]]:** Used in [[ethical hacking]] contexts to demonstrate potential security breaches.
- **Security Awareness:** Raises awareness of the importance of securing wireless networks against common and sophisticated attacks.

## Impact

- **Enhanced [[Network Security]]:** Helps secure networks against unauthorized access and data breaches.
- **Informed Security Decisions:** Provides data-driven insights into [[network security]] health.
- **Skill Development:** Offers valuable toolsets for cybersecurity education and professional development.

## Defense Mechanisms

- **Regular Audits:** Using Aircrack-ng for regular security testing can preempt potential security threats by identifying vulnerabilities early.
- **Security Training:** Training network administrators and security teams to use Aircrack-ng enhances their ability to secure networks effectively.
- **Policy Development:** Data and insights gathered from Aircrack-ng can inform the development of robust security policies and procedures.

## Exploitable Mechanisms/Weaknesses

- **Network Misconfigurations:** Exploits weak security settings and poor configurations in wireless networks.
- **Weak Encryption:** Targets weak encryption methods like WEP to crack passwords and gain unauthorized access.

## Common Tools/Software

- **[[Airodump-ng]]:** Captures raw 802.11 frames for inspection.
- **[[Aireplay-ng]]:** Used for packet injection to disrupt network operations as part of an attack.
- **[[Airdecap-ng]]:** Decrypts WEP/WPA/WPA2 capture files.
- **[[Airbase-ng]]:** A tool for attacking client stations rather than Access Points.

## Current Status

- **Widely Used:** Continues to be one of the most popular tools for wireless [[network security]] testing.
- **Ongoing Development:** Regularly updated to include new features and address emerging security vulnerabilities in wireless networks.

## Revision History

- **2024-05-10:** Entry created, detailing the role, functionalities, and implications of Aircrack-ng in network security testing.