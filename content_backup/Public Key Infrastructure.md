---
aliases:
  - PKI
---
up:: [[Cryptology]]
# Public Key Infrastructure (PKI)

Public Key Infrastructure (PKI) is a framework used to create, manage, distribute, use, store, and revoke digital certificates and manage public-key encryption. The purpose of a PKI is to facilitate the secure electronic transfer of information for a range of network activities such as e-commerce, internet banking, and confidential email.

## Key Features

- **Digital Certificates:** Serve as digital passports, providing the public key and the identity of the owner.
- **Certificate Authority (CA):** A trusted entity that issues and manages security credentials and public keys for message encryption.
- **Registration Authority (RA):** Verifies the identity of entities requesting their digital certificates before the CA issues them.
- **Certificate Revocation Lists (CRLs):** Published lists of revoked certificates that are no longer valid.

## Problem Addressed

PKI addresses the challenge of secure electronic communication in open networks like the Internet. It establishes a reliable method for parties to verify each other's identities and securely exchange data without prior direct contact.

## Implications

PKI is fundamental for ensuring the authenticity, confidentiality, and validity of electronic transactions and communications. It supports compliance with security policies and regulatory requirements, providing mechanisms to protect the integrity of digital data.

## Impact

PKI enhances trust in electronic transactions by enabling encryption, digital signatures, and certificate-based authentication. Its application ranges from securing web browsers through SSL/TLS certificates to securing corporate networks and facilitating secure email and VPN access.

## Defense Mechanisms

- **End-to-End Encryption:** Uses certificates to encrypt data between communicating parties, ensuring that only the intended recipient can read it.
- **Digital Signatures:** Utilize private keys to sign documents, verifying the sender's identity and ensuring that the document has not been altered in transit.
- **Key Lifecycle Management:** Oversees the generation, distribution, storage, use, and eventual retirement of cryptographic keys.

## Exploitable Mechanisms/Weaknesses

The security of a PKI system is heavily dependent on the protection of private keys. If a private key is exposed, all associated certificates can be compromised. Additionally, the integrity of the PKI depends on the trustworthiness and security practices of the CA.

## Common Tools/Software

- **Microsoft Active Directory Certificate Services (AD CS):** Provides customizable services for creating and managing public key certificates used in software security systems employing public key technologies.
- **OpenSSL:** A toolkit that includes command line tools for managing digital certificates, keys, and other aspects of a PKI.
- **EJBCA:** A fully functional Certificate Authority built on Java that offers a flexible and modular approach to PKI deployment.

## Related Cybersecurity Policies

- **NIST Special Publication 800-57, "Recommendations for Key Management"**: Part 3 provides guidance on the management of the cryptographic keys used in PKI systems.
- **ETSI TS 119 403-2,** "Electronic Signatures and Infrastructures (ESI); Trust Service Provider Conformity Assessment": Details standards and practices for the secure management of digital certificates and public keys.
- **WebTrust Principles and Criteria for Certification Authorities**: Standards for CAs, including requirements for issuance and management of certificates, as well as CA security controls.

## Best Practices

- Conduct regular security audits of the PKI environment to ensure compliance with policies and detect potential vulnerabilities.
- Implement strong access controls and use hardware security modules (HSMs) to protect root and issuing CA keys.
- Establish a robust certificate policy (CP) and certificate practice statement (CPS) that outline the procedures for managing certificates and cryptographic keys.

## Current Status

PKI continues to evolve with advancements in cryptography, including the development of quantum-resistant algorithms to safeguard future digital communications against emerging threats posed by quantum computing.

## Revision History

- **2024-04-14:** Entry created.