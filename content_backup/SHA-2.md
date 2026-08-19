---
aliases:
  - Secure Hash Algorithm 2
---

## Overview

SHA-2 (Secure Hash [[Algorithm]] 2) is a family of [[Cryptographic Hash Function|cryptographic hash functions]] designed by the NSA (National Security Agency) and first published in 2001. SHA-2 includes a set of six [[Hash Function|hash functions]] with digests that are 224, 256, 384, 512, 512/224, and 512/256 bits long.

## Key Features

- **Deterministic**: For a given input, the output (hash) will always be the same.
    
- **Fast Processing**: Computes the hash code in a reasonable amount of time.
    
- **Pre-image Resistance**: Computationally infeasible to generate the original input value given the hash output.
    
- **Small Changes, Big Impact**: Even a minuscule change in input data results in a significantly different hash.
    
- **Fixed Length**: Regardless of the input size, the hash value size remains constant.
    

## Specific [[Hash Function|Hash Functions]] in SHA-2

- **SHA-224**: Produces a 224-bit hash.
    
- **[[SHA-256]]**: Produces a 256-bit hash. Most commonly used of the SHA-2 family.
    
- **SHA-384**: Produces a 384-bit hash.
    
- **SHA-512**: Produces a 512-bit hash.
    
- **SHA-512/224** & **SHA-512/256**: Variants of SHA-512 with different initial values and truncated outputs.
    

## Applications

- **Data Integrity**: Verifying the integrity of data during transfer.
    
- **Password Storage**: Storing user passwords as hashes to protect them against theft.
    
- **[[Digital Signature|Digital Signatures]]**: Assuring the identity of a digital message or document.
    

## Considerations

- **Transition from [[SHA-1]]**: SHA-2 succeeds [[SHA-1]], which was found to have vulnerabilities. SHA-2 provides stronger security and is recommended for new applications.
    
- **[[Quantum Computing]]**: While considered secure now, advances in [[quantum computing]] might pose a threat in the future.
    

## Related Concepts

- **[[Cryptographic Hash Function|Cryptographic Hash Functions]]**: Mathematical operations that take an input and return a fixed-size string of bytes.
    
- **[[SHA-3]]**: A successor to SHA-2, providing a different approach to hashing.
    
- **[[MD5]]**: An older and faster [[hash function]], but not as secure as SHA-2.