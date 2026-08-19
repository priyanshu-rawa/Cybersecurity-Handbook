---
aliases:
  - Shors Algorithm
---


## Definition

Shor's [[Algorithm]] is a [[quantum algorithm]] formulated by mathematician Peter Shor. Its primary function is to factor large numbers exponentially faster than the most efficient classical [[Algorithm|algorithms]].

## Key Features

- **Quantum Speedup**: The main reason Shor's [[Algorithm]] is notable is due to its potential to factor large numbers in polynomial time, as opposed to classical [[Algorithm|algorithms]] which require exponential time. Specifically, it can factor an �n-bit integer in �((log⁡�)3)O((logn)3) quantum operations.
    
- **Threat to [[RSA]]**: The [[RSA]] encryption scheme, widely used in modern [[cryptography]], relies on the difficulty of factoring the product of two large prime numbers. Shor's [[Algorithm]], when executed on a sufficiently large [[Quantum Computing|quantum computer]], could theoretically break [[RSA]] by efficiently factoring these large numbers.
    

## Procedure

1. **Choose a Random Number**: A number a is chosen at random from the set 1,2,...,−11,2,...,N−1, where N is the number to be factored.
2. **Determine Period**: Using [[quantum mechanics]], the period (or order) r of the modular exponential function mod  axmodN is found.
3. **Classical Computation**: With the period r known, classical computational techniques can then be employed to determine the factors of N.

## Implications

- **[[Cryptography]]**: If large-scale [[Quantum Computing|quantum computers]] are realized, Shor's [[Algorithm]] could jeopardize the security of many cryptographic protocols, prompting a transition to post-quantum cryptographic methods.
    
- **Encouragement for [[Quantum Computing]]**: The potential power of Shor's [[Algorithm]] has been a driving factor for investment and interest in [[quantum computing]].
    

## Current Status

- **Theoretical Threat**: As of now, [[Quantum Computing|quantum computers]] capable of running Shor's [[Algorithm]] to factor numbers of practical interest (e.g., used in [[RSA]] encryption) don't yet exist. However, the [[algorithm]] has been executed on small [[Quantum Computing|quantum computer, quantum computers]] to factor small numbers.

## Related Concepts

- **[[Quantum Computing]]**: The field that explores computing using principles of [[quantum mechanics]].
- **[[RSA]] Encryption**: A widely-used encryption method that relies on the difficulty of factoring large numbers.
- **[[Post-Quantum Cryptography (PQC)]]**: Cryptographic [[Algorithm|algorithms]] designed to be secure against the potential threats posed by [[Quantum Computing|quantum computers]].