---
aliases:
  - zK
---

## Definition:

**Zero-Knowledge (ZK)** is a cryptographic property that allows one party (the **prover**) to prove to another party (the **verifier**) that a statement is true **without revealing any information** about the underlying data or secret, except for the fact that the statement itself is true.

---

## Key Characteristics:

- **Zero-Knowledge**: The verifier learns nothing beyond the validity of the statement being proven.
    
- **Completeness**: If the statement is true and both parties follow the protocol, the verifier will accept the proof.
    
- **Soundness**: If the statement is false, a dishonest prover cannot convince the verifier (except with negligible probability).
    

---

## Use Cases:

- **Authentication**: Proving possession of a secret (e.g., a password or key) without revealing the secret itself.
    
- **Identity & Attribute Proofs**: Proving properties such as age, membership, or authorization without disclosing full identity information.
    
- **Privacy-Preserving Systems**: Enabling verification in systems where data exposure would otherwise be required.
    

---

## Advantages:

- **Privacy**: Eliminates the need to reveal sensitive data during verification.
    
- **Trust Minimization**: Reduces reliance on trusted third parties by allowing direct verification.
    

---

## Challenges:

- **Conceptual Complexity**: Zero-knowledge is unintuitive and difficult to reason about without strong mental models.
    
- **Implementation Difficulty**: Designing correct zero-knowledge systems requires careful cryptographic construction.
    

---

## Related Concepts:

- [[Zero-knowledge Proofs|Zero Knowledge Proof]]
- [[zK-STARKs|zK STARK]]
- [[zk-SNARKs|zk SNARKs]]
    

---

## External Links:

- [Wikipedia – Zero-Knowledge Proof](https://en.wikipedia.org/wiki/Zero-knowledge_proof)
    
- [Goldwasser, Micali, Rackoff (1985) – Original ZK Paper](https://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Zero%20Knowledge/Zero-Knowledge_Sets.pdf)
    

