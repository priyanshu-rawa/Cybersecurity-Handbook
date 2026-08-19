---
aliases:
  - handshake
---
up:: [[Capturing the Handshake]]
# WPA Handshake

The [[Wi-Fi Protected Access (WPA)|WPA]] Handshake is a protocol interaction between a wireless device and a network access point that confirms both parties have the correct credentials (such as a pre-shared key) for establishing a wireless communication channel. This four-way handshake is crucial for [[network security]] in [[Wi-Fi Protected Access (WPA)]] and [[Wi-Fi Protected Access II (WPA2)]] protocols.

## Key Features

- **Four-Step Process**: Involves four packets sent between the client and the access point to confirm the possession of the correct credentials without exposing the actual key.
- **Nonce Values**: Each party generates a random number called a nonce during the handshake that ensures the freshness of the session and prevents replay attacks.
- **Encryption Key Derivation**: Derives a fresh Pairwise Transient Key (PTK) from pre-shared keys and nonces, which is used to encrypt data during the session.
- **Authentication and Integrity**: Ensures the integrity of the messages and authenticates network users.

## Problem Addressed

The [[Wi-Fi Protected Access (WPA)|WPA]] handshake addresses the issue of securely transmitting the [[encryption]] keys over the air and verifying that both the client and the access point possess the correct credentials to establish a network connection without actual key disclosure.

## Implications

- **Enhanced Security**: Provides a robust method to secure wireless networks by preventing unauthorized access and ensuring data transmitted between devices is encrypted.
- **Compatibility**: Supports a wide range of wireless devices and is backward compatible with older hardware, albeit with potential security compromises in the case of [[Wi-Fi Protected Access (WPA)|WPA]] over [[Wi-Fi Protected Access II (WPA2)|WPA2]].

## Impact

- **Privacy and Data Protection**: Ensures that sensitive information transmitted over wireless networks is protected from eavesdroppers and malicious actors.
- **Network Integrity**: Maintains the integrity and trustworthiness of wireless networks by facilitating secure connections.

## Defense Mechanisms

- **Strong [[Encryption]]**: Uses [[Advanced Encryption Standard (AES)]] in [[Wi-Fi Protected Access II (WPA2)|WPA2]] for a more secure [[encryption]] method compared to Temporal Key Integrity Protocol (TKIP) used in [[Wi-Fi Protected Access (WPA)|WPA]].
- **Regular Key Refreshment**: The handshake process allows for the keys to be refreshed periodically, minimizing the risk of key compromise over long periods.

## Exploitable Mechanisms/Weaknesses

- **Weak Passwords**: The security of the handshake can be compromised by weak passwords that are susceptible to brute force or dictionary attacks.
- **Vulnerabilities in [[Wi-Fi Protected Access (WPA)|WPA]]/[[Wi-Fi Protected Access II (WPA2)|WPA2]]**: Security flaws like the KRACK (Key Reinstallation Attack) exploit weaknesses in the handshake process to allow attackers to intercept and manipulate traffic.

## Common Tools/Software

- **[[Wireshark]]**: Network protocol analyzer that can capture and analyze the [[Wi-Fi Protected Access (WPA)|WPA]] handshake.
- **[[Aircrack-ng]]**: A suite of tools for Wi-Fi [[network security]] that includes functionalities for [[capturing the handshake]] and performing cracking processes.

## Current Status

- **WPA3 Introduction**: The introduction of WPA3 promises enhancements in security, particularly through the implementation of Simultaneous Authentication of Equals (SAE), which replaces the [[Wi-Fi Protected Access II (WPA2)|WPA2]] handshake mechanism to provide better protection against offline dictionary attacks.

## Revision History

- **2021**: Research highlighted vulnerabilities in WPA3's handshake, leading to increased efforts to fortify this newer standard against exploitation.
- **2023**: Further enhancements in protocols and the widespread adoption of WPA3 among new devices, with ongoing support and patches for [[Wi-Fi Protected Access II (WPA2)|WPA2]] vulnerabilities.