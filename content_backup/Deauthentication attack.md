---
aliases:
  - Deauthentication attacks
---
up:: [[Network Hacking]]
# Deauthentication Attack

A **deauthentication attack** is a type of denial-of-service (DoS) attack in wireless networks, specifically targeting Wi-Fi connections. This attack disrupts the normal communication between a device and the network by repeatedly sending [[deauth packets]] from an attacker to one or more clients connected to the network. These frames mimic the packets sent during a normal user-initiated disconnection process.

## Key Features

- **Disruptive:** Intentionally disconnects devices from a Wi-Fi network.
- **Wireless Specific:** Targets IEEE 802.11 protocols used in Wi-Fi networking.
- **No Authentication Required:** The attacker does not need to be authenticated with the network to perform this attack.
- **Ease of Execution:** Can be executed using simple tools and minimal technical knowledge.
- **Packet Injection:** Involves injecting spoofed packets that appear as legitimate deauthentication commands from the router to the client.

## Problem Addressed

Deauthentication attacks exploit the open nature of the Wi-Fi protocol, which does not require verification of deauthentication requests. This vulnerability is particularly problematic in:

- **Public Wi-Fi Networks:** Where multiple users are frequently connecting and disconnecting.
- **Corporate Environments:** Where connectivity is crucial for operational efficiency.
- **Personal Networks:** Impacting users' personal internet access and smart home devices.

## Implications

- **Network Disruption:** Immediate loss of network connectivity for affected devices.
- **Security Breach:** Potentially used as a precursor to more serious attacks like session hijacking or network intrusion.
- **Service Deterioration:** Impacts the quality of service, causing frustration and disruption in environments relying on continuous connectivity.

## Impact

- **Operational Delays:** In corporate settings, frequent disconnections can lead to significant disruptions in workflow and productivity.
- **Loss of Trust:** Users may perceive the network as unreliable, leading to dissatisfaction and potential loss of business.
- **Increased Security Costs:** Organizations may need to invest more in advanced security measures to protect against such attacks.

## Defense Mechanisms

- **MAC Address Filtering:** Restrict network access to known devices, though not foolproof.
- **Use of WPA3:** The latest Wi-Fi Protected Access version improves security, including measures against deauthentication attacks.
- **Continuous Monitoring:** Use of network monitoring tools to detect unusual patterns of deauthentication.
- **Physical Security Measures:** Limit physical access to network infrastructure to prevent unauthorized device setup.

## Exploitable Mechanisms/Weaknesses

- [[Exploiting Deauthentication Attacks]]
- **Lack of Packet Authentication:** Wi-Fi protocol does not verify whether a deauthentication packet came from a legitimate source.
- **Broadcast Nature of Wi-Fi:** Deauthentication packets can be sent to any device within the Wi-Fi signal range without needing direct connection.

## Common Tools/Software

- **[[Aircrack-ng]]:** Popular suite of tools for Wi-Fi [[network security]] testing, including deauthentication attack capabilities.
- **[[Wireshark]]:** Network protocol analyzer that can capture and analyze packets, including those used in deauthentication attacks.
- **Kismet:** Wireless network detector, sniffer, and [[Intrusion Detection Systems|intrusion detection system]] that can be used to monitor network traffic for suspicious activities.

## Current Status

- **Prevalence:** Still a common attack on Wi-Fi networks despite newer security protocols.
- **Research:** Ongoing in developing more robust security protocols that can mitigate such vulnerabilities.

## Resources

- [[Exploiting Deauthentication Attacks]]

## Revision History

- **2024-05-10:** Initial entry created, discussing the nature, impact, and defenses against deauthentication attacks.
