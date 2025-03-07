# Whitepaper {#whitepaper}

:::info You are reading the latest version of Canxium Whitepaper

- Updated on **Jan 26, 2025**.
- Version: v2.6
  :::


## Cross-Chain Retained PoW Mining Rewards

:::warning
Kaspa is the only supported chain as of now, more chains will be integrated in the future
:::

### Kaspa Chain

#### Overview
Cross-Chain mining rewards with the Kaspa chain are calculated using a dynamic reward mechanism designed to incentivize early miners while gradually reducing the rewards over time. The rewards are based on the mining difficulty and the number of days elapsed since the beginning of the mining process.

The system is divided into four distinct reward phases, each with different base rewards and decay factors. This structure encourages early adoption while maintaining a sustainable reward model for long-term miners.

---

#### Reward Calculation Formula
The reward is calculated using the following algorithm:

1. **Inputs:**
   - `difficulty`: The difficulty of the Kaspa mined block.
   - `dayNum`: The number of days elapsed since the start of mining.

2. **Constants:**
	- KaspaPhaseTwoDayNum  = uint64(3)
	- KaspaPhaseThreeMonth = uint64(141)

	- Map from first 3 days to base reward:
   ```KaspaCrossMiningIncentiveBaseRewards = [3]int64{600000, 400000, 200000}```
	- Map from month to base reward: wei per params.KaspaMinAcceptableDifficulty difficulty, default 1000000
   ```golang
   KaspaCrossMiningBaseRewards = [142]int64{183829, 91915, 45958, 25868, 23963, 23254, 22566, 21898, 21249, 20620, 20010, 19418, 18843, 18285, 17744, 17219, 16709, 16214, 15734, 15269, 14817, 14378, 13953, 13540, 13139, 12750, 12372, 12006, 11651, 11306, 10971, 10647, 10331, 10026, 9729, 9441, 9161, 8890, 8627, 8372, 8124, 7883, 7650, 7424, 7204, 6991, 6784, 6583, 6388, 6199, 6016, 5838, 5665, 5497, 5334, 5176, 5023, 4875, 4730, 4590, 4454, 4323, 4195, 4070, 3950, 3833, 3720, 3610, 3503, 3399, 3298, 3201, 3106, 3014, 2925, 2838, 2754, 2673, 2594, 2517, 2442, 2370, 2300, 2232, 2166, 2102, 2040, 1979, 1921, 1864, 1809, 1755, 1703, 1653, 1604, 1556, 1510, 1466, 1422, 1380, 1339, 1300, 1261, 1224, 1188, 1153, 1119, 1085, 1053, 1022, 992, 963, 934, 906, 880, 854, 828, 804, 780, 757, 735, 713, 692, 671, 651, 632, 613, 595, 578, 561, 544, 528, 512, 497, 482, 468, 454, 441, 428, 415, 403, 400}
   ```

3. **Reward Phases:**
   - **Phase One:** Day 0 to 2
     - Base reward: `KaspaCrossMiningIncentiveBaseRewards[day]`
   - **Phase Two:** Month 0 to 140
     - Base reward: `KaspaCrossMiningBaseRewards[month]`
   - **Phase Three:** Month 141 to Future
     - Base reward: `KaspaCrossMiningBaseRewards[141] = 400 Wei`
---

#### Reward Algorithm
The reward calculation is performed as follows:

1. **Determine Base Reward:**
   Based on the timestamp of canxium block, the base reward and decay factor are selected:

   ```go
	if day < KaspaPhaseTwoDayNum {
		baseReward.SetInt64(KaspaCrossMiningIncentiveBaseRewards[day])
	} else if month < KaspaPhaseThreeMonth {
		baseReward.SetInt64(KaspaCrossMiningBaseRewards[month])
	} else {
		baseReward.SetInt64(KaspaCrossMiningBaseRewards[KaspaPhaseThreeMonth])
	}
   ```

2. **Calculate Reward:**
   Multiply the adjusted base reward by the difficulty:
   
   ```go
   reward.Mul(kaspa_block_difficulty/1000000, baseReward)
   ```

3. **Output:**
   Return the reward as an integer value.

---

#### Incentive Model
The reward model is designed to:
1. **Encourage Early Mining:** Higher rewards in the initial days incentivize miners and mining pools to participate early.
2. **Gradual Reduction:** Decay factors ensure a smooth reduction in rewards, aligning with the decreasing issuance over time.

---
Below are the reward schedule for a 1 EH difficulty Kaspa block:

<embed src="/files/kaspa-cross-mining-rewards.pdf" type="application/pdf" width="100%" height="600px" />

#### Golang Implementation

- https://github.com/canxium/go-canxium/blob/main/consensus/misc/cip0002.go#L177

<!-- ## Litecoin Merge Mining Rewards Proposal

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
::: -->