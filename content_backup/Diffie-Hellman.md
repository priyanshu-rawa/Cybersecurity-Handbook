## Overview

Diffie-Hellman is a cryptographic method introduced by Whitfield Diffie and Martin Hellman in 1976. It allows two parties to independently generate a shared secret over an insecure channel. This shared secret can then be used for encrypted communication.

## Key Concept

The protocol relies on the mathematical properties of **modular arithmetic** and **exponentiation**. The idea is that it's computationally easy to raise numbers to a power modulo a large prime but computationally hard to reverse the process (discrete logarithm problem).

## Procedure

1. **Agreement**: Both parties agree on two large numbers: a prime number `p` and a base `g` (where `g` is a primitive root modulo `p`).
    
2. **Private Values**: Each party chooses a private value. Let's say Alice chooses `a` and Bob chooses `b`.
    
3. **Public Values**: Alice computes �=��mod  �A=gamodp and sends `A` to Bob. Similarly, Bob computes �=��mod  �B=gbmodp and sends `B` to Alice.
    
4. **Shared Secret**: Upon receiving `B`, Alice computes �=��mod  �s=Bamodp. Bob, on receiving `A`, computes �=��mod  �s=Abmodp. Both calculations result in the same value `s`, which is their shared secret.
    

## Use Cases

- **Secure Key Exchange**: Primarily used to exchange cryptographic keys over insecure channels like the internet.
    
- **Virtual Private Networks (VPNs)**: To establish a secure connection.
    
- **Secure Shell (SSH)**: For secure remote logins.
    

## Security

The strength of Diffie-Hellman lies in the **[[Discrete Logarithm Problem]]**. With sufficiently large prime numbers, it becomes computationally infeasible to determine the private value even if an attacker knows the prime number, base, and public value.

However, the original Diffie-Hellman is vulnerable to **[[Man-in-the-middle attacks]]** unless combined with an authentication method.

## Variants & Extensions

- **[[Elliptic Curve Diffie-Hellman]] ([[Elliptic Curve Diffie-Hellman|ECDH]])**: A variant that uses [[Elliptic Curve Cryptography]] to generate the shared secret.
    
- **Authenticated Diffie-Hellman**: Incorporates authentication mechanisms to thwart man-in-the-middle attacks.
    

## Related Concepts

- **[[Public Key]] [[Cryptography]]**: The overarching category of cryptographic methods that includes Diffie-Hellman.
    
- **Key Exchange**: The process by which cryptographic keys are securely exchanged between parties.
    
- **[[Elliptic Curve Cryptography]]**: A type of [[public key]] [[cryptography]] that uses the math of elliptic curves.