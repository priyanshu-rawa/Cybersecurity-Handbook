---
aliases:
  - zk SNARKs
  - Zero-Knowledge Succinct Non-Interactive Argument of Knowledge
---

## Definition:

**zK-SNARKs** (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) are a form of cryptographic proof system that allows one party (the prover) to prove to another party (the verifier) that a statement is true without revealing any information about the statement itself, except for the fact that it's true.

---

## Key Characteristics:

- **[[Zero-Knowledge]]**: Ensures that the verifier learns nothing about the statement being proven, except that it's true.
    
- **Succinctness**: The proofs are short and quick to verify, regardless of the statement's length or complexity.
    
- **Non-Interactive**: Requires only a single message from the prover to the verifier, eliminating the need for back-and-forth communication.
    
- **Argument of Knowledge**: Indicates that the prover possesses specific knowledge related to the statement being proven.
    

---

## Use Cases:

- **[[Blockchain Technology|Blockchain]] & [[Cryptocurrency|Cryptocurrencies]]**: Used in certain [[Blockchain Technology|blockchain]] protocols to validate transactions without revealing transaction details, enhancing privacy. For example, Zcash uses zK-SNARKs for private transactions.
    
- **Identity & Authentication**: Can be used to prove one's identity or authenticate without revealing specific identity-related details.
    

---

## Advantages:

- **Privacy**: Enables the performance of computations on hidden data.
    
- **Efficiency**: Reduces the amount of data that needs to be stored on a [[Blockchain Technology|blockchain]], as transactions can be verified without needing complete visibility.
    

---

## Challenges:

- **Complexity**: zK-SNARKs require a setup phase, and understanding and implementing them can be complex.
    
- **Trusted Setup**: The initial generation of certain cryptographic parameters must be done in a secure manner. If compromised, it can lead to vulnerabilities.
    

---

## Related Concepts:

- **[[zK-STARKs]]**: An alternative to zK-SNARKs that does not require a trusted setup but tends to be larger in proof size.
    
- **[[Homomorphic Encryption]]**: Allows computations on encrypted data without needing to decrypt it first.
    

---

## External Links:

- [Zcash's explanation on zK-SNARKs](https://z.cash/technology/zksnarks/)
- [Vitalik Buterin's Introduction to zk-SNARKs](https://vitalik.ca/general/2017/11/09/starks_part_1.html)