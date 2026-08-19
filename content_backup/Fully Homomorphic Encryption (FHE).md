---
aliases:
  - FHE
  - Full Homomorphic Encryption
  - fully homomorphic encryption
---
up:: [[Cryptology]]
# Fully Homomorphic Encryption (FHE)

Fully Homomorphic Encryption (FHE) is a form of encryption that allows computation on ciphertexts, generating an encrypted result which, when decrypted, matches the result of operations performed on the plaintext. This means you can perform calculations on encrypted data without ever needing to decrypt it, maintaining data privacy throughout the process.

## Key Features

- **Data Privacy**: FHE ensures that data remains encrypted even during computation, offering a higher level of security and privacy.
- **Versatility**: It supports a wide range of computations, including addition and multiplication, which are foundational for more complex operations.
- **Cloud Computing Compatibility**: Ideal for secure computations in cloud environments, where data privacy is crucial.
- **Complexity**: Implementing FHE is computationally intensive and more complex compared to other forms of encryption.

## Implications

- **Data Security in Cloud Services**: With FHE, sensitive data can be processed in cloud services without exposing it to service providers or third parties.
- **Healthcare and Finance Industries**: These sectors deal with highly sensitive data, and FHE can significantly enhance the security of data processing and storage.
- **Enabling Secure Outsourcing**: Companies can securely outsource data processing without risking data privacy.
- **Potential Slowdowns**: The computational intensity of FHE can lead to performance challenges, especially for large-scale data.

## Current Status

As of 2023, FHE is still an area of active research, with ongoing efforts to make it more efficient and practical for widespread use. Current implementations are often too slow for practical applications, but continuous improvements in [[Algorithm|algorithms]] and hardware are helping mitigate these issues.

## Related Concepts

- [[Asymmetric Encryption|Asymmetric Encryption]]
- [[Homomorphic Encryption]]
- [[Cloud Security]]
- [[Data Privacy]]
- [[Quantum Cryptography]]

## Important People

- **Craig Gentry**: Known for constructing the first fully homomorphic encryption scheme.
- **Shafi Goldwasser and Silvio Micali**: Their work in probabilistic encryption significantly contributed to the foundations of [[homomorphic encryption]].