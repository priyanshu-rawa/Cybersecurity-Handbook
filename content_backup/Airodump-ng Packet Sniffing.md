up:: [[Network Hacking]]
# Airodump-ng Packet Sniffing

Airodump-ng is a packet sniffer that is part of the Aircrack-ng suite of Wi-Fi security tools. It is specifically designed to capture raw 802.11 frames (packets) circulating in the air. This tool is used for network discovery and packet analysis by monitoring Wi-Fi channels. 

## Key Features

- **Real-time capture**: Continuously captures packets to provide updated information about the wireless networks within range.
- **Network Discovery**: Efficiently discovers all wireless networks in the vicinity, displaying detailed information about each.
- **Extensive Data Display**: Provides a comprehensive table of metrics for each detected network.
- **Integration**: Part of the broader Aircrack-ng suite, which includes tools for analyzing and cracking Wi-Fi networks.

## Limitations

It only sniffs on 2.4 Ghz frequency so it will not show all the wireless networks available. You will need a WiFi adapter to view these. 

## Problem Addressed

Airodump-ng addresses the need for real-time monitoring of wireless network environments, helping in network analysis, security auditing, and forensic activities. It aids in identifying vulnerable or improperly configured networks.

## Implications

The capability of Airodump-ng to provide detailed network data enhances network security assessments and troubleshooting. However, its use also raises ethical and legal concerns, particularly regarding privacy and unauthorized network access.

## Impact

The use of Airodump-ng impacts network security practices by enabling the identification of security weaknesses such as poor encryption or hidden networks. Long-term, it influences security protocols and defense strategies in wireless networks.

## Defense Mechanisms

To protect against unauthorized packet sniffing with tools like Airodump-ng, networks should:

- Use strong encryption methods (e.g., WPA3).
- Employ network monitoring to detect anomalous activities.
- Implement access controls and secure authentication methods.

## Exploitable Mechanisms/Weaknesses

Networks using weak or outdated encryption (e.g., WEP, WPA) can be particularly vulnerable to packet sniffing, which can lead to data interception and unauthorized access.

## Common Tools/Software

Airodump-ng is part of the Aircrack-ng suite, commonly used alongside tools like Airbase-ng, Aireplay-ng, and Airdecap-ng for comprehensive Wi-Fi security testing.

## Current Status

Airodump-ng continues to be actively maintained, with updates that improve its functionality and compatibility with newer wireless technologies and operating systems.

## Reading the Chart in Terminal
![[Pasted image 20240506140738.png]]

| Term     | Description |
|----------|-------------|
| **BSSID** | Displays the MAC address of the target network. |
| **PWR** | Represents signal strength; a higher number indicates a better network connection. |
| **Beacons** | Frames sent by the network to announce its presence, useful for identifying even non-broadcasting networks. |
| **Data** | Number of useful data packets captured. |
| **#/s** | Data packets collected per 10 seconds. |
| **CH** | Channel on which the network operates. |
| **MB** | Maximum speed supported by the network. |
| **ENC** | Type of encryption used, crucial for assessing security strength. |
| **CIPHER** | Cipher algorithm used in the network's encryption. |
| **AUTH** | Authentication protocol used by the network. |
| **ESSID** | Name of the network, displayed for identifiable networks. |

## Revision History

- **2024-05-06**: Entry created and compiled current knowledge and application of Airodump-ng for packet sniffing.