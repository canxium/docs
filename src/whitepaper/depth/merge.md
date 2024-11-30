# Whitepaper {#whitepaper}

:::info You are reading the latest version of Canxium Whitepaper

- Updated on **Nov 22, 2024**.
- Version: v2.5.1
  :::

:::warning

The merge-mining protocol is still in the research and development phase, and all the information below is subject to change or further updates in the future.

:::

## What is Merge-Mining?

**Merge-mining** is a process that allows miners to use the computational work from one blockchain’s proof-of-work (PoW) algorithm to simultaneously contribute to another blockchain. This enables miners to efficiently mine two (or more) blockchains without incurring additional computational costs.

Traditionally, merge-mining is used to secure smaller or newer blockchains by leveraging the hashing power of an already established and secure blockchain. However, **Canxium** introduces a novel twist: instead of focusing on blockchain security, Canxium’s merge-mining centers around **creating new tokens** as evidence of completed PoW workloads.

## Traditional Merge-Mining: An Overview

In traditional merge-mining setups:  
- **Single PoW Problem:** Miners solve a PoW problem that satisfies the difficulty requirements of both blockchains.  
- **Shared Headers:** Miners include the block headers of both blockchains in their computational work, ensuring compatibility.  
- **Dual Validation:** Blocks are submitted to and validated by both blockchains independently, with miners receiving rewards from each network.  

This method is primarily designed to enhance the security of smaller blockchains while maximizing miners' efficiency.

## Canxium Merge-Mining: Unlocking Cross-Chain Synergy  

Canxium redefines merge-mining by focusing on **token creation** rather than blockchain security. Its innovative approach leverages the computational power of other PoW blockchain miners, particularly those in the Litecoin network, to generate **CAU coins** as proof of completed workloads. 

### Key Features of Canxium’s Approach:
- **Token-Centric:** Each CAU coin represents a tangible PoW workload, enhancing the intrinsic value of the Canxium ecosystem.  
- **Cross-Chain Collaboration:** Canxium creates a symbiotic relationship between its ecosystem and other PoW miners, fostering collaboration and growth across blockchains.  
- **Offline Mining Mechanism:** Unlike traditional setups, Canxium integrates a transaction-based validation process (type 0x4 transactions) linked to external PoW results, such as Litecoin blocks.

This reimagined merge-mining model transforms the process from a **security-focused** mechanism to a **decentralized token-generation system.**

## Key Differences: Traditional vs. Canxium Merge-Mining

| **Aspect**                | **Traditional Merge-Mining**                               | **Canxium Merge-Mining**                                                                 |
|----------------------------|-----------------------------------------------------------|------------------------------------------------------------------------------------------|
| **Primary Purpose**        | Enhance blockchain security                                | Generate CAU coins as proof of completed PoW workloads                                  |
| **Mechanics**              | Solve a single PoW problem for both blockchains            | Integrate external PoW results into Canxium’s PoW validation via type 0x4 transactions   |
| **Rewards**                | Native tokens from both blockchains                       | CAU coins based on external PoW difficulty                                             |

## Why Merge-Mining Matters  

#### 1. **Cost Efficiency for Miners**  
Merge-mining allows miners to maximize the value of their computational work without increasing energy consumption or infrastructure costs.

#### 2. **Ecosystem Expansion**  
By bridging blockchains, merge-mining introduces miners and users from established ecosystems (e.g., Litecoin) to emerging blockchains like Canxium, fostering collaboration and growth.

#### 3. **Proof of Workload Contribution**  
Merge-mining directly ties token creation to measurable computational efforts. Each CAU token represents a fair and verifiable PoW workload, enhancing trust in the system.

#### 4. **Decentralized Token Creation**  
This method ensures a decentralized and equitable generation of CAU tokens, with each token carrying intrinsic computational value backed by completed PoW tasks.

#### 5. **Attracting Miners**  
Merge-mining offers an easy onboarding process for miners from established networks like Litecoin. With no additional resources required, it becomes an attractive option, especially during Canxium’s growth phase.

#### 6. **Scalable Token Supply**  
The token supply dynamically adjusts based on miners' computational contributions, creating a scalable and adaptive reward mechanism.

#### 7. **Cross-Chain Collaboration**  
By integrating with Litecoin, Canxium fosters interoperability, innovation, and shared adoption between ecosystems, encouraging long-term ecosystem synergy.

By shifting the focus of merge-mining from security to token creation, Canxium redefines the potential of PoW-based systems, driving innovation and cross-chain synergy.

## Why Merge-Mining with Kaspa & Litecoin?

Kaspa: Kaspa’s innovative architecture and newer ecosystem could provide a more experimental and flexible environment.
Advantages:
  - Aligned Philosophy: Kaspa’s blockDAG architecture emphasizes scalability and decentralization, aligning with Canxium’s offline mining ethos. This synergy might attract tech-savvy miners or developers.
  - Emerging Market: As a newer blockchain, Kaspa miners might be more open to experimenting with Canxium, increasing participation rates for new coin creation.
  - Flexibility for Offline Mining: Kaspa’s innovative infrastructure could better accommodate unique aspects of Canxium, such as offline mining and proof-of-demand mechanisms.

Litecoin: Merge-mining with Litecoin presents a unique opportunity to expand Canxium’s ecosystem by leveraging Litecoin’s robust Proof-of-Work network. Litecoin’s established infrastructure, widespread adoption, and consistent hash rate provide a reliable foundation for introducing additional computational tasks without disrupting its primary blockchain operations.

After successfully integrating merge-mining with the Kaspa and Litecoin blockchain, we plan to expand further by enabling merge-mining with additional blockchains. Our goal is to incorporate their mining algorithms into Canxium's offline mining framework, fostering greater interoperability and innovation across ecosystems.

## Conclusion
Merge-mining with Canxium is a forward-thinking approach that redefines how blockchains leverage PoW workloads. By partnering with Litecoin’s robust mining community, Canxium creates a cost-efficient, decentralized, and scalable process for CAU generation. This strategy not only benefits miners but also fosters the growth of Canxium’s ecosystem, laying the foundation for future cross-chain interoperability and innovation.

Does merge-mining entirely replace Canxium's existing offline mining mechanism? Absolutely not. Instead, it serves as a foundational step toward integrating new mining algorithms into the offline mining process. Skipping the merge-mining phase and immediately adopting algorithms like Scrypt or SHA-256 into offline mining would likely deter miners due to the currently limited profitability of such an approach.

Merge-mining acts as a bridge, designed to attract the interest and participation of miners from other PoW chains by offering immediate incentives while leveraging their existing infrastructure. This phase is critical for building engagement and fostering a robust mining community. Once the ecosystem reaches sufficient maturity and conditions become more favorable, these algorithms can be seamlessly integrated into Canxium's offline mining system, thereby concluding the merge-mining phase and transitioning to a fully optimized mining framework.