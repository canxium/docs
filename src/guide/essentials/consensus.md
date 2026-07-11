# Consensus

Canxium is an advanced layer-one blockchain platform designed to bring stability, reliability, and inclusivity to the cryptocurrency ecosystem. At its core, Canxium introduces a revolutionary demand-driven supply mechanism, dynamically adjusting coin supply in response to real-world demand. This approach helps stabilize currency value while fostering a resilient and adaptable economic model, offering both users and investors a reliable digital asset.

Canxium is secured by **PoW 2.0 - the Cooperative Consensus Protocol (CCP)**, a complete re-engineering of Proof of Work. Instead of miners competing over the same nonce space and wasting hash power on orphaned blocks, a system-level Work Distribution Contract assigns every registered miner an exclusive nonce range, so the entire network cooperates to seal a single canonical chain. Combined with pipelined transaction execution and lagged reward settlement, this delivers near-100% hash power efficiency, second-level block times, and stronger 51%-attack resistance.

Read the full protocol design in the [PoW 2.0 Whitepaper](/whitepaper-2.0/abstract), or jump straight to [mining on PoW 2.0](/guide/pow2/overview).

## A brief history

Canxium's consensus has evolved through three phases:

1. **Proof of Work (2023).** Canxium launched as a pure PoW chain using the Ethash algorithm.
2. **Hybrid Proof of Stake (2024–2026).** To support cross-chain and offline (Retained PoW) mining, Canxium transitioned to a hybrid model where staked validators produced blocks while miners generated coins through mining transactions.
3. **PoW 2.0 (2026–).** The hybrid model proved an unsuitable long-term fit, and Canxium returned to its Proof-of-Work heritage with PoW 2.0 - keeping PoW's security while eliminating its inefficiencies.

The native coin, CAU, powers this ecosystem, facilitating transactions, mining deposits, and network fees.
