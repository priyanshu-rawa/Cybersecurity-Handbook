---
aliases:
  - one-way hash functions
---
up:: [[Hash-based cryptography]]
# One-Way Hash Functions

One-way hash functions are mathematical [[Algorithm|algorithms]] that convert an input (or 'message') into a fixed-size string of bytes, typically a digest that appears random. The [[hash function]] is designed to be a one-way function, meaning it is infeasible to invert or reverse the process to retrieve the original input from the hash output.

## How It Works

- **Input Processing:** The [[hash function]] takes any length of data as input.
- **Digest Generation:** It processes the data through a series of computations to produce a fixed-size output, known as the hash or digest.
- **Uniqueness:** Each unique input produces a unique hash. Even a small change in the input will significantly change the hash.
- **Non-invertibility:** It is computationally infeasible to reverse the hash back to the original input, which is why hashes are often described as one-way.

## Advantages

- **Data Integrity:** Hashes are commonly used to verify data integrity. Changes to the data result in a different hash, which can be quickly identified.
- **Speed:** [[Hash Function|Hash functions]] are generally fast to compute, which facilitates their use in various applications, from data integrity checks to password storage.
- **Security:** The non-invertible nature of hashes adds a layer of security for data storage, especially for sensitive information like passwords.
- **Fixed Size:** Regardless of the input size, the output (hash) is a fixed size, which simplifies data processing.

## Major Tools

- **[[MD5]]:** Although now considered vulnerable and not recommended for [[cryptographic security]], [[MD5]] is still used for checksums and less security-critical applications.
- **SHA-family ([[SHA-1]], [[SHA-256]], [[SHA-3]]):** Secure Hash Algorithms are widely used for [[cryptographic security]]. [[SHA-256]] and [[SHA-3]] are particularly noted for their strength and resistance against attacks.
- **bcrypt:** Often used for hashing passwords, bcrypt incorporates a salt to protect against rainbow table attacks.
- **Argon2:** Winner of the Password Hashing Competition, recommended for hashing passwords due to its resistance to various types of attacks and ability to be configured for memory and processing power.

## Related Cybersecurity Policies

- **NIST Special Publication 800-107,** "Recommendation for Applications Using Approved Hash Algorithms": Provides guidelines on how and when to use approved [[Hash Function|hash functions]] securely.
- **[[ISOIEC 10118-3|ISO/IEC 10118-3]]:** Information technology - Security techniques - Hash-functions - Part 3: Dedicated hash-functions, which specifies [[Hash Function|hash functions]] such as RIPEMD-160.
- **[[General Data Protection Regulation (GDPR)]] ([[General Data Protection Regulation (GDPR)|GDPR]]):** While not specific to [[Hash Function|hash functions]], [[General Data Protection Regulation (GDPR)|GDPR]] mandates secure processing of personal data, where [[Hash Function|hash functions]] can play a role in anonymizing or securing data.

## Best Practices

- **Avoid deprecated [[Hash Function|hash functions]]:** Functions like [[MD5]] and [[SHA-1]] should not be used for [[cryptographic security]] due to vulnerabilities.
- **Use salts for password hashing:** Adding salts to hashes helps prevent attacks such as rainbow tables.
- **Regularly update cryptographic practices:** As new vulnerabilities are discovered, it is essential to update practices and move to more secure [[Hash Function|hash functions]].

## Current Status

[[Hash Function|Hash functions]] continue to evolve, with new [[Algorithm|algorithms]] developed to address vulnerabilities in older functions and to meet the needs of modern computing power and security requirements.

## Revision History

- **2024-04-19:** Entry created.