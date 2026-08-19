---
aliases:
  - ECDH
---

## Overview

ECDH is an asymmetric key agreement protocol that facilitates two parties, each having an elliptic curve public-private key pair, to establish a shared secret over an insecure channel. This shared secret can be used directly as a key or to derive one or more symmetric keys.

## Key Concepts

- **[[Elliptic Curve Cryptography]] ([[Elliptic Curve Cryptography|ECC]])**: A branch of [[cryptography]] utilizing elliptic curves over finite fields. Offers security with smaller key sizes compared to traditional methods.
    
- **Key Agreement Protocol**: A method where two or more parties can agree on a shared, secret value. ECDH is an example tailored for [[Elliptic Curve Cryptography]].
    
- **Shared Secret**: A value derived from a combination of public and private keys that remains unknown to third-party eavesdroppers.
    

## How ECDH Works

1. **Key Generation**: Each party generates an elliptic curve public-private key pair.
    
2. **Exchange Public Keys**: Parties exchange their public keys over an insecure channel.
    
3. **Compute Shared Secret**: Independently, each party uses their private key and the other party's [[public key]] to compute a shared secret. Due to the properties of [[Elliptic Curve Cryptography|ECC]], both parties will produce the same secret value.
    

## Benefits

- **Enhanced Security**: [[Elliptic Curve Cryptography|ECC]] offers a higher strength-per-bit than other [[public key]] methods, meaning smaller keys can offer equivalent security.
    
- **Efficiency**: [[Elliptic Curve Cryptography|ECC]]'s smaller key sizes can result in faster computation and less resource-intensive operations, making it suitable for resource-constrained environments.
    
- **Perfect Forward Secrecy (PFS)**: By frequently generating ephemeral key pairs, compromise of a single key won't jeopardize past communications.
    

## Vulnerabilities

- **Implementation Errors**: As with all cryptographic methods, implementation flaws can introduce vulnerabilities.
    
- **Weak Curves**: Some elliptic curves are more resistant to attacks than others. It's crucial to choose well-studied curves.
    

## Common Uses

- **Secure Communications**: Used in protocols like TLS for establishing shared encryption keys between servers and clients.
    
- **VPN connections**: ECDH can be used to establish secure keys for virtual private networks.
    
- **Cryptographic Key Derivation**: The shared secret can be a foundation from which symmetric encryption keys are derived.
    

## Related Concepts

- **[[Elliptic Curve Digital Signature Algorithm]] ([[Elliptic Curve Digital Signature Algorithm|ECDSA]])**: A popular [[algorithm]] for creating and verifying [[Digital Signature|digital signatures]] using elliptic curves.
    
- **[[Diffie-Hellman]] (DH)**: The original key agreement protocol that ECDH is based upon.
    
- **Finite Fields**: Mathematical fields that contain a finite number of elements, fundamental to the elliptic curve operations.