# Whitepaper {#whitepaper}

:::info You are reading the latest version of Canxium Whitepaper

- Updated on **Nov 6, 2024**.
- Version: v2.5
  :::
  
## Canxium Proof of Stake (PoS) Reward Structure:
Here’s a comprehensive breakdown of the staking rewards and offline mining rewards within the Canxium blockchain, considering the important points:

### Staking Rewards

Base Reward Calculation (Staking Reward):

The Base Reward for staking is calculated based on the BaseRewardFactor (512) and the effective balance of the validator, similar to how Ethereum calculates rewards but with adjusted parameters. The formula for staking reward calculation remains as follows:

```base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))```


where *base_reward_factor* is 512, *base_rewards_per_epoch* is 4 and sum(active balance) is the total staked CAU across all active validators.
​
<strong>Penalty Calculation:</strong>

If the validator is inactive (offline), they will incur a penalty based on their effective balance and the *InactivityPenaltyQuotientBellatrix*  is 4,194,304, making penalties accumulate faster than Ethereum’s value

<strong>Total Staking Reward (after penalty and cap):</strong>

After calculating the Base Reward and Penalty, we adjust the staking reward based on the 320 CAU cap.

```Net Staking Reward = min(Base Reward − Penalty, 320 CAU − Effective Balance of Validator)```

The effective balance of the validator is key here — if the validator’s balance is close to the 320 CAU cap, the staking reward will be adjusted to ensure it doesn’t exceed this value after penalties are applied.

For example, if a validator has an effective balance of 310 CAU, and their pre-penalty staking reward is 400 CAU, after applying the penalty (50 CAU), the net staking reward will be limited to 10 CAU to keep the total reward below 320 CAU.

<strong>Reward Cap:</strong>

After applying penalties, the net staking reward will never exceed 320 CAU per validator. This cap applies only to the staking reward, and it ensures a limit on inflationary staking payouts.

<strong>Offline Mining Rewards (Separate and Uncapped):</strong>

Validators in Canxium also validate offline mining transactions, which are separate from staking rewards. They receive 15% of the total mining rewards generated from these offline transactions. These rewards are not capped by the 320 CAU cap.

```Offline Mining Reward = 0.15 × Total Mining Rewards of Validated Offline Transactions```

This means validators can earn additional rewards from offline transaction validation without any cap, further incentivizing them to actively participate in the network.

<strong>Final Total Reward Calculation per Validator:</strong>

The final total reward a validator receives in Canxium consists of:

Net Staking Reward: Calculated based on the staking reward formula, capped at 320 CAU after applying any penalties.

Offline Mining Reward: Earned from validating offline mining transactions, with no cap.

Thus, the total reward per validator for a given block is:

```Total Validator Reward = Net Staking Reward + Offline Mining Reward```

### Example Calculation
Assumptions:
```
Effective Balance of Validator: 310 CAU

Base Reward (before penalty): 400 CAU

Offline Mining Reward: 100 CAU

Penalty for Inactivity: 50 CAU
```

Step-by-Step:

Pre-Penalty Staking Reward: 400 CAU

Penalty Applied: 

400 − 50 = 350  CAU

Net Staking Reward:

The validator’s total staking reward must not exceed 320 CAU (due to the effective balance of 310 CAU):

```Net Staking Reward = min(350 CAU, 320 CAU−310 CAU)= min(350 CAU, 10 CAU) = 10 CAU```

Final Total Reward for Validator:
```
Net Staking Reward = 10 CAU
Offline Mining Reward = 100 CAU
```

```Total Validator Reward = 10 CAU (Staking) + 100 CAU (Offline Mining) = 110 CAU```

### Summary:

Staking Rewards are calculated using a formula similar to Ethereum's, but adjusted with Canxium’s parameters. After penalties, the net staking reward is capped at 320 CAU for each validator, ensuring no excessive rewards.

Offline Mining Rewards are paid separately and are not capped, allowing validators to earn beyond the staking reward cap.

The total reward a validator receives is the sum of the net staking reward (capped at 320 CAU) and the full offline mining reward, ensuring a balanced and incentivized system for validators.

This structure supports a sustainable reward system, where validators are incentivized both for staking and for validating offline transactions, while maintaining control over inflation with the 320 CAU cap on staking rewards.
