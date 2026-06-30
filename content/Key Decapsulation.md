---
aliases:
  - decapsulation
  - key decapsulation
---
up:: [[BIKE]]
# Key Decapsulation

Key Decapsulation is a process used in cryptographic systems, particularly within the context of [[public key]] encryption schemes, where a cipher or encapsulated key is decrypted to retrieve a plaintext secret key. This process is typically part of broader protocols that involve [[key encapsulation mechanisms (KEM)]] to securely transmit encryption keys.

## How It Works

Key Decapsulation involves the following steps:

1. **[[Key Encapsulation]]:** During this initial phase, a secret key is encapsulated (encrypted) using the recipient's [[public key]], producing an encapsulated key that can be safely transmitted over insecure channels.
2. **Transmission:** The encapsulated key is sent to the intended recipient along with the encrypted data.
3. **Decapsulation:** Upon receiving the encapsulated key, the recipient uses their [[private key]] to decapsulate (decrypt) it and retrieve the original secret key.
4. **Data Decryption:** Using the retrieved secret key, the recipient can then decrypt the encrypted data.

## Advantages

- **Security:** Provides a secure method for transmitting keys over unsecured networks by ensuring that only the holder of the [[private key]] can decapsulate and retrieve the secret key.
- **Efficiency:** Reduces the computational burden and complexity of directly encrypting large volumes of data with [[public key]] [[Algorithm|algorithms]] by instead encrypting only small keys.
- **Scalability:** Facilitates secure communication between multiple parties without the need for all parties to pre-share secret keys.

## Related Cybersecurity Policies

- **[[NIST Post-Quantum Cryptography Standardization]]:** As part of developing resistance against [[Quantum Computing|quantum computer]] attacks, NIST's considerations for [[key encapsulation]] mechanisms are crucial since they directly impact the security of key decapsulation processes.
- **[[ISOIEC 18033-2]]:** This standard specifies encryption algorithms including key encapsulation mechanisms, which are integral to secure key decapsulation processes.

## Major Tools Used

- **Liboqs (Open Quantum Safe):** Provides a collection of quantum-resistant cryptographic algorithms, including key encapsulation mechanisms that support secure key decapsulation.
- **Microsoft's PQCrypto-VPN:** Utilizes post-quantum cryptography algorithms for secure key exchange, including mechanisms for key encapsulation and decapsulation.
- **Google Tink:** Offers cryptographic APIs that support various cryptographic tasks including key encapsulation and decapsulation, focusing on providing easy-to-use interfaces and strong security guarantees.

## Current Status

With the ongoing advancement in quantum computing, key decapsulation mechanisms, especially those resistant to quantum attacks, are under active development and standardization. These efforts aim to adapt to future threats while maintaining the efficiency and security of cryptographic operations.

## Revision History

- **2024-04-14:** Entry created.