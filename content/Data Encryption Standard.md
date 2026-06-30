---
aliases:
  - DES
---
up::[[Cryptographic Algorithms]]
# Data Encryption Standard (DES)

The Data Encryption Standard (DES) is a symmetric-key algorithm for the encryption of electronic data. Established in 1977 by the U.S. National Institute of Standards and Technology (NIST), DES became a federal standard and was widely adopted for commercial and government applications.

## Overview

- **Block Cipher**: Operates on 64-bit blocks of data using a 56-bit key (with 8 parity bits).
- **Feistel Structure**: Uses a series of permutation and substitution functions over 16 rounds.

## Key Milestones

- **1973**: NIST (formerly NBS) initiated a project to develop a federal encryption standard.
- **1976**: IBM's proposed cipher, named "Lucifer", was selected with modifications and renamed DES.
- **1977**: Officially adopted as a federal standard (FIPS PUB 46).
- **1997**: DES was publicly broken by a brute-force attack by the DESCHALL project.
- **1999**: Electronic Frontier Foundation's (EFF) "Deep Crack" machine confirmed the vulnerability of DES to brute-force attacks.
- **2002**: Officially deprecated by NIST and replaced by the Advanced Encryption Standard (AES).

## Strengths & Weaknesses

1. **Short Key Length**: The 56-bit key length has been proven vulnerable to brute-force attacks.
2. **S-Boxes**: DES's substitution boxes were once a source of controversy due to lack of design transparency but were later found to be resistant against differential cryptanalysis.
3. **Triple DES**: As a countermeasure to DES's vulnerabilities, 3DES was introduced, applying the DES algorithm three times with different keys.

## Legacy & Relevance Today

- **Historical Significance**: DES's widespread adoption set a precedent for subsequent encryption standards.
- **Legacy Usage**: Some legacy systems may still utilize DES or 3DES, though it's strongly discouraged for modern applications.
- **Cryptanalysis Significance**: DES challenges led to advancements in the field of cryptanalysis, including the development of techniques like differential and linear cryptanalysis.

## Related Concepts

- **Triple DES (3DES)**: An extension to counter DES's vulnerabilities.
- **Advanced Encryption Standard (AES)**: Successor to DES and currently the global standard for encryption.
- **Brute-Force Attack**: A method of trial and error, attempting every possible key until the correct one is found.