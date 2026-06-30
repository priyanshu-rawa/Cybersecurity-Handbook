---
aliases:
  - PQC
  - post quantum cryptography
  - post-quantum cryptography
  - post-quantum cryptographic algorithms
  - post-quantum cryptographic algorithm
  - post quantum cryptographic algorithm
  - post quantum cryptographic algorithms
---
up:: [[Quantum Cryptography]]
# Post-Quantum Cryptography (PQC)

Post-Quantum Cryptography (PQC) refers to [[cryptographic algorithms]] specifically designed to be secure against potential threats posed by [[Quantum Computing|quantum computers]]. While traditional cryptographic systems, like [[RSA]] and [[Elliptic Curve Cryptography|ECC]], rely on the difficulty of problems such as integer factorization or [[Elliptic Curve Cryptography|elliptic curve]] logarithms, PQC aims to base security on mathematical problems believed to be resistant to quantum attack.

## Key Features

- **[[Quantum-Resistant]]**: Unlike some classical [[cryptographic algorithms]], the security of PQC methods isn't compromised by the capabilities of [[Quantum Computing|quantum computers]].
- **Variety of Approaches**: PQC encompasses various cryptographic systems including:
    - [[Lattice-based cryptography]]
    - [[Code-based cryptography]]
    - [[Multivariate polynomial cryptography]]
    - [[Hash-based cryptography]]
    - [[Isogeny-based cryptography]]
    - [[Zero Knowledge Proof-based cryptography]]
- **NIST Standardization**: The National Institute of Standards and Technology (NIST) has been working on standardizing post-quantum [[cryptographic algorithms]] to establish secure replacements for current public-key [[Algorithm|algorithms]].

## Leading Algorithms

| Algorithm                  | Type                       | Primary Use       | Key Size (approx.) | Signature Size (approx.) | Performance | Known Vulnerabilities              | Security Level | Pros                                       | Cons                                          |
| -------------------------- | -------------------------- | ----------------- | ------------------ | ------------------------ | ----------- | ---------------------------------- | -------------- | ------------------------------------------ | --------------------------------------------- |
| **[[CRYSTALS-KYBER]]**     | Lattice-based              | Key Encapsulation | 800-1632 bytes     | N/A                      | Fast        | Resistant to known attacks         | High           | Efficient, compact keys                    | Lattice-based attacks are an evolving area    |
| **[[CRYSTALS-Dilithium]]** | Lattice-based              | Digital Signature | 1312-2592 bytes    | 2420-4595 bytes          | Moderate    | Resistant to known attacks         | High           | High security, non-interactive             | Larger key sizes compared to some others      |
| **[[FALCON]]**             | Lattice-based (NTRU)       | Digital Signature | 1280-2304 bytes    | 690-1280 bytes           | Fast        | Side-channel vulnerabilities       | High           | Very efficient, small signatures           | Complex implementation                        |
| **[[NTRU]]**               | Lattice-based (NTRU)       | Key Encapsulation | 699-1230 bytes     | N/A                      | Fast        | Resistant to known attacks         | High           | Fast key generation, small ciphertexts     | Requires careful parameter selection          |
| **[[SIKE]]**               | Isogeny-based              | Key Encapsulation | 564-610 bytes      | N/A                      | Slow        | Vulnerable to side-channel attacks | High           | Quantum secure                             | Slow, especially in key generation            |
| **[[SPHINCS+]]**           | Hash-based                 | Digital Signature | 32-64 bytes        | 8-30 KB                  | Slow        | Resistant to known attacks         | High           | Stateless, high security level             | Very large signatures                         |
| **[[Picnic]]**             | Zero-knowledge proof-based | Digital Signature | 33 bytes           | 17-209 KB                | Very slow   | Resistant to known attacks         | High           | Very high security against quantum attacks | Extremely large signatures                    |
| **[[BIKE]]**               | Code-based                 | Key Encapsulation | 2 KB               | N/A                      | Moderate    | Vulnerable to decryption failures  | Medium         | Strong classical security                  | No longer a NIST finalist, code-based attacks |

## Advantages

- **Future-Proof Security:** Ensures long-term security of data against emerging quantum threats.
- **Variety of Choices:** Offers multiple cryptographic solutions, allowing selection based on performance, security level, and operational needs.
- **Adaptability:** Can coexist with existing cryptographic systems to provide layered security.

## Exploitable Mechanisms/Weaknesses

The main challenge for PQC is ensuring that these new cryptographic systems are as reliable and well-tested as classical systems. As these [[Algorithm|algorithms]] are relatively new, their resistance to all forms of [[cryptanalysis]] (both classical and quantum) is not yet fully understood.

## Common Tools/Software

- **Open Quantum Safe (libOQS):** An open-source project aimed at supporting the development and prototyping of [[quantum-resistant]] cryptography.
- **Microsoft's Quantum Development Kit:** Includes tools for experimenting with [[quantum-resistant]] [[cryptographic algorithms]].
- **Google's Cirq:** An open-source framework for Noisy Intermediate Scale Quantum (NISQ) computers, including tools for [[quantum cryptography]] research.

## Related Cybersecurity Policies

- **[[NIST Post-Quantum Cryptography Standardization]]:** A project initiated by NIST to identify and standardize one or more [[quantum-resistant]] public-key [[cryptographic algorithms]].
- **European Union's Quantum Technologies Flagship:** Supports research and development in quantum technologies, including [[cryptography]], to enhance long-term security measures.
- **ETSI (European Telecommunications Standards Institute) Quantum-Safe Cryptography Working Group:** Develops and standardizes quantum-safe mechanisms for communications technology.

## Best Practices

- **Early Adoption and Testing:** Organizations should begin testing [[quantum-resistant]] algorithms to understand their impact on system performance and security.
- **Hybrid Approach:** Use a combination of classical and [[quantum-resistant]] [[Algorithm|algorithms]] to ensure security during the transition period.
- **Regular Updates:** Stay informed of the latest developments in [[quantum computing]] and [[cryptography]] to ensure that the cryptographic measures remain effective.

## Implications

- **Transition Challenges**: Moving from classical to post-quantum cryptographic methods will be a massive undertaking, affecting countless systems worldwide.
- **Hybrid Systems**: In the transition phase, hybrid cryptographic systems might be used, combining classical and post-quantum methods to ensure robust security.
- **Long-Term Security**: PQC provides a proactive approach to ensuring that encrypted data remains secure, even in a potential future where [[Quantum Computing|quantum computers]] are commonplace.

## Current Status

- **Ongoing Research**: While many PQC methods have been proposed and studied, research continues to ensure their security and efficiency. Standardization processes, like the one being conducted by NIST, are ongoing to identify the best candidates for wide adoption.
- **Adoption**: While full adoption is still in the future, some organizations are beginning to experiment with and implement PQC algorithms to future-proof their security.
- **April 19, 2024**: Cryptographers have recently been discussing that they do not think [[lattice-based cryptography]] will be around much longer.

## Related Concepts

- **[[Quantum Computing]]**: The study and development of computers that use principles of [[quantum mechanics]].
- **[[Shor's Algorithm]]**: A [[quantum algorithm]] capable of factoring integers exponentially faster than the best-known classical [[Algorithm|algorithms]], thus threatening [[RSA]]-based [[cryptography]].
- **[[RSA]] and [[Elliptic Curve Cryptography|ECC]]**: Classical cryptographic schemes vulnerable to quantum attacks.


