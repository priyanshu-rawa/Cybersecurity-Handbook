---
aliases:
  - Secure Hash Algorithm 1
---
up:: [[Hash Function|Hash Functions]]
# Secure Hash Algorithm-1 (SHA-1)

SHA-1 is a [[cryptographic hash function]] that produces a 160-bit (20-byte) hash value, often displayed as a 40-character hexadecimal number. Part of the SHA family, it was designed by the [[NSA]] and published by the [[National Institute of Standards and Technology]] (NIST) in 1993.

## Key Characteristics

- **Output Size**: SHA-1 produces a fixed 160-bit output, regardless of the input size.
    
- **Deterministic**: Given the same input, SHA-1 will consistently produce the same hash value.
    
- **Speed**: SHA-1 was designed to be relatively fast and efficient for its time.
    

## Vulnerabilities

- **Collision Vulnerability**: Over the years, the security of SHA-1 has been questioned. As of 2005, researchers began to find theoretical collision vulnerabilities. By 2017, a practical collision was demonstrated, making SHA-1 considered insecure for further cryptographic use.
    
- **Weakening Preimage Resistance**: While it's more resistant than an outright collision, researchers have made progress in attacking SHA-1's resistance to preimage and second preimage attacks.
    

## Common Uses

- **[[Digital Signature|Digital Signatures]]**: Used in the earlier days of digital certificates and public-key infrastructure.
    
- **Checksums**: Employed for verifying the integrity of files and data.
    
- **Password Hashing**: Used historically in some systems, though now regarded as insecure for this purpose.
    

## Transition to Other Hash Functions

Due to its vulnerabilities, a shift away from SHA-1 to more secure alternatives from the [[SHA-2]] family (like [[SHA-256]]) has been recommended by security experts and organizations.

## Related Concepts

    
- **[[Hash Collision]]**: A scenario in which two different inputs result in the same hash output.
    
- **[[SHA-2]]**: A family of hash functions that emerged as a successor to SHA-1, offering enhanced security.