# Whitepaper {#whitepaper}

:::info You are reading the latest version of Canxium Whitepaper

- Updated on **Jan 26, 2025**.
- Version: v2.6
  :::


## Independent Retained PoW Mining Rewards

:::warning
Ethash is the only supported algorithm as of now.
:::

### Ethash

Canxium's **Independent Retained Proof of Work (PoW) Mining** enables miners to contribute computational work at their convenience, storing and submitting proof later for rewards. This mechanism ensures fair participation and sustainable distribution of CAU rewards.

### **Reward Mechanism**

The mining reward starts at **4,250 wei per difficulty hash** and follows a controlled reduction schedule to balance long-term supply and miner incentives. The reward per difficulty hash decreases at a fixed rate of **88.42% per month** over a period of **48 months**.

### **Reward Calculation**

The formula governing the reward decrease is:

```Reward (N) = 4250 * 0.8842 ^ (N-1)```

Where:
- **R(N)** is the reward per difficulty hash in month **N**.
- **4250** is the initial reward in the first month.
- **0.8842** represents the monthly reduction factor.
- **N** is the month number (1 ≤ N ≤ 48).

### **Reduction Schedule**

The rewards are distributed as follows:

<embed src="/files/offline-mining-reward-ethash.pdf" type="application/pdf" width="100%" height="600px" />