# Whitepaper {#whitepaper}

:::info You are reading the latest version of Canxium Whitepaper

- Updated on **Nov 27, 2024**.
- Version: v2.5.1
  :::


## Kaspa Merge Mining Rewards Proposal

In progress ...

## Litecoin Merge Mining Rewards Proposal

**Parameters:**

* **Initial Block Reward:** 1.4 CAU
* **Block Time:** 150 seconds per block (2.5 minutes)
* **Halving Interval:** Every 420,000 blocks (2 years)
* **Merge Mining Time Period:** 8 years (Merge Mining in 8 years)
* **Total Seconds:** 252,460,800 seconds
* **Total Blocks Mined:** 252,460,800 / 150 = 1,683,072 blocks
* **Total Halving Events:** 1,683,072 / 420,000 ≈ 4

**Calculation Table:**

| Year | Halving Event | Blocks Mined | Block Reward | Total CAU Mined |
|---|---|---|---|---|
| 1-2 | 1 | 420,000 | 1.4 | 588,000 |
| 3-4 | 2 | 420,000 | 0.7 | 294,000 |
| 5-6 | 3 | 420,000 | 0.35 | 147,000 |
| 7-8 | 4 | 423,072 | 0.175 | 73,785.6 |
| **Total** |  | **1,683,072** |  | **~1,102,785.6 CAU** |

**Total CAU Mined:** Approximately 1,102,785.6 CAU

The reward will be distributed according to the following formula:
```
Y + 0.15 * Y + 0.25 * Y = Block Reward
```

- Y: Miner Rewards
- 0.15 * Y: Validator Rewards
- 0.25 * Y: Canxium Labs

For example:
- Block reward = 1.4 CAU => Y = 1 CAU

:::warning
However, the reward also depends on the difficulty of the Litecoin block submitted. The formula above applies to a block with a difficulty of 50 MH (the current difficulty of the latest block 2798839). If the submitted block has a difficulty of only 25 MH, the reward will be 0.5 CAU instead of 1 CAU.
:::