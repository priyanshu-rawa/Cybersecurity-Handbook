---
aliases:
  - firewall
---

up:: [[Firewalls and VPNs]]
# Firewalls

A firewall is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between a trusted internal network and untrusted external networks, such as the internet.

## Key Features

- **Packet Filtering:** Analyzes packets for their source and destination addresses, protocols, and ports.
- **Stateful Inspection:** Tracks active connections to determine if a packet is part of an existing connection.
- **Proxy Services:** Intercepts all messages entering and leaving the network and effectively hides the true network addresses.
- **Deep Packet Inspection (DPI):** Goes beyond basic header information in packets and examines the data within those packets.

## Problem Addressed

Firewalls are designed to prevent unauthorized access to or from private networks and are essential for securing network boundaries. They help protect networks from malicious attacks, such as malware, viruses, and worms.

## Implications

Firewalls are fundamental to network security architecture in both personal computing and corporate environments. They play a crucial role in enforcing network policies and providing a basic level of security.

## Impact

Firewalls are the first line of defense in network security. They effectively block unauthorized access while permitting outward communication, which is essential for protecting sensitive data within a network.

## Defense Mechanisms

- **Unified Threat Management (UTM):** Integrates multiple security features, including antivirus, spam filtering, deep packet inspection, and intrusion prevention.
- **Next-Generation Firewalls (NGFWs):** Blend the features of traditional firewalls with advanced functionalities to identify and block sophisticated attacks.

## Exploitable Mechanisms/Weaknesses

Improper configuration or outdated firewall rules can lead to vulnerabilities, allowing attackers to bypass firewalls. Firewalls are also less effective against threats from within the network or those carried via encrypted traffic that the firewall cannot inspect.

## Common Tools/Software

- **Hardware-based Firewalls:** Cisco ASA, Juniper Networks, SonicWall.
- **Software-based Firewalls:** pfSense, Windows Defender Firewall, iptables.

## Best Practices

- Maintain a default deny rule that blocks all traffic except what is explicitly allowed.
- Regularly update and review firewall rules to minimize vulnerabilities and ensure they reflect current network requirements.
- Implement zone-based segmentation to control traffic flow within the network and limit potential damage from network intrusions.

## Current Status

The development of firewalls continues to adapt to new network technologies and threats. Modern firewalls are becoming more intelligent with capabilities to integrate with other security systems and to utilize cloud-based analytics for better threat detection.

## Revision History

- **2024-04-14:** Entry created.