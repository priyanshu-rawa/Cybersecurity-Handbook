---
aliases:
  - zK-Rollups
  - zK-Rollup
  - ZK Rollup
  - zK Rollups
---
## Overview

zK-Rollups are a [[Layer 2 Deep Dive|layer-2]] scaling solution for [[Blockchain Technology|blockchains]], aiming to address the challenges of transaction throughput and gas fees, particularly on platforms like [[Ethereum]]. They work by taking many transactions off-chain, processing them, and then submitting a single proof on-chain.

## Key Concepts

1. **[[zk-SNARKs]]**: The underlying cryptographic technique for zK-Rollups. Stands for "[[zero-knowledge]] succinct non-interactive argument of knowledge." It allows one to prove knowledge of certain information without revealing that information.
2. **Batch Processing**: Transactions are bundled or "rolled up" into a single transaction with a proof, dramatically reducing the data stored on-chain.
3. **Data Availability**: While transaction data is kept off-chain, it's still available and can be reconstructed if needed, ensuring security.

## Advantages

- **Scalability**: Can increase transaction throughput significantly compared to main chains.
- **Cost Efficiency**: Reduces the overall gas fees by aggregating multiple transactions.
- **Security**: Inherits the security properties of the main chain while also ensuring data availability.
- **Fast Withdrawals**: Allows for faster withdrawals compared to other [[Layer 2]] solutions.

## Limitations

- **Complexity**: Requires advanced cryptographic techniques, making development more complex.
- **Initial Setup**: [[zk-SNARKs]] require a one-time trusted setup.

## Differences from Other L2 Solutions

- **[[Optimistic Rollups]]**: While both aggregate transactions, zK-Rollups use [[zk-SNARKs]] for proof while [[Optimistic Rollups]] use fraud proofs.
- **State Channels**: zK-Rollups don't require mutual cooperation between parties for every transaction, unlike state channels.

## Notable Projects

1. **zkSync**: Aiming to bring secure, low-cost transactions to [[Ethereum]].
2. **Loopring**: Uses zK-Rollups for its [[Decentralized Exchanges|decentralized exchange]] platform.

## Implications

zK-Rollups present a promising pathway to scalable, decentralized applications ([[dApps]]) and platforms, especially as [[Ethereum]] and other platforms transition to [[Proof of Stake|PoS]] mechanisms and further scalability solutions.