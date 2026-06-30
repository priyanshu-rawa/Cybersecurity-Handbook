---
aliases:
  - lattice based cryptography
  - lattice-based cryptographic algorithm
  - lattice-based cryptographic algorithms
  - lattice based cryptographic algorithm
---
up:: [[Post-Quantum Cryptography (PQC)]]
# Lattice-based cryptography

Lattice-Based Cryptography refers to cryptographic systems that derive their security from the hardness of lattice problems. A lattice is a regular grid of points in multidimensional space, and certain mathematical problems related to them are believed to be difficult to solve, even for [[Quantum Computing|quantum computers]].


| **Attribute**              | **[[CRYSTALS-KYBER]]**                            | **[[CRYSTALS-Dilithium]]**                       | **[[FALCON]]**                                     | **[[NTRU]]**                                      |
|----------------------------|-----------------------------------------------|----------------------------------------------|------------------------------------------------|-----------------------------------------------|
| **Primary Use**            | Key Encapsulation                             | Digital Signature                            | Digital Signature                              | Key Encapsulation                             |
| **Key Size (approx.)**     | 800-1632 bytes                                | 1312-2592 bytes                              | 1280-2304 bytes                                | 699-1230 bytes                                |
| **Signature Size (approx.)** | N/A                                         | 2420-4595 bytes                              | 690-1280 bytes                                  | N/A                                           |
| **Performance**            | Fast                                          | Moderate                                     | Fast                                            | Fast                                          |
| **Known Vulnerabilities**  | Resistant to known attacks                    | Resistant to known attacks                   | Side-channel vulnerabilities                    | Resistant to known attacks                    |
| **Security Level**         | High                                          | High                                         | High                                            | High                                          |
| **Pros**                   | Efficient, compact keys                       | High security, non-interactive               | Very efficient, small signatures                | Fast key generation, small ciphertexts        |
| **Cons**                   | Lattice-based attacks are an evolving area    | Larger key sizes compared to some others     | Complex implementation, side-channel risks      | Requires careful parameter selection          |

## Key Features

- **[[Quantum-Resistant]]**: One of the promising candidates for [[Post-Quantum Cryptography (PQC)]]. The difficulty of the underlying lattice problems provides security against quantum threats.
- **Versatility**: Supports a wide variety of cryptographic primitives including:
    - [[Public Key|Public key encryption]]
    - [[Digital Signature|Digital signatures]]
    - [[Fully Homomorphic Encryption (FHE)]]
    - Identity-Based Encryption (IBE)
- **Efficiency**: Lattice-based schemes tend to have relatively small key sizes and fast operations, making them efficient for real-world usage.

## How It Works

Lattice-based cryptography involves operations with points in high-dimensional lattice structures. The security of lattice-based schemes typically derives from the difficulty of solving certain mathematical problems associated with these lattices, such as the [[Shortest Vector Problem (SVP)]] or the [[Closest Vector Problem (CVP)]]. For example, in a lattice-based encryption scheme, encoding a message might involve adding a point in the lattice to a noisy vector, and decrypting the message requires finding the nearest lattice point to retrieve the original data.

## Underlying Hard Problems

- **[[Learning With Errors (LWE)]]**: Given a near-uniformly random sample, distinguish it from a truly random one.
- **[[Short Integer Solution (SIS)]]**: Given a random linear map, find a short, nonzero vector in its kernel.
- **Ring-based variants**: Variants of these problems that operate in polynomial rings, leading to more efficient but slightly more complex cryptographic schemes.

## Advantages

- **Security:** Offers strong theoretical guarantees against known types of attacks, including those from [[Quantum Computing|quantum computers]].
- **Scalability:** [[Algorithm|Algorithms]] can be efficiently implemented, making them suitable for environments with high computational demands.
- **Functionality:** Enables advanced cryptographic functions like [[Fully Homomorphic Encryption (FHE)|FHE]], which allows computations on encrypted data without needing to decrypt it.
## Implications

- **Future of [[Cryptography]]**: If the current lattice-based schemes' security proofs hold up under scrutiny and practical considerations are met, they could be at the forefront of the next generation of cryptographic standards.
- **Complexity**: While the math behind lattice-based cryptography is more abstract and can be harder to grasp than classical systems, its potential benefits in a quantum world are significant.

## Exploitable Mechanisms/Weaknesses

While lattice-based cryptography is promising, its security is based on assumptions about the hardness of lattice problems which, while not yet disproven, are still under theoretical examination. Additionally, practical implementations need careful handling to avoid side-channel attacks.

## Common Tools/Software

- **[[NTRU]]:** One of the earliest and most well-known lattice-based encryption schemes.
- **LWE Library:** A software library that implements cryptographic primitives based on the [[Learning with Errors (LWE)]] problem, a common problem in lattice-based cryptography.
- **Microsoft SEAL (Simple Encrypted Arithmetic Library):** Provides implementations for several lattice-based cryptographic schemes, focusing on [[homomorphic encryption]].

## Related Cybersecurity Policies

- **[[NIST Post-Quantum Cryptography Standardization]]:** An initiative to standardize [[Post-Quantum Cryptography (PQC)|post-quantum cryptographic algorithms]], including those based on lattice problems, to prepare for the advent of [[quantum computing]].
- **[[ISOIEC 18033-6]],** "Information technology — Security techniques — [[Encryption]] [[Algorithm|algorithms]] — Part 6: Asymmetric ciphers": Although primarily dealing with existing asymmetric cryptographic methods, future revisions are expected to incorporate lattice-based approaches as these become standardized.

## Best Practices

- **Continual Research and Development:** Given the evolving nature of [[quantum computing]] and [[cryptography]], ongoing research into the security of lattice-based systems is essential.
- **Risk Assessment:** Organizations should assess the maturity and potential risks associated with adopting new cryptographic technologies.
- **Standardization Participation:** Engaging with standards bodies to stay abreast of developments and ensure compatibility with global security standards.
## Current Status

- **Standardization**: Lattice-based cryptographic primitives are among the leading contenders in NIST's [[Post-Quantum Cryptography (PQC)]] standardization effort.
- **Implementation**: As [[quantum computing]] capabilities grow, the incentive to adopt quantum-secure cryptographic methods, including lattice-based ones, will increase.
- Lattices may or may not hold over time, but their security is a more risky bet than the existence of one way functions (like in [[Hash-based cryptography]])

## Related Concepts

- **[[Post-Quantum Cryptography (PQC)]]**: Cryptographic techniques designed to be secure against potential threats from [[Quantum Computing|quantum computers]].
- **[[Quantum Computing]]**: The study and development of computers using principles of [[quantum mechanics]].
- **[[Fully Homomorphic Encryption (FHE)]]**: Allows for computations on encrypted data without decrypting it.

## Resources

- Lattice-based Cryptography for Beginners https://eprint.iacr.org/2015/938.pdf
- 