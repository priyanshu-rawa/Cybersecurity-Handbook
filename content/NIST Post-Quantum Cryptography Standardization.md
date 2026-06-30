---
aliases:
  - NIST Post Quantum Cryptography Standardization
  - NIST PQC Standardization
  - NIST PQC project
---
up:: [[Security Policies and Governance]]
# NIST Post-Quantum Cryptography Standardization

The NIST [[Post-Quantum Cryptography (PQC)]] Standardization is a project by the National Institute of Standards and Technology (NIST) aimed at developing and standardizing quantum-resistant public-key [[cryptographic algorithms]] to protect against the threat posed by [[quantum computing]].

## How It Works

The initiative operates through a rigorous, multi-phase evaluation process involving cryptographers from around the world. The process includes submission, public feedback, and multiple rounds of analysis to assess each [[algorithm]]'s security, performance, and applicability across various platforms.

## Key Features

- **Quantum Resistance:** Designed to secure digital communications against potential [[Quantum Computing|quantum computer]] attacks.
- **Open Competition:** Utilizes a transparent, community-driven process to vet and select [[Algorithm|algorithms]].
- **Diverse Cryptographic Techniques:** Tests a variety of cryptographic approaches to ensure robustness and adaptability.

## Timeline and Issues

- **2016:** NIST announces the [[Post-Quantum Cryptography (PQC)]] Standardization process.
- **2017-2018:** Initial submission phase with 69 [[Algorithm|algorithms]] submitted.
- **2019:** Downselection to 26 [[Algorithm|algorithms]] after initial reviews and performance assessments.
- **2020-2021:** Second round of evaluation narrows the field to 15 [[Algorithm|algorithms]] focusing on a mix of [[encryption]] and [[digital signature]] functions.
- **2022:** Third round identifies finalists and alternate candidates, with further testing for vulnerabilities and performance optimization.

### Issues Encountered

- **Performance Concerns:** Some [[Algorithm|algorithms]] showed promise in security but were less efficient in terms of computational and memory requirements, particularly on constrained devices.
- **Vulnerability to New Attack Vectors:** Certain schemes were found vulnerable to specific theoretical attacks, leading to their elimination or modification.
- **Implementation Complexity:** [[Algorithm|Algorithms]] with complex implementation requirements posed integration challenges, impacting their viability as universal solutions.

## Finalists

- **[[Encryption]] [[Algorithm|Algorithms]]:**
    
    - **[[CRYSTALS-KYBER]]:** Notable for its balance between security and performance, suitable for general [[encryption]] tasks.
    - **NTRU:** Known for its high performance and resistance to common quantum attacks.
- **[[Digital Signature]] [[Algorithm|Algorithms]]:**
    
    - **[[CRYSTALS-DILITHIUM]]:** Offers robust security against quantum attacks and is efficient in execution.
    - **[[FALCON]]:** Praised for its small signature sizes and fast signing and verification processes.
    - **[[SPHINCS+]]:** A stateless hash-based signature scheme, providing strong security guarantees.

## Related Cybersecurity Policies

- **Federal Information Processing Standards (FIPS):** Guides federal agencies on cryptographic use, to which post-quantum standards will be a crucial update.
- **NIST Special Publications:** Including [[NIST Special Publication 800-57|NIST SP 800-57]], which offers recommendations for key management accommodating quantum-resistant algorithms.

## Advantages

- **Enhanced Security:** Protects sensitive data against future quantum threats.
- **Innovation Stimulus:** Drives forward the field of [[cryptography]], spurring innovation and collaboration.
- **Adaptability and Choice:** Provides multiple cryptographic solutions to address different needs and scenarios.

## Major Tools Used

- **Open Quantum Safe (OQS):** An open-source project that provides libraries for quantum-safe cryptography.
- **liboqs:** Supports research and development in [[Post-Quantum Cryptography (PQC)]] by integrating into existing applications.

## Current Status

As of 2024, NIST is finalizing the selection process, with plans to release official standards soon. The cryptographic community continues to rigorously test and refine these [[Algorithm|algorithms]] to ensure they meet long-term security and performance requirements.

## Revision History

- **2024-04-14:** Entry created.