# Whitepaper {#whitepaper}

:::info You are reading the latest version of Canxium Whitepaper

- Updated on **Nov 6, 2024**.
- Version: v2.5
  :::
  
## Proof Off Work (Offline Mining) {#pow}

The Canxium blockchain launched with a Proof of Work (PoW) consensus mechanism, with plans to transition to Proof of Stake (PoS) in July 2024. Initially, blocks will be secured and finalized using the Ethash algorithm, and mining will serve as the sole method for generating new Canxium coins. However, even after the switch to PoS, coin generation will continue through a process called offline mining.

At Canxium, we believe that coins should not be created without effort or resources, and while PoW is essential for bootstrapping the network and securing the initial chain, it should not be the primary, long-term method of sustaining the blockchain. To protect the environment, the chain will ultimately operate with an energy-efficient PoS consensus, where validators create and validate blocks while miners continue generating new coins through offline mining transactions. This hybrid approach balances sustainability with the need for a fair coin creation process.

In a PoS environment, validators will handle block creation and validation, while miners will still play an essential role by broadcasting offline mining transactions to validators to mint new Canxium coins. This structure leverages the security of PoS while preserving a vital role for PoW mining. Let’s explore the concept of offline mining in detail to understand how it contributes to Canxium’s unique coin generation model.

## Introduction

Offline mining is a key innovation within the Canxium blockchain, enabling miners to generate CAU without requiring a continuous internet connection. By tying mining rewards to the mining difficulty, Canxium has successfully decoupled the mining process from block generation. This separation allows miners to work on predefined transactions with targeted difficulty, without depending on real-time network data.

With this approach, Canxium makes mining accessible to a broader user base, allowing more participants to contribute regardless of internet availability. Additionally, this method significantly enhances the blockchain’s energy efficiency by reducing the need for constant online engagement, thus making Canxium’s network more sustainable. This advancement not only broadens the inclusivity of mining but also represents a leap forward in eco-friendly cryptocurrency operations.

In the following section, we explore the offline mining process in depth, highlighting how it aligns with Canxium’s goals of increased accessibility and sustainability.

## Mining Process
a. Choosing Mining Difficulty: In Canxium’s offline mining model, the first step for miners is selecting a mining difficulty level. Miners have the flexibility to choose their desired difficulty, with higher difficulty levels yielding greater rewards per transaction but requiring more time to complete. Conversely, selecting a lower difficulty results in quicker transaction processing but yields a smaller reward. Over time, however, the final total reward tends to equalize regardless of difficulty choice, allowing miners to tailor their efforts according to the capabilities of their equipment.

b. Generating a Mining Transaction: Once the desired difficulty is chosen, offline miners generate a unique mining transaction to initiate the mining process. This specialized transaction is distinct from standard blockchain transactions and includes key mining information, such as the chosen difficulty and mining algorithm. This data is essential for validating the transaction, as it signals the miner’s intent and the parameters they are working within for the current transaction.

This process allows Canxium miners to participate in coin generation on their own terms, optimizing both efficiency and accessibility within the network.

Here's a structured breakdown of the Mining Transaction (Type 0x3) in Canxium:
```js
Type: '0x3',
ChainID: 3003,
Nonce: 0,
GasTipCap: 0,
GasFeeCap: 0,
Gas: 100000,
From: '0x690b9a9e9aa1c9db991c7721a92d351db4fac990',
To: '0x6c6331CA2BC039996E833479b7c13Cc62Ab5c6BA',
Value: 45200000000000000,
Data:
'0x819232400000000000000000000000005240e646168c56f4cedd389bbd38a7428fb3667f',
Algorithm: 1,
Difficulty: 10000000000000,
MixDigest:
'0x0000000000000000000000000000000000000000000000000000000000000000',
PowNonce: 0,
```

### Mining Transaction (Type 0x3) Fields

- **Type**:  
  - Defines the transaction as a mining transaction of type `0x3`.

- **ChainID**:  
  - Specifies the network chain, with `3003` representing Canxium’s mainnet.

- **Nonce**:  
  - Unique sequence number for the mining account to prevent duplicate transactions.

- **GasTipCap**:  
  - Priority fee per gas. Mining transactions are gas-free, so this is set to zero.

- **GasFeeCap**:  
  - Maximum gas fee, equal to `GasTipCap`, as mining transactions are exempt from gas costs.

- **Gas**:  
  - Gas limit for smart contract interaction. For mining transactions, this may reach **57,759 Gas**.

- **From**:  
  - Mining address, which must match the transaction signer’s address to prevent replay attacks.

- **To**:  
  - Address for the mining contract specified in the genesis file; required for transaction success.

- **Value**:  
  - Mining reward, calculated as `Difficulty * 4250`, based on the selected mining difficulty.

- **Data**:  
  - Contains input data for the smart contract. Includes:
    - `0x8192324` as the function trigger.
    - `5240e646168c56f4cedd389bbd38a7428fb3667f` as the receiver address for the reward.

- **Algorithm**:  
  - Specifies the mining algorithm. `1` represents **Ethash**, currently the only supported algorithm.

- **Difficulty**:  
  - The selected difficulty level, which impacts the mining reward and completion time.

- **MixDigest**:  
  - Hash produced by the **Hashimoto** algorithm, set upon finding a random number that meets the difficulty.

- **PowNonce**:  
  - Random number that, together with `MixDigest`, satisfies the chosen difficulty using the Hashimoto algorithm.

This structured transaction ensures a secure, verifiable process for Canxium's offline mining model.

c. Transaction Identification:

Transaction identification is essential for verifying the authenticity of mining activities on the Canxium blockchain. This identification encapsulates multiple transaction elements to ensure that any alteration, even minor, produces a unique transaction hash. This stringent identification mechanism secures the network against tampering and fraudulent transactions, maintaining the integrity and trustworthiness of Canxium’s ecosystem.

d. Dataset Generation (Ethash Only):

In the Ethash algorithm, dataset generation is a foundational step. For traditional block mining, datasets are based on the block number. However, in Canxium’s offline mining, datasets are generated from the miner’s account nonce. This allows offline miners to use the Ethash algorithm without requiring real-time blockchain synchronization, enabling efficient, independent mining while maintaining compatibility with Canxium’s decentralized model.

e. Mining Process:

In the mining phase, miners search for a valid Proof of Work (PoW) nonce that satisfies the difficulty requirements. Once a valid nonce is found, the mining transaction is broadcast to the Canxium blockchain. Validators then verify and confirm this transaction, sealing it into the next block. As a result, new CAU coins are generated as mining rewards. These rewards are distributed among offline miners, validators, and Canxium’s foundation funds, creating an inclusive reward-sharing model that supports ecosystem growth and sustainability.

The seamless integration of offline mining into Canxium’s blockchain reflects our commitment to inclusivity, environmental responsibility, and fostering decentralized participation. By enabling miners to operate independently of continuous network connectivity, Canxium opens the door for a broader range of participants. This approach not only minimizes energy consumption but also aligns with our mission to create a sustainable and accessible blockchain ecosystem that empowers all contributors.
