up:: [[Network Hacking]]
# WPA and WPA2 Cracking

**[[Wi-Fi Protected Access (WPA)|WPA]] and [[Wi-Fi Protected Access II (WPA2)|WPA2]] Cracking** refers to the techniques used to breach the security of networks protected by [[Wi-Fi Protected Access (WPA)]] and [[Wi-Fi Protected Access II (WPA2)]]. These security protocols were designed to provide stronger protection than [[Wired Equivalent Privacy (WEP)|WEP]], incorporating elements such as the [[Temporal Key Integrity Protocol (TKIP)]] for [[Wi-Fi Protected Access (WPA)|WPA]] and the [[Advanced Encryption Standard (AES)]] for [[Wi-Fi Protected Access II (WPA2)|WPA2]]. Cracking these networks involves exploiting vulnerabilities in the way these security protocols implement authentication and [[encryption]].

## Key Features

- **Enhanced [[Encryption]]:** [[Wi-Fi Protected Access (WPA)|WPA]] uses [[Temporal Key Integrity Protocol (TKIP)]], and [[Wi-Fi Protected Access II (WPA2)|WPA2]] uses [[Advanced Encryption Standard (AES)|AES]], both of which are significant improvements over [[Wired Equivalent Privacy (WEP)|WEP]]'s [[encryption]] methods.
- **Robust Authentication:** Both protocols use a four-way [[WPA handshake|handshake]] to confirm that both the client and access point possess the correct credentials (pre-shared key).
- **Vulnerability to Attacks:** Despite their robustness, these protocols can still be vulnerable to brute force attacks if weak passwords are used.

## Problem Addressed

[[Wi-Fi Protected Access (WPA)|WPA]] and [[Wi-Fi Protected Access II (WPA2)|WPA2]] cracking techniques address:

- **[[Network Security]] Assessment:** Testing the strength and resilience of [[network security]] to prevent unauthorized access.
- **[[Encryption]] Weaknesses:** Identifying weaknesses in [[encryption]] methods and password strength.

## Implications

- **Privacy and Security Risks:** Unauthorized access to a network can lead to data theft, eavesdropping, and other security breaches.
- **Credential Compromise:** Once an attacker cracks a network's password, they can gain extensive access to network resources and traffic.
- **Regulatory and Compliance Issues:** Security breaches may lead to non-compliance with data protection regulations, resulting in penalties and damage to reputation.

## Impact

- **Increased Security Measures:** Awareness of the potential for cracking encourages stronger security practices, including the use of complex passwords and advanced [[encryption]] settings.
- **Enhanced Security Protocols:** Drives the development and implementation of more secure wireless protection protocols like WPA3.
- **Security Audits and Improvements:** Prompts organizations to conduct regular security audits and update their security infrastructure.

## Defense Mechanisms

- **Use of Strong Passwords:** Implementing strong, complex passwords that are resistant to brute force attacks.
- **Regular Updates:** Keeping firmware and devices updated to protect against known vulnerabilities.
- **Network Monitoring:** Actively monitoring network traffic for signs of unauthorized access or unusual activities.

## Exploitable Mechanisms/Weaknesses

- **Password Strength:** The strength of the network password greatly influences the susceptibility to cracking. Weak passwords can be cracked using brute force or dictionary attacks.
- **Protocol Flaws:** Certain implementations of [[Wi-Fi Protected Access (WPA)|WPA]] and [[Wi-Fi Protected Access II (WPA2)|WPA2]] have been found vulnerable to specific attack vectors, such as the KRACK (Key Reinstallation Attack) in [[Wi-Fi Protected Access II (WPA2)|WPA2]].

## Common Tools/Software

- **[[Aircrack-ng]]:** A suite of tools for assessing Wi-Fi [[network security]], including capabilities for cracking [[Wi-Fi Protected Access (WPA)|WPA]] and [[Wi-Fi Protected Access II (WPA2)|WPA2]].
- **Hashcat:** Advanced password recovery tool capable of executing brute force and dictionary attacks on captured network hashes.
- **[[Wireshark]]:** To analyze network traffic and capture the data necessary for initiating a crack.
- [[Wifite]]: a versatile, automated tool designed to attack multiple WEP and WPA encrypted networks simultaneously

## Current Status

- **Continued Relevance:** [[Wi-Fi Protected Access (WPA)|WPA]] and [[Wi-Fi Protected Access II (WPA2)|WPA2]] remain widely used, though with recommendations for strong security practices to mitigate vulnerabilities.
- **Adoption of WPA3:** Introduction of WPA3 aims to address the vulnerabilities inherent in [[Wi-Fi Protected Access (WPA)|WPA]] and [[Wi-Fi Protected Access II (WPA2)|WPA2]], offering enhanced security features.

## Revision History

- **2024-05-10:** Initial entry created to explain the principles, implications, and methods of cracking WPA and WPA2.

# [[Hacking WPA & WPA2]] 
Try this first! It's the easiest way in, and you might luck out an d someone has misconfigured their router with this setting. It's unlikely but encouraged to try this first.
![[Hacking WPA & WPA2#Hacking WPA & WPA2]]

# [[Capturing the Handshake]]
![[Capturing the Handshake#Steps to Capture the Handshake]]

I will create a future lesson about cracking this
# [[Generating a Wordlist & Cracking the Password]]

![[Generating a Wordlist & Cracking the Password#Generating a Wordlist & Cracking the Password]]