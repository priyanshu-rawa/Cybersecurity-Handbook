---
aliases:
  - RSA encryption
  - Rivest–Shamir–Adleman
---
up:: [[Cryptographic Algorithms]]
# Rivest-Shamir-Adleman (RSA)

RSA (Rivest–Shamir–Adleman) encryption is one of the first public-key cryptosystems and is widely used for secure data transmission. Invented in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman, RSA encryption derives its security from the difficulty of factoring large composite numbers.

## Key Features

- **[[Asymmetric Encryption]]**: Uses a pair of keys, a [[public key]] for encryption and a [[private key]] for decryption.
- **Key Generation**: Involves choosing two large prime numbers, and then multiplying them together. The security of RSA relies on the difficulty of factoring the product of these two primes.
- **Versatility**: Used in various cryptographic functionalities:
    - Data encryption
    - [[Digital Signature|Digital signatures]]
    - SSL/TLS for internet security
- **Scalability**: Security can be scaled by increasing key size, but this also impacts performance.

## Mathematical Basis

- **[[Prime Factorization]]**: RSA's security relies on the fact that, while it's computationally easy (even for large numbers) to multiply together two prime numbers, it's computationally hard to do the reverse: to deduce the original primes given only their product.
- **Euler's Totient Function**: Used in the determination of the public and private keys.

## Implications

- **Quantum Vulnerability**: RSA is vulnerable to [[Quantum Computing|quantum computers]] due to [[Shor's algorithm]], which can factorize integers in polynomial time.
- **Key Size**: As computing power increases, the size of the RSA key needs to be increased for security. Today, 2048-bit or 3072-bit keys are common, but in the past, 1024-bit keys were considered secure.

## Current Status

- **Ubiquity**: Despite its potential vulnerabilities to future quantum threats, RSA remains one of the most widely used encryption methods, especially for SSL/TLS.
- **Transition**: Many organizations are exploring post-quantum encryption methods as a potential replacement for RSA in the future, due to the looming threat of [[quantum computing]].

## Related Concepts

- **[[Asymmetric Encryption]]**: Cryptographic techniques that use two distinct keys – one private and one public.
- **[[Quantum Computing]]**: The study and development of computers using principles of quantum mechanics.
- **[[Shor's Algorithm]]**: A quantum algorithm that can factorize integers efficiently, posing a threat to RSA.