# Whitepaper {#whitepaper}

:::info You are reading the latest version of Canxium Whitepaper

- Updated on **Nov 6, 2024**.
- Version: v2.5
  :::
  
## Proof Of Stake {#pos}

Canxium’s Proof of Stake (PoS) consensus is similar to Ethereum’s but features key adjustments in parameters and unique validator incentives. Validators earn rewards by staking CAU tokens, participating in consensus, and securing the network.

<span style="background-color: #ff2d00"> In Canxium, validators also handle offline mining transactions, which provide an additional source of income. </span>

Here’s a breakdown of Canxium’s PoS structure, including staking rewards, slashing mechanisms, validator incentives, and the benefits of these features.

Key Parameters: *BaseRewardFactor* and *InactivityPenaltyQuotientBellatrix*

BaseRewardFactor: Canxium’s BaseRewardFactor is 512, compared to Ethereum’s 64. This factor influences the base staking reward for each validator. The higher factor means Canxium validators earn a larger base reward per staked CAU, making staking more attractive.

InactivityPenaltyQuotientBellatrix: Set to 4,194,304 in Canxium (versus Ethereum’s 16,777,216), this parameter governs the rate at which penalties accumulate when validators go offline or fail to participate in consensus. The lower quotient means higher penalties for inactivity, incentivizing validators to remain active and accountable.

## Staking Rewards
Staking Rewards Structure: Validators are rewarded with staking rewards but their balance will never exceed 320 CAU, distributed proportionally to each validator based on their staked CAU. This cap ensures predictability and controls inflation within the Canxium economy, maintaining sustainable rewards for validators.

## Offline Mining Rewards for Validators
In addition to standard staking rewards, Canxium introduces an extra reward layer by allowing validators to validate offline mining transactions submitted by miners:

<strong>Validation of Offline Transactions:</strong>

Validators verify the integrity of offline mining transactions submitted to the network. Upon validation, these transactions are included in the next block.

<strong>Additional Rewards:</strong>

Validators earn up to 15% of the total mining rewards associated with the offline transactions they validate. This reward is separate from their staking reward and incentivizes validators to process offline transactions.

This hybrid model allows validators to earn beyond the staking rewards cap (320 CAU) if they validate offline transactions, enhancing their earning potential.
Slashing and Penalty Mechanisms

Canxium has implemented slashing and penalty mechanisms to uphold network integrity:

<strong>Slashing for Malicious Activity:</strong>

Validators who engage in harmful actions, such as double-signing, risk losing a portion of their staked CAU, which deters bad behavior.

<strong>Inactivity Penalties:</strong>

If validators fail to participate in consensus due to downtime, they accrue penalties faster due to the lower InactivityPenaltyQuotientBellatrix. This system incentivizes high uptime and reliable performance.

## Benefits of Canxium’s PoS System
Canxium’s PoS model offers several advantages that bolster the network’s security, decentralization, and sustainability:

<strong>Enhanced Validator Incentives:</strong>

By combining staking rewards with offline mining rewards, Canxium creates a dual incentive model that encourages validators to both stake CAU and actively validate transactions, increasing their engagement and potential earnings.

<strong>Energy Efficiency:</strong>

PoS is significantly more energy-efficient than Proof of Work (PoW), as rewards are based on staked tokens rather than computational power.

<strong>Network Reliability and Accountability:</strong>

Stricter inactivity penalties ensure validators maintain high performance, contributing to network reliability.

<strong>Economic Stability and Controlled Inflation:</strong>

The 320 CAU balance cap prevents excessive inflation, maintaining a balanced token economy. The additional 15% offline mining reward is controlled and distributed in line with validated transactions, preserving Canxium’s long-term sustainability.

Decentralization: By allowing both validators and offline miners to contribute to the network, Canxium fosters inclusivity and decentralization, as a broader range of participants can earn rewards.

## Summary
Canxium’s PoS system combines staking rewards with offline mining validation incentives, establishing a balanced and sustainable ecosystem. With increased rewards for active participation and strict penalties for inactivity, Canxium’s design prioritizes network security, reliability, and economic stability, encouraging validators to engage in staking and transaction validation actively. This unique setup makes Canxium a decentralized, efficient, and secure blockchain with a robust reward structure.
