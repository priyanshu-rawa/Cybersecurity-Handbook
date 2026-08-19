---
aliases:
  - public key encryption
  - public key cryptography
---

up:: [[Public Key Infrastructure]]
# Public Key

In the context of [[encryption]], public keys are part of an asymmetric cryptographic system that uses a pair of keys for secure communications: a public key, which can be shared with anyone, and a [[private key]], which is kept secret. The public key is used to encrypt data, which can then only be decrypted by the corresponding [[private key]].

## Key Features

- **Asymmetric Encryption:** Unlike symmetric encryption, where the same key is used for both encryption and decryption, asymmetric encryption uses a public key for encryption and a private key for decryption.
- **Digital Signatures:** Public keys are used to verify digital signatures, ensuring that a message or document was not altered and confirming the identity of the sender.
- **Key Distribution:** Public keys can be freely distributed and are often included in digital certificates, which verify the ownership of the public key.

## Problem Addressed

Public key encryption solves the key distribution problem of symmetric encryption by eliminating the need to securely transmit a secret key between parties. It facilitates secure communication over insecure channels and verifies identities in digital communications.

## Implications

The use of public keys is crucial for securing internet communications, e-commerce transactions, and the exchange of confidential information online. It underpins technologies such as SSL/TLS for secure web browsing, secure email (PGP, S/MIME), and software signing.

## Impact

Public key infrastructure (PKI) enhances the security of digital ecosystems by enabling encryption, digital signatures, and certificate services across various platforms and technologies. This infrastructure is foundational to maintaining trust and security in digital communications.

## Defense Mechanisms

- **Certificate Authorities (CAs):** Issue digital certificates that bind public keys to entities, verifying their authenticity.
- **Revocation Lists:** Provide a means to invalidate certificates and public keys that have been compromised.
- **End-to-End Encryption:** Utilizes public keys to establish secure communications channels that prevent eavesdropping and tampering.

## Exploitable Mechanisms/Weaknesses

If private keys are compromised, the security of the public key system breaks down, allowing malicious actors to decrypt sensitive information or impersonate others. Additionally, weak or improperly implemented cryptographic algorithms can undermine the security of public key systems.

## Common Tools/Software

- **OpenSSL:** Provides tools for creating and managing public and private keys, along with other cryptographic functions.
- **GnuPG (GPG):** A free implementation of the OpenPGP standard that uses public key cryptography for securing communications and data.
- **Microsoft Active Directory Certificate Services:** Supports the creation and management of digital certificates for enterprise environments.

## Related Cybersecurity Policies

- **NIST Special Publication 800-57, "Recommendations for Key Management"**: Offers guidance on managing cryptographic keys, including public keys, to maintain the confidentiality, integrity, availability, and accountability of information systems.
- **ETSI TS 119 403-2,** "Electronic Signatures and Infrastructures (ESI); Trust Service Provider Conformity Assessment": Specifies requirements for conformity assessment bodies assessing the trustworthiness of public key infrastructures.

## Best Practices

- Regularly update and patch software that generates and manages public keys to protect against vulnerabilities.
- Use strong, well-studied cryptographic algorithms and large key sizes to resist cryptographic attacks.
- Ensure the safe storage and handling of private keys, including the use of hardware security modules (HSMs) where appropriate.

## Current Status

As cyber threats evolve, the role of public keys in network security continues to expand, with ongoing research into post-quantum cryptography aiming to develop new public key systems that are secure against quantum computing threats.

## Revision History

- **2024-04-14:** Entry created.