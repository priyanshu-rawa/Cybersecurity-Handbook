---
aliases:
  - Isogeny
---
up:: [[Isogeny-based cryptography]]
# Isogeny

Isogeny refers to a mathematical concept used in elliptic curve cryptography, involving a morphism (a structure-preserving map) between two elliptic curves. It is a promising area of research in post-quantum cryptography, aiming to develop cryptographic systems that are secure against quantum computer attacks.

## How It Works

Isogeny-based cryptography typically involves the computation of a path of isogenies between two elliptic curves. The public key in such a scheme might include descriptions of two elliptic curves along with an isogeny between them. The private key would be the specific isogeny path or series of steps used to compute the public isogeny, known only to the key holder. Secure communication can then occur by calculating shared secrets through composed isogenies, leveraging their properties to encode and decode messages.

## Key Features

- **Resistance to Quantum Attacks:** Isogeny-based cryptography is designed to be resistant to attacks from quantum computers, which can quickly solve problems that traditional cryptography relies on, such as factoring large numbers or computing discrete logarithms.
- **Small Key Sizes:** Typically has smaller key sizes compared to other post-quantum cryptographic methods, which can lead to efficiency in bandwidth and storage.

## Advantages

- **Quantum Resistance:** Offers a level of security that is believed to be secure against both classical and quantum computing attacks.
- **Efficiency:** Provides relatively small key sizes, which is beneficial for systems where bandwidth or storage space is limited.
- **Forward Secrecy:** Capable of ensuring that session keys will not be compromised even if the private keys are compromised in the future.

## Exploitable Mechanisms/Weaknesses

While isogeny-based cryptography is promising, it is still in the experimental stages. Its actual security and practicality are subjects of ongoing research, and it may be vulnerable to unforeseen mathematical or algorithmic breakthroughs.

## Common Tools/Software

- **SIKE (Supersingular Isogeny Key Encapsulation):** A leading proposal for post-quantum cryptography based on isogenies. It is one of the candidates in the NIST Post-Quantum Cryptography standardization process.
- **Microsoft Research's SIDH Library:** A software library that implements the Supersingular Isogeny Diffie-Hellman (SIDH) key exchange, a precursor to SIKE.

## Related Cybersecurity Policies

- **NIST Post-Quantum Cryptography Standardization:** Isogeny-based systems like SIKE are part of the ongoing efforts by NIST to standardize post-quantum cryptographic algorithms. These efforts aim to develop cryptographic standards that can resist potential quantum computing threats.
- **ISO/IEC JTC 1/SC 27:** International standards in the field of information security include work on cryptographic techniques that cover new methods like isogeny-based cryptography as part of broader efforts to secure IT systems against advanced threats.

## Best Practices

- **Stay Updated:** As isogeny-based cryptography is still under development, staying updated with the latest research and standardization efforts is crucial.
- **Experimental Deployment:** Begin testing and experimenting with isogeny-based systems within controlled environments to understand their behavior and performance in practical scenarios.
- **Collaboration and Research:** Engage in collaborative research efforts to explore and address potential vulnerabilities in isogeny-based cryptographic systems.

## Current Status

Isogeny-based cryptography is still largely theoretical and experimental, with active research focused on validating its security assumptions and developing practical implementations. As the threat of quantum computing grows, the importance of advancements in this area continues to rise.

## Revision History

- **2024-04-14:** Entry created.