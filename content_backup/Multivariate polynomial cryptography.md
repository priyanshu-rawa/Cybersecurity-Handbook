---
aliases:
  - MPC
---
up:: [[Post-Quantum Cryptography (PQC)]]
# Multivariate Polynomial Cryptography

Multivariate Polynomial Cryptography is a form of [[Asymmetric Encryption|public-key cryptography]] that relies on the hardness of solving systems of multivariate quadratic equations over finite fields, a problem known to be [[Non-deterministic Polynomial-time hard (NP-Hard)|NP-hard]]. It is one of the main approaches under consideration for [[Post-Quantum Cryptography (PQC)|post-quantum cryptography]], which aims to develop cryptographic systems secure against the potential future threats posed by [[Quantum Computing|quantum computers]].

## How It Works

- **Key Generation:** Involves generating a public and a [[private key]] using polynomials. The [[private key]] is typically a set of easy-to-solve equations or a hidden structured system, while the [[public key]] is a set of complex multivariate quadratic equations derived from the [[private key]] equations through a series of transformations that obscure the simple structure.
- **[[Encryption]]:** The sender uses the [[public key]] to encrypt a message by substituting the message into the multivariate equations and solving them.
- **Decryption:** The receiver uses the [[private key]] to apply the inverse transformations and solve the equations easily due to the hidden structure, revealing the original message.

## Advantages

- **Resistance to Quantum Attacks:** Believed to be resistant to attacks using both classical and [[Quantum Computing|quantum computers]].
- **Efficiency:** Potentially offers efficient key generation, encryption, and decryption processes.
- **Flexibility:** Capable of supporting various cryptographic tasks such as [[encryption]], [[Digital Signature|digital signatures]], and hashing.

## Related Cybersecurity Policies

- **[[NIST Post-Quantum Cryptography Standardization]] Process:** A project to standardize post-quantum cryptographic algorithms, including multivariate polynomial schemes, which will eventually influence policies and regulations worldwide.
- **ISO/IEC JTC 1/SC 27:** Working on international standards for information security, including the development of standards for [[Post-Quantum Cryptography (PQC)]].

## Major Tools Used

- **Open Quantum Safe (OQS):** Provides open-source libraries integrating post-quantum cryptographic algorithms, including implementations of multivariate polynomial schemes for testing and experimentation.
- **PQCrypto:** A library of [[quantum-resistant]] [[cryptographic algorithms]], including those based on multivariate polynomials, designed for integration into various applications.

## Exploitable Mechanisms/Weaknesses

While multivariate polynomial cryptography is promising, its main challenge lies in the potential for structural weaknesses in the polynomial systems, which could be exploited if not properly obscured or if weaknesses in the underlying mathematics are discovered.

## Best Practices

- **Ongoing Evaluation:** Continuously monitor the developments in [[quantum computing]] and cryptographic research to assess the security of multivariate polynomial systems.
- **Robust Implementation:** Ensure that implementations do not expose side-channel vulnerabilities and are resistant to common [[cryptographic attacks]].
- **Regular Updates:** Stay updated with the latest standards and recommendations from bodies like NIST and ISO to ensure compliance and security.

## Current Status

Multivariate polynomial cryptography is currently under active research and development, particularly as part of the [[NIST Post-Quantum Cryptography Standardization|NIST PQC project]], which is evaluating various cryptographic proposals for their security and practicality in a post-quantum world.

## Revision History

- **2024-04-19:** Entry created.