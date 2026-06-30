---
aliases:
  - ECC
  - Elliptic Curve
  - Elliptic Curve Cryptography
  - Elliptic Curve Cryptography (ECC)
  - Elliptic Curves
---
up:: [[Cryptographic Algorithms]]
# Elliptic Curve Cryptography (ECC)

Elliptic Curve [[Cryptography]] (ECC) is a type of [[Asymmetric Encryption|public key cryptography]] that uses the mathematics behind elliptic curves over finite fields. ECC offers a similar level of security as traditional methods like [[RSA]] but with much shorter key lengths, making it more efficient.

## Key Features

- **Efficiency**: Requires smaller key sizes compared to non-ECC [[cryptography]] (like [[RSA]]) for equivalent security, resulting in faster computations, less energy consumption, and lower storage requirements.
- **Elliptic Curves**: Defined algebraically as cubic equations in two variables. The structure of these curves provides the foundation for ECC.
- **Point Multiplication**: Central operation in ECC, where a point on the curve is multiplied by a number to produce another point on the curve.

## Mathematical Basis

- **Curve Equation**: Most ECC applications use curves defined by the equation y^2 = x^3 + ax + b.
- **Finite Fields**: ECC operates over finite fields, which limit the set of possible values. This ensures calculations wrap around upon reaching a certain value.
- **[[Diffie-Hellman]] Key Exchange**: ECC can be used in the [[Elliptic Curve Diffie-Hellman]] ([[Elliptic Curve Diffie-Hellman|ECDH]]) key agreement protocol, enabling two parties to establish a shared secret.
- **[[Digital Signature|Digital Signatures]]**: [[Elliptic Curve Digital Signature Algorithm]] ([[Elliptic Curve Digital Signature Algorithm|ECDSA]]) is a widely adopted standard for creating [[Digital Signature|digital signatures]] using ECC.

## Implications

- **Quantum Vulnerability**: Like other [[public key]] cryptosystems, ECC is vulnerable to [[Quantum Computing|quantum computers]] due to [[Shor's algorithm]].
- **Cryptographic Agility**: As with other cryptosystems, it's vital to stay updated with recommended curve parameters and key lengths as computational capabilities advance.

## Current Status

- **Widespread Adoption**: Due to its efficiency advantages, ECC is used in many security standards and protocols, including SSL/TLS certificates, [[Bitcoin]]'s signature [[algorithm]], and secure messaging apps.
- **Research & Development**: Newer curves and associated protocols are being researched and standardized to ensure ongoing security and resistance against specific attack vectors.

## Related Concepts

- **[[Asymmetric Encryption]]**: Cryptographic methods that use two distinct keys – one private and one public.
- **[[Quantum Computing]]**: The study and development of computers based on [[quantum mechanics]].
- **[[RSA]]**: A widely used public-key cryptosystem not based on elliptic curves.