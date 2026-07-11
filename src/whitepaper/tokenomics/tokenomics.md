# Whitepaper {#whitepaper}

:::info
You are reading the latest version of the Canxium Whitepaper  
- Updated on **Oct 2, 2025**  
- Version: **v2.6**
:::

# Tokenomics

:::danger
**Canxium is a decentralized cryptocurrency with a unique, energy-backed issuance model that evolves over time.**

Launched in **April 2023**, Canxium is a **fair-launched project** with:
- ❌ No pre-mine  
- ❌ No pre-sales  
- ❌ No public-sales  
- ❌ No coin pre-allocations  
- ❌ No VCs

It is 100% **decentralized**, **open-source**, and **community-managed**, developed by **Canxium Labs**.
:::

## 📊 Supply Schedule

With the switch to [PoW 2.0](/whitepaper-2.0/abstract), CAU moved from a demand-driven, open-ended emission model to a **hard-capped supply schedule**:

| Source | Period | Supply |
| --- | --- | --- |
| **Phase 0 - PoW & PoS eras** | 2023–2026 | **~1,464,177 CAU** (already minted, carried into the PoW 2.0 genesis) |
| **PoW 2.0 block mining** | 2026 onward | **Max 28,500,000 CAU** (hard cap enforced on-chain) |
| **Offline (Retained PoW) mining** | Ongoing, alongside PoW 2.0 | **Max 3,000,000 CAU** during the PoW 2.0 era; **uncapped, demand-driven** afterward |

For the PoW 2.0 era - which lasts at least two centuries - CAU behaves as a **hard-capped asset**: total supply approaches **~33 million CAU** (≈1.46M carried over + 28.5M PoW 2.0 + 3M offline) and can never exceed it. Only after PoW 2.0 emission is fully exhausted will the offline-mining cap be lifted and Canxium return to **demand-driven issuance**.

## ⚒️ Phase 0: PoW & PoS Eras (2023–2026)

Canxium's first three years used two earlier issuance models, now retired:

- **Fixed block rewards on a classic PoW chain (2023–2024).** Each block paid a fixed **0.25 CAU** (75% to miners, 25% to Canxium Labs). A total of **4,354,526 blocks** were mined, generating exactly **1,088,631.5 CAU**. This era ended on **July 08, 2024, at 10:23:16 AM (GMT+7)**.
- **Hybrid PoW + PoS with mining-based rewards (2024–2026).** Block rewards were removed and all new CAU was issued through **Retained PoW mining transactions** - independent (offline) mining with difficulty-based rewards, and cross-chain mining with networks like Kaspa. Validators operated the chain without fixed staking rewards.

Together, these eras minted **~1,464,177 CAU**, all of which was carried over into the PoW 2.0 genesis - existing balances were preserved 1:1.

📄 Historical reward details: [Independent Mining Rewards](/whitepaper/tokenomics/independent_mining_rewards) · [Cross-Chain Mining Rewards](/whitepaper/tokenomics/cross_chain_mining_rewards)

## ⚡ PoW 2.0 Mining: Capped Halving Schedule

Under PoW 2.0, all new CAU is issued as **block rewards** on a Bitcoin-style halving schedule, hard-capped at **28,500,000 CAU**:

- **Era length:** 78,894,000 blocks - approximately **5 years** at a 2-second block time.
- **Era-0 reward:** `28,500,000 / (2 × 78,894,000)` ≈ **0.18062 CAU per block**, derived from the cap so the halving series sums exactly to it.
- **Halving:** the per-block reward halves at the start of every era.
- **Hard cap:** cumulative emission is checked on-chain for every block; the reward is clamped so the total mined supply can never exceed 28.5M CAU. The reward reaches zero after ~58 eras (~290 years), with the vast majority emitted in the first decades.
- **100% to miners:** the full block reward goes to the mining pool that seals the block - there is no foundation or Canxium Labs cut. Rewards are settled through the Work Distribution Contract one block after each block is sealed (the [Lagged Reward Mechanism](/whitepaper-2.0/abstract)).

| Era | Years (approx.) | Reward per block | CAU emitted | Cumulative mined |
| --- | --- | --- | --- | --- |
| 0 | 2026–2031 | ~0.18062 CAU | ~14,250,000 | ~14,250,000 |
| 1 | 2031–2036 | ~0.09031 CAU | ~7,125,000 | ~21,375,000 |
| 2 | 2036–2041 | ~0.04516 CAU | ~3,562,500 | ~24,937,500 |
| 3 | 2041–2046 | ~0.02258 CAU | ~1,781,250 | ~26,718,750 |
| 4 | 2046–2051 | ~0.01129 CAU | ~890,625 | ~27,609,375 |
| … | … | halves every era | … | → 28,500,000 (cap) |

Because PoW 2.0 miners cooperate over a single chain (no orphaned blocks), every unit of emission corresponds to real, useful work securing the network.

📄 [How to mine → PoW 2.0 Mining Guide](/guide/pow2/overview)

## ⛏️ Offline (Retained PoW) Mining

Offline (Retained PoW) mining - the mechanism that lets miners generate and submit proofs without a constant network connection - **continues under PoW 2.0**, running alongside block mining. It proved itself during the hybrid era as an effective way to force supply to follow real market demand: miners only produce and submit mining transactions when demand makes it profitable, so issuance naturally expands when demand rises and contracts when it slows.

To preserve this unique mechanism while keeping inflation under control during the capped era, offline mining is limited to a **maximum of 3,000,000 CAU** for as long as PoW 2.0 block mining is active.

### The demand-driven future

PoW 2.0 block emission runs for **at least 200 years** before its 28.5M cap is exhausted. Once it ends, the **3M offline-mining cap is lifted** and Canxium returns to a fully **demand-driven supply** through offline mining:

- **No hard cap** - supply grows only as market demand justifies the mining cost.
- Because offline mining has already proven it forces supply to follow demand, it becomes Canxium's long-term, sustainable issuance model - anchored to real-world demand rather than a fixed schedule.
