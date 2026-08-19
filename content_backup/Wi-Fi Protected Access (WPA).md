---
aliases:
  - Wi-Fi Protected Access
  - WPA
---
up:: [[WPA and WPA2 Cracking]]
# WPA (Wi-Fi Protected Access)

**Wi-Fi Protected Access (WPA)** is a security protocol and security certification program developed by the Wi-Fi Alliance to secure wireless computer networks. Introduced in 2003, WPA was designed to overcome the numerous vulnerabilities found in the earlier [[Wired Equivalent Privacy (WEP)]] system.

## Key Features

- **Temporal Key Integrity Protocol (TKIP):** WPA improves security over [[Wired Equivalent Privacy (WEP)|WEP]] through the use of TKIP, which dynamically changes keys as it is used.
- **Pre-shared Key (PSK) Mode:** Often referred to as WPA-Personal, which uses a pre-shared key (typically a passphrase) for authentication.
- **Enterprise Mode:** Known as WPA-Enterprise, which uses a RADIUS server for authentication, offering greater security for corporate environments.
- **Encryption:** Provides stronger data protection than [[Wired Equivalent Privacy (WEP)|WEP]] by using key mixing functions along with integrity checking to counteract common attacks.

## Problem Addressed

WPA addresses several critical security issues found in [[Wired Equivalent Privacy (WEP)|WEP]], including:

- **Static Key Cryptography:** Unlike [[Wired Equivalent Privacy (WEP)|WEP]], which uses static keys, WPA introduces a method to periodically change [[encryption]] keys.
- **Improved Data [[Encryption]]:** Incorporates a sequence number for integrity checks to prevent packet replay attacks.

## Implications

- **Enhanced Security:** Significantly improves wireless [[network security]] and has been a stepping stone towards even more secure [[encryption]] protocols like WPA2.
- **User Authentication:** Through its Enterprise mode, it enhances user authentication using a centralized authentication server.
- **Backward Compatibility:** Designed to work with existing hardware originally meant for [[Wired Equivalent Privacy (WEP)|WEP]], with a simple firmware update.

## Impact

- **Network Protection:** Provides better protection against potential attackers by making it difficult to decrypt key communications.
- **Increased Confidence:** Boosts confidence in [[wireless security]], encouraging the adoption of wireless technology in sensitive environments.
- **Foundation for Future Advances:** Set the stage for the development of WPA2, which provides even stronger security with the introduction of [[Advanced Encryption Standard (AES)|AES]].

## Defense Mechanisms

- **Regular Key Renewal:** TKIP includes mechanisms for key generation and renewal, enhancing security over static key systems like [[Wired Equivalent Privacy (WEP)|WEP]].
- **[[Authentication Protocols]]:** In WPA-Enterprise, the use of 802.1X provides robust authentication, significantly reducing the risk of unauthorized access.

## Exploitable Mechanisms/Weaknesses

- **TKIP Vulnerabilities:** While more secure than [[Wired Equivalent Privacy (WEP)|WEP]], TKIP is still susceptible to certain forms of attack, including key recovery attacks, which have been mitigated in WPA2 with [[Advanced Encryption Standard (AES)|AES]].
- **Deprecation:** Due to its vulnerabilities, WPA (with TKIP) is considered deprecated and is recommended to be replaced by WPA2 or WPA3 where possible.

## Common Tools/Software

- **[[Wireshark]]:** Can analyze WPA-encrypted traffic when the [[encryption]] key is known to the analyst.
- **[[Aircrack-ng]]:** Used for [[network security]] testing, including cracking WPA [[encryption]] under certain conditions.

## Current Status

- **Legacy Protocol:** WPA has largely been superseded by WPA2 and WPA3, but it still exists in some older or lower-cost devices.
- **Recommendation:** Users and administrators are advised to upgrade to WPA2 or WPA3 for enhanced security.

## Revision History

- **2024-05-10:** Initial entry created, detailing the functionality and importance of WPA in the evolution of wireless network security.