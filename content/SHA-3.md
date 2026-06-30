---
aliases:
  - Secure Hash Algorithm 3
---
## Overview

SHA-3, known as the Secure Hash [[Algorithm]] 3, is a [[cryptographic hash function]] standard that was finalized by the National Institute of Standards and Technology (NIST) in 2015. It serves as a complement, not a replacement, to the earlier [[SHA-2]] family. SHA-3 is the result of a competition to develop a new hash [[algorithm]] in response to potential vulnerabilities in previous SHA versions.

## Key Features

- **Sponge Construction**: Unlike its predecessors which use the Merkle–Damgård structure, SHA-3 is based on the Keccak algorithm and uses a sponge construction, which can absorb any amount of data and produce a hash of a fixed size.
    
- **Variants**: SHA-3 includes various hash sizes: SHA3-224, SHA3-256, SHA3-384, and SHA3-512. The number indicates the length of the hash produced.
    
- **Flexibility**: With its sponge construction, it can also be configured for different output lengths, making it more versatile.
    

## Security

- **Cryptographic Strength**: While [[SHA-2]] is still considered secure, SHA-3 provides a security alternative, especially if vulnerabilities are discovered in [[SHA-2]] in the future.
    
- **Resistance**: Designed to be resistant against potential [[quantum computing]] attacks and various known cryptanalytic attack techniques.
    

## Applications

- **Data Integrity**: Ensures data has not been tampered with during transmission or storage.
    
- **[[Digital Signature|Digital Signatures]]**: Creates a fixed-size output from a message to verify the message's [[authenticity]] and integrity.
    
- **Cryptographic Protocols**: Used in various protocols to ensure security, including TLS, [[cryptocurrency]] systems, and more.
    

## Considerations

- **Performance**: SHA-3 can be slower in certain software-based implementations compared to [[SHA-2]], but performance can vary based on the platform and use-case.
    
- **Adoption Rate**: While standardized, the adoption rate of SHA-3 is gradual, as [[SHA-2]] continues to be widely used and is still considered secure.
    

## Related Concepts

- **[[Cryptographic Hash Function|Cryptographic Hash Functions]]**: Functions that take an input and return a fixed-size string of characters, which typically appears random.
    
- **Keccak**: The underlying cryptographic primitive upon which SHA-3 is built.