# Whitepaper {#whitepaper}

:::info
You are reading the latest version of the Canxium Whitepaper  
- Updated on **Nov 6, 2024**  
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

Canxium’s mining rewards are divided into **two distinct phases**:
1. **Phase 1:** Fixed block rewards on a PoW chain.
2. **Phase 2:** Transition to a hybrid PoW + PoS system, with rewards based only on mining transactions.
## ⚒️ Phase 1: Fixed Block Reward on PoW Chain

- Canxium initially launched on a classic **Proof-of-Work (PoW)** blockchain.
- Each block produced a **fixed reward of 0.25 CAU**, distributed as:
  - **75% to miners**
  - **25% to Canxium Labs**
- A total of **4,354,526 blocks** were mined during this phase, generating exactly **1,088,631.5 CAU** into circulation.
- ⚠️ **Phase 1 ended on July 08, 2024, at 10:23:16 AM (GMT+7)**.

## 🔄 Phase 2: Hybrid PoW + PoS with Mining-Based Rewards

Canxium has transitioned to a **hybrid PoW + PoS system**, with a new reward structure:

- ❌ **No more block rewards**
- ❌ **No fixed PoS staking rewards**
- ✅ **All new CAU is issued through mining transactions only**

:::info
CAU has an essentially **unlimited total supply**, but its **distribution and emission schedule is tightly controlled** – unlike other PoW or PoS chains with simple, fixed, and predictable issuance models.

CAU issuance is **tied to mining difficulty**, which constantly fluctuates. Therefore, it’s hard to predict how much CAU will be created tomorrow, next week, or next month.

The amount of CAU generated depends entirely on **miner behavior**:  
How many new miners join, how much hashrate is added or removed — all of this affects the CAU supply.

👉 **CAU supply is designed to be dynamic and responsive to real market demand and mining activity.**
:::

There are **two mining reward mechanisms** in this phase:

### ⛏️ Independent Retained PoW Mining

- Miners use the **Ethash algorithm** to mine **offline**, without needing network connectivity.
- They submit valid proofs to the network to claim CAU rewards.
- **Reward formula**:
  - `4.25 CAU per 1 PH` of mining difficulty
  - Reward decreases by **~11% monthly**
- This model proves that **offline mining is feasible**, enabling fully decentralized issuance.

:::warning
This standalone mining method was successfully implemented to prove offline mining is possible.  
However, it will soon be **replaced by cross-mining with Ethereum Classic** in the future.
:::

📄 [More Details → Independent Mining Rewards](/whitepaper/tokenomics/independent_mining_rewards)

---

### 🔗 Cross‑Chain Retained PoW Mining

- Canxium supports **cross-mining** with other PoW blockchains.
- Miners embed a **Canxium address** into the external chain’s **coinbase transaction or block metadata**.
- Upon verification, they receive CAU rewards from Canxium.

This cross-mining mechanism enables **fair, decentralized distribution** of CAU across multiple ecosystems.

#### 🪙 Cross-chain Reward Allocation by Blockchain:

---

**🟠 Kaspa**  
- ✅ **No cap** on CAU rewards  
- Reward formula:  
  `floor(KaspaDifficulty ÷ 1,000,000) × baseRewardWei`  
- Reward **decays monthly over 145 months**, and stabilizes at **400 Wei per MH**.

📄 [More Details → Kaspa Cross-Mining Rewards](/whitepaper/tokenomics/cross_chain_mining_rewards)

---

**🟢 Ethereum Classic & Bitcoin**  
- ✅ **No cap** on CAU rewards  
- Reward schedule and structure: **To be defined**

---

**🔵 Other Chains (e.g., Litecoin, Monero, etc.)**  
- ✅ **Total CAU rewards for all other chains will be capped at 12 million CAU**  
- Reward schedule and structure: **To be defined**
- Supply expansion will be limited to ensure **long-term sustainability and balance**
- Over the next **100 years**, total rewards across all these chains **will never exceed 12 million CAU**.

Cross-mining with multiple chains will be a core mechanism to **distribute CAU widely and fairly**, while ensuring supply emission reflects **real-world mining effort** and **demand-driven dynamics**.
