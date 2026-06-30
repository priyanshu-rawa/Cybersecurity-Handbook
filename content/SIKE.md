---
aliases:
  - Supersingular Isogeny Key Encapsulation
  - Supersingular Isogeny Key Encapsulation (SIKE)
---
up:: [[Post-Quantum Cryptography (PQC)]] [[Isogeny-based cryptography]]
# SIKE (Supersingular Isogeny Key Encapsulation)

SIKE (Supersingular Isogeny Key Encapsulation) is a [[Post-Quantum Cryptography (PQC)|post-quantum cryptographic algorithm]] designed to be secure against attacks from both classical and [[Quantum Computing|quantum computers]]. It is based on the mathematical structure of [[Elliptic Curve Cryptography|elliptic curves]] and the complexity of computing [[isogenies]] between [[supersingular elliptic curves]].

## How It Works

SIKE operates by establishing a shared secret between two parties using the properties of [[elliptic curve isogenies]]. The process involves:

1. **Key Generation:** Each party generates a public-private key pair based on supersingular elliptic curves and their [[isogenies]].
2. **Key Exchange:** The parties exchange public keys.
3. **Shared Secret Derivation:** Both parties use their [[private key]] and the other's [[public key]] to compute the same shared secret, which is derived from the [[isogenies]] between their respective [[Elliptic Curve Cryptography|elliptic curves]].

This method avoids the use of traditional discrete logarithm or factoring problems targeted by [[Quantum Algorithm|quantum algorithms]] such as [[Shor's algorithm]].

## Advantages

- **[[Quantum-Resistant|Quantum Resistance]]:** Designed to be secure against both current [[cryptographic attacks]] and future [[Quantum Computing|quantum computer]] attacks.
- **Small Key Sizes:** Compared to other [[Post-Quantum Cryptography (PQC)|post-quantum cryptography]] methods, SIKE tends to have smaller key sizes, making it more efficient for certain applications.
- **Compatibility:** Can be integrated into existing security protocols without significant changes, such as the Transport Layer Security (TLS) protocol.

## Major Tools

- **SIKE Reference Implementation:** Provides a standard reference for implementing SIKE, available on platforms like GitHub.
- **Open Quantum Safe (OQS):** An open-source project that integrates [[Post-Quantum Cryptography (PQC)|post-quantum cryptographic algorithms]], including SIKE, into network protocols and security applications.
- **Microsoft PQCrypto-VPN:** A version of a [[Virtual Private Networks|virtual private network]] ([[Virtual Private Networks|VPN]]) software that incorporates [[Post-Quantum Cryptography (PQC)|post-quantum cryptography]] algorithms including SIKE for testing and evaluation.

## Related Cybersecurity Policies

- **[[NIST Post-Quantum Cryptography Standardization]] Process:** SIKE is one of the candidates in the ongoing NIST process to standardize [[Post-Quantum Cryptography (PQC)|post-quantum cryptographic algorithms]]. This process aims to identify [[Algorithm|algorithms]] that can replace existing public-key cryptosystems.
- **Quantum Cryptographic Algorithms:** Regulatory bodies like the European Union Agency for Cybersecurity (ENISA) are assessing [[quantum-resistant]] algorithms to guide future policy developments in cybersecurity.

## Current Status

SIKE is currently under consideration in the third round of the [[NIST Post-Quantum Cryptography Standardization]] Process. Its performance and security are being evaluated extensively to determine its suitability as a standard for protecting sensitive information in the post-quantum era.

## Revision History

- **2024-04-14:** Entry created.