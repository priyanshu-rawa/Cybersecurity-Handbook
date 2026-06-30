---
aliases:
  - Message Digest Algorithm 5
---
up:: [[Hash Function|Hash Functions]]
## Overview

MD5 is a widely-used cryptographic [[hash function]] that produces a 128-bit (16-byte) hash value, often represented as a 32-character hexadecimal number. It was designed by Ronald Rivest in 1991 as an improvement over earlier hash functions like MD4.

## Key Characteristics

- **Speed**: MD5 is known for its speed, which initially contributed to its popularity in various applications.
    
- **Fixed Output**: Regardless of input size, the output is always a fixed 128 bits.
    
- **Deterministic**: The same input will always produce the same hash value.
    

## Vulnerabilities

- **Collision Vulnerability**: As early as 2004, researchers began finding collisions in MD5, meaning two different inputs could produce the same hash output. This vulnerability has been exploited in various forms, diminishing the trustworthiness of MD5 in [[cryptographic security]].
    
- **Preimage and Second Preimage Attacks**: While these attacks are not as practical as collision attacks, theoretical vulnerabilities have been discovered.
    

## Common Uses

- **Checksums**: Historically used for verifying data integrity.
    
- **Password Storage**: Used in older systems for storing password hashes, although this is now strongly discouraged due to its vulnerabilities.
    
- **Digital Signatures**: Earlier in its lifecycle, MD5 was used in combination with public-key algorithms to produce digital signatures.
    

## Transition to Other Hash Functions

Due to its vulnerabilities, many organizations have moved away from MD5 to more secure hash functions. Alternatives include:

- **SHA-2**: A family of hash functions that includes [[SHA-256]] and SHA-512.
    
- **[[BLAKE2]]**: A high-speed, secure [[hash function]] which is often viewed as an alternative to both MD5 and SHA-2.
    

## Related Concepts

- **Cryptographic [[Hash Function]]**: A method to ensure data integrity by producing a fixed-size output from variable-size input.
    
- **Collision**: A situation where two different inputs produce the same hash output.