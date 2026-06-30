up::[[Network Hacking]]
# Pre-Connection Network Attacks

**Pre-Connection Network Attacks** involve methods and techniques that target wireless networks before a stable connection is established between a device and a network. These attacks primarily focus on intercepting, disrupting, or manipulating the communication signals and data exchanged during the initial negotiation and connection phases.

## Key Components

### 1. **[[Packet Sniffing]] Basics**

- **Definition:** The act of capturing all data packets passing through a network without modifying or necessarily disrupting the flow of data.
- **Purpose:** Allows attackers or network administrators to intercept and analyze data being transmitted over the network, identifying sensitive information or vulnerabilities.
- **Tools:** Common tools include [[Wireshark]] and tcpdump.

### 2. **[[Wifi Bands|Wi-Fi Bands]]**

- **Definition:** Refers to the frequency range in which wireless communications operate, typically 2.4 GHz or 5 GHz.
- **Impact on Attacks:** Different bands can affect the success and detection of attacks. The 5 GHz band is less congested but has a shorter range, while the 2.4 GHz band is more susceptible to interference and more commonly used.

### 3. **[[Targeted Packet Sniffing]]**

- **Definition:** A more focused form of packet sniffing where specific devices or data flows are targeted to capture relevant data.
- **Selective Approach:** Enhances efficiency by reducing the volume of irrelevant data captured, focusing on specific targets or channels.
- **Application:** Used in scenarios where a specific device or transaction is under suspicion or monitoring.

### 4. **[[Deauthentication Attack]]**

- **Definition:** Involves forcibly disconnecting devices from a network by sending [[deauth packets]], which command the device to disconnect.
- **Purpose:** Can be used maliciously to create network disruption or to capture handshake data when the device reconnects.
- **Impact:** Causes service interruptions and can be a precursor to more severe attacks.

## Implications

- **Network Vulnerability:** Exposes potential security weaknesses, especially in networks that lack adequate [[encryption]] or [[authentication mechanisms]].
- **Privacy Risks:** Threatens the confidentiality of data transmitted over the network.
- **Operational Risks:** Can disrupt business operations by causing network instability and unauthorized data access.

## Defense Mechanisms

- **[[Encryption]]:** Using strong [[encryption]] standards like WPA3 to protect data transmissions.
- **Network Monitoring:** Employing tools to monitor network traffic and detect anomalous patterns that could indicate an attack.
- **Security Policies:** Implementing and enforcing strict security policies regarding network access and data transmission.

## Current Status

- **Ongoing Threat:** Pre-connection attacks remain a prevalent threat in cybersecurity, with continuous evolution in attack methods and defense mechanisms.
- **Technological Advancements:** Developments in network technology and security protocols continually adapt to mitigate these threats.

## Revision History

- **2024-05-10:** Initial entry created, outlining the nature and components of pre-connection network attacks.