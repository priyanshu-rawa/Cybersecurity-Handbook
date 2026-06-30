---
aliases:
  - The Amnesic Incognito Live System
---
up:: [[Dark Web]]
# The Amnesic Incognito Live System (Tails)

Tails, which stands for The Amnesic Incognito Live System, is a live operating system that can be booted from a USB stick or a DVD. It is designed to preserve privacy and anonymity by routing internet connections through the [[Tor network]] and leaving no trace on the computer unless explicitly asked by the user.

## How It Works

- **Live Operating System:** Tails is run from a removable medium like a USB stick or DVD, which means it does not need to be installed on the computer’s hard drive. When the system is shut down, no data is stored locally unless specifically saved by the user to another external device.
- **Use of [[Tor Network|Tor]]:** All outgoing connections to the internet are automatically routed through the [[Tor Network|Tor]] network, which anonymizes the user’s internet activity by bouncing communications around a distributed network of relays run by volunteers all around the world.
- **Statelessness:** Tails is designed to be amnesic, meaning it forgets all user data upon shutdown, unless the user has configured persistent storage on the USB stick.

## Advantages

- **Privacy and Anonymity:** Ensures that users can browse the internet without leaving traces and protects against common tools and techniques used to track user activities.
- **Security:** As a live system that resets itself after each session, Tails mitigates the risk of [[malware]] persisting on the system.
- **Portability:** Can be used on almost any computer anywhere, without the need for installation.
- **Censorship Circumvention:** The use of [[Tor Network|Tor]] allows users to bypass censorship in regions where access to information is restricted.

## Major Tools Used

- **[[Tor Network|Tor]] Browser:** The default web browser configured to use the [[Tor Network|Tor]] network for anonymous browsing.
- **Thunderbird:** For secure and private email communications.
- **KeePassXC:** For password management to securely store and manage passwords.
- **LibreOffice:** A full-featured office suite for document processing and data management.
- **GPG:** Integrated support for email and file [[encryption]].
- **OnionShare:** For anonymous file sharing.
- **Tails Greeter:** A configuration screen that allows users to set up essential settings each time Tails starts.

## Related Cybersecurity Policies

- **[[General Data Protection Regulation (GDPR)|GDPR]] ([[General Data Protection Regulation (GDPR)]]):** Tails helps users comply with [[General Data Protection Regulation (GDPR)|GDPR]] by enhancing data privacy and security through its strong privacy features.
- **[[ISOIEC 27001|ISO/IEC 27001]]:** Supports the information security management elements of [[ISOIEC 27001|ISO/IEC 27001]] by providing tools and configurations that help protect the confidentiality, integrity, and availability of information.
- **NIST Privacy Framework:** Aligns with the practices recommended for data privacy as Tails provides a means to proactively manage privacy risks at a system level.

## Best Practices

- **Regularly Update Tails:** To ensure all applications and [[Tor Network|Tor]] features are up-to-date with the latest security patches.
- **Use Encrypted Persistent Storage:** If needed, configure encrypted persistent storage on the USB stick to securely save files.
- **Verify the Integrity of the Download:** Always verify the Tails image after downloading and before installation to ensure it has not been tampered with.

## Current Status

Tails continues to evolve, with regular updates that improve security, introduce new features, and maintain compatibility with the latest hardware. It remains a crucial tool for journalists, activists, and any users who are concerned with privacy and security online.

## Revision History

- **2024-04-14:** Entry created.