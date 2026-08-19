up:: [[Post-Quantum Cryptography (PQC)]]
# Isogeny-Based Cryptography

Isogeny-based cryptography is a form of [[Post-Quantum Cryptography (PQC)|post-quantum cryptography]] that relies on the mathematical structure of elliptic curves and the complex relationships between them, known as isogenies. It is considered resistant to attacks from both classical and [[Quantum Computing|quantum computers]], making it a promising candidate for securing cryptographic systems against the potential future threat posed by [[quantum computing]].

## How It Works

Isogeny-based [[cryptography]] utilizes the properties of [[Elliptic Curve Cryptography|elliptic curves]] and the mappings ([[isogenies]]) between them to construct cryptographic functions. Here’s a simplified explanation:

- **[[Elliptic Curve Cryptography|Elliptic Curve Cryptography]]:** These are algebraic structures defined over finite fields with applications in various cryptographic schemes.
- **[[Isogenies]]:** These are functions that map one [[Elliptic Curve Cryptography|elliptic curve]] to another, preserving the group structure but potentially altering the curve.
- **Key Exchange:** The [[Supersingular Isogeny Diffie-Hellman|SIDH]] ([[Supersingular Isogeny Diffie-Hellman]]) protocol is an example where two parties each select a secret [[Elliptic Curve Cryptography|elliptic curve]] and exchange information about the curves via [[isogenies]]. The shared secret is then derived through computations involving these [[isogenies]].

## Advantages

- **[[Quantum-Resistant|Quantum Resistance]]:** It is currently believed to be secure against attacks from both classical and [[Quantum Computing|quantum computers]].
- **Low Bandwidth Requirements:** [[Isogenies|Isogeny]]-based systems generally require less bandwidth compared to other post-quantum cryptographic methods.
- **Power Efficiency:** Potentially more power-efficient, making it suitable for devices with limited processing capabilities.

## Major Tools

- **[[Supersingular Isogeny Diffie-Hellman|SIDH]] Library:** A C library implementation of the [[Supersingular Isogeny Diffie-Hellman]] Key Exchange protocol, providing basic functionality for isogeny-based cryptographic operations.
- **Microsoft Research SIDH Library:** An optimized version that includes implementations for key exchange protocols and is tailored for practical deployment scenarios.

## Related Cybersecurity Policies

- **[[NIST Post-Quantum Cryptography Standardization]] Process:** Isogeny-based cryptography is part of the ongoing evaluation under NIST’s initiative to standardize [[Post-Quantum Cryptography (PQC)|post-quantum cryptographic algorithms]]. This policy aims to guide the adoption and implementation of [[quantum-resistant]] cryptographic techniques.
- **[[ISO/IEC 14762]]:** Although primarily focusing on classical cryptographic techniques, the evolving standards are expected to encompass post-quantum methodologies, including isogeny-based approaches as they mature.

## Current Status

While promising, isogeny-based cryptography is still in the research and development phase, with ongoing efforts to evaluate its security and practicality. It is part of the broader shift towards adopting [[quantum-resistant]] cryptographic solutions in anticipation of [[quantum computing]] capabilities.

## Revision History

- **2024-04-19:** Entry created.