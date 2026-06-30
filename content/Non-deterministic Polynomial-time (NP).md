---
aliases:
  - NP
  - Non-deterministic Polynomial-time
---
up:: [[Multivariate polynomial cryptography]]
# Non-deterministic Polynomial-time (NP)

Non-deterministic Polynomial-time (NP) is a complexity class used in computational complexity theory to describe decision problems for which a "yes" solution can be verified in polynomial time by a deterministic Turing machine, given the correct certificate (or witness). This class encompasses all decision problems where the verification of solutions requires polynomial time relative to the size of the input.

## Key Features

- **Solution Verification:** A problem is in NP if any proposed solution to the problem can be verified as correct or incorrect in polynomial time.
- **Certificate or Witness:** For a given input, the certificate (or witness) is an additional piece of information that helps verify whether the answer to a problem instance is "yes".
- **Relation to P-Class:** Includes all problems that are solvable in polynomial time (the P class), as any solution can trivially be verified in the same amount of time it takes to solve the problem.

## Problem Addressed

NP addresses the challenge of classifying computational problems based on the complexity of verifying solutions, rather than finding them. It is particularly useful for understanding which problems are computationally tractable to verify and potentially solvable efficiently.

## Implications

Understanding the NP class is crucial for theoretical computer science and practical applications, especially in fields like [[cryptography]], [[algorithm]] design, and more broadly in the decision-making processes that require verification of complex conditions.

## Impact

The concept of NP is central to the famous P vs NP problem, one of the seven Millennium Prize Problems. Determining whether every problem whose solution can be verified quickly (in polynomial time) can also be solved quickly has profound implications for mathematics, computer science, and industries that rely on solving complex problems efficiently.

## Related Concepts

- **NP-complete:** A subset of NP. A problem is NP-complete if it is in NP and as hard as any problem in NP, meaning any NP problem can be reduced to it in polynomial time.
- **[[Non-deterministic Polynomial-time hard (NP-Hard)|NP-hard]]:** Describes problems that are at least as hard as the hardest problems in NP. [[Non-deterministic Polynomial-time hard (NP-Hard)|NP-hard]] problems do not necessarily have to be in NP (i.e., they do not require that their solutions can be verified in polynomial time).

## Major Tools and Techniques

- **Reduction Techniques:** Used to demonstrate that a problem is NP-complete by reducing a known NP-complete problem to it in polynomial time.
- **[[Cryptanalysis]] Tools:** Often analyze the hardness of breaking cryptographic systems based on NP-complete problems.

## Current Status

Research in the area of NP problems continues to be highly active, particularly in the exploration of P vs NP, which remains an unsolved question in computer science. Advances in understanding NP-related classes could revolutionize fields like cryptography, optimization, and [[algorithm]] theory.

## Revision History

- **2024-04-14:** Entry created.