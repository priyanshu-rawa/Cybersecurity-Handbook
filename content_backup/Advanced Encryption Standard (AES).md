---
aliases:
  - AES
  - Advanced Encryption Standard
---
up:: [[Cryptographic Algorithms]]
# Advanced Encryption Standard (AES)

The Advanced Encryption Standard (AES) is a specification for the encryption of electronic data. Established by the U.S. National Institute of Standards and Technology (NIST) in 2001, it has since become one of the world's most adopted encryption standards.

## Overview

- **Block Cipher**: AES is designed to encrypt blocks of data rather than continuous streams.
- **Key Lengths**: Supports multiple key lengths: 128, 192, or 256 bits.
- **Block Size**: AES encryption always uses a block size of 128 bits.

## History & Selection

- **Replacement for [[Data Encryption Standard|DES]]**: With the vulnerabilities of the [[Data Encryption Standard]] ([[Data Encryption Standard|DES]]) becoming apparent, NIST initiated a process to identify a worthy successor.
- **AES Competition**: A public competition was held to select the new standard. Rijndael, designed by Belgian cryptographers Vincent Rijmen and Joan Daemen, was chosen as the AES.

## Key Characteristics

1. **Security**: AES, when used correctly, is considered to be one of the most secure encryption standards available today.
2. **Widespread Adoption**: Used in numerous security protocols and systems, including SSL/TLS for web communication, file encryption, and many more.
3. **Efficiency**: AES operations are highly efficient across various platforms, including hardware, software, and embedded systems.

## AES Modes of Operation

- **Electronic Codebook (ECB)**: Simplest mode, where each block of plaintext encrypts to a block of ciphertext. Not recommended for most use-cases due to patterns being visible with large data sizes.
- **Cipher Block Chaining (CBC)**: Each plaintext block is XORed with the previous ciphertext block before encryption.
- **Counter (CTR)**: Converts block ciphers into stream ciphers, useful for encrypting data of an arbitrary size.
- **Galois/Counter Mode (GCM)**: Authenticated encryption mode providing both data [[authenticity]] (integrity) and confidentiality.

## Current Status & Recommendations

- **Gold Standard**: AES remains a top recommendation for most encryption needs.
- **[[Quantum Computing]]**: While AES is currently secure, the advent of [[quantum computing]] could pose challenges. AES-256 is generally considered to be quantum-resistant.

## Related Concepts

- **[[Symmetric Cryptography]]**: A type of [[cryptography]] where the same key is used for both encryption and decryption.
- **[[Data Encryption Standard]] ([[Data Encryption Standard|DES]]) & [[Triple DES]]**: Precursors to AES in the domain of block ciphers.
- **[[Asymmetric Encryption]]**: Complementary to [[symmetric cryptography]], using pairs of keys for encryption and decryption.