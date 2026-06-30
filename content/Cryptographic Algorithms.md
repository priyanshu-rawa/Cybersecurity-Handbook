up:: [[Cryptology]]
# Cryptographic Algorithms

Cryptographic algorithms are mathematical formulas or protocols used to encrypt and decrypt data, ensuring the confidentiality, integrity, and authenticity of information in digital communications. These [[Algorithm|algorithms]] form the backbone of modern security systems, ranging from secure online transactions to private communications.

## Key Features

- **[[Symmetric Cryptography|Symmetric Algorithms]]:** Use a single key for both [[encryption]] and decryption. Common [[Symmetric Cryptography|symmetric algorithms]] include [[Advanced Encryption Standard (AES)|AES]] ([[Advanced Encryption Standard (AES)]]) and [[Data Encryption Standard|DES]] ([[Data Encryption Standard]]).
- **[[Asymmetric Encryption|Asymmetric Algorithms]]:** Use a pair of keys, one for [[encryption]] ([[public key]]) and one for decryption ([[private key]]). Examples include [[RSA]], [[Elliptic Curve Cryptography|ECC]] ([[Elliptic Curve Cryptography]]), and [[Digital Signature Algorithm|DSA]] ([[Digital Signature Algorithm]]).
- **[[Hash Function|Hash Functions]]:** Produce a fixed-size hash value from data of arbitrary size, commonly used for creating [[Digital Signature|digital signatures]] and data integrity checks. Examples include [[SHA-256]] and [[MD5]].

## How It Works

- **[[Symmetric Cryptography|Symmetric Encryption]]:** Both the sender and receiver share a single secret key. The sender uses this key to encrypt the plaintext and sends the ciphertext to the receiver. The receiver uses the same key to decrypt the ciphertext to retrieve the original plaintext.
- **[[Asymmetric Encryption]]:** The sender uses the recipient's [[public key]] to encrypt the plaintext. Only the recipient's [[private key]] can decrypt the ciphertext, ensuring that only the intended recipient can access the plaintext.
- **[[Hash Function|Hash Functions]]:** Data is input into the [[hash function]], producing a hash output. This output does not reveal any information about the input, making it ideal for verifying data integrity without exposing the underlying data.

## Problem Addressed

Cryptographic algorithms address the need for secure data transmission and storage, protecting data from unauthorized access, tampering, and fraud. They are crucial in environments where data security and privacy are paramount.

## Implications

The use of cryptographic algorithms is essential in securing digital identities, financial transactions, and sensitive communications. They enable trust and confidentiality in the digital world, underpinning everything from ecommerce to secure governmental communications.

## Impact

Cryptographic algorithms strengthen the security infrastructure of IT systems, mitigate risks associated with data breaches, and help in complying with global privacy standards and regulations.

## Defense Mechanisms

- **[[Encryption]]:** Provides confidentiality by making data unreadable to unauthorized parties.
- **[[Digital Signature|Digital Signatures]]:** Ensure authenticity and non-repudiation by proving the origin of a message and that it has not been altered.
- **Data Integrity:** [[Hash Function|Hash functions]] verify that data has not been tampered with during transmission.

## Exploitable Mechanisms/Weaknesses

Weaknesses in cryptographic algorithms can arise from poor key management, using deprecated [[Algorithm|algorithms]] with known vulnerabilities, or insufficient key sizes. [[Quantum computing]] poses a future threat to many current cryptographic algorithms.

## Common Tools/Software

- **OpenSSL:** An open-source library that provides various cryptographic algorithms.
- **GnuPG:** Free software that encrypts data and creates [[Digital Signature|digital signatures]].
- **Cryptool:** An educational tool that provides insights and practical experience with cryptographic algorithms.

## Related Cybersecurity Policies

- **NIST Special Publications:** Such as [[NIST Special Publication 800-57|NIST SP 800-57]] which provide recommendations for key management and cryptographic key usage.
- **[[ISOIEC 27002|ISO/IEC 27002]]:** Provides guidelines for organizational information security standards, including the use of cryptographic techniques.
- **[[PCI DSS]]:** Specifies requirements for [[encryption]] and cryptographic key management to secure cardholder data.

## Best Practices

- Use strong, modern cryptographic [[Algorithm|algorithms]] with appropriate key lengths.
- Regularly update cryptographic practices to accommodate new threats and advancements in technology.
- Implement robust key management policies to protect and manage cryptographic keys securely.

## Current Status

The field of [[cryptography]] is continuously evolving, particularly with advancements in [[quantum computing]]. Ongoing research focuses on developing quantum-resistant cryptographic [[Algorithm|algorithms]] to prepare for future threats.

## Revision History

- **2024-04-14:** Entry created.