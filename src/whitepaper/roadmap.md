# Whitepaper {#whitepaper}

:::info You are reading the latest version of Canxium Whitepaper

- Updated on **Nov 6, 2024**.
- Version: v2.6
  :::

# Canxium’s Roadmap: Strategic Milestones

Canxium’s journey is guided by a comprehensive **roadmap** that outlines our strategic milestones and development trajectory. The roadmap below highlights key stages in Canxium’s evolution.

## **Phase 1: Foundation and Development (2023–2024)**

- **5/2023**: Launch of Canxium mainnet.
- **8/2023**: Launch Cerium testnet to test the Hydro fork and Retained PoW mining.
- **5-6/2024**: Mainnet Hydro hardfork.

## **Phase 2: Hybrid Chain - PoS + PoW [Retained PoW Mining] (2024)**

The difficulty-based reward system is an innovative idea, but it has certain drawbacks, which we are fully aware of. One significant downside is its potential negative impact on the network's safety. With low demand, miners may lose the incentive to continue contributing their mining power to secure the network. As a result, **separating coin mining from chain operation** has become an urgent and critical issue.

- **PoS Mechanism**: Canxium will inherit Ethereum’s **Proof of Stake (PoS)** mechanism to save on development time and costs. However, the PoS rewards system will undergo modifications. PoS rewards will only be distributed if a validator’s balance drops below **320 CAU** due to penalties. This mechanism ensures that validators remain active within the network and helps prevent situations where their balances continually decrease due to penalties.

- **PoS Rewards Distribution**: The main source of PoS rewards will come from **Retained PoW mining**. Validators will share **15%** of the mining rewards with miners.

### Updated Roadmap

More than a year has passed with many difficulties and events. Nevertheless, Canxium has realized its initial vision of creating a new blockchain with new core values, such as:

- **Retained PoW Mining**
- **Stable Mining Costs**
- **A blockchain with a supply that adjusts to market demand**

At the same time, we have successfully implemented all three consensus algorithms in a single blockchain, which is unprecedented. No project has accomplished this: **Proof of Work**, **Proof of Demand**, and **Proof of Stake**.

Thus, we have successfully completed our first mission beyond expectations. It is time for us to take another step forward and present the next vision for Canxium, focusing on building a **complete ecosystem** and moving toward **full decentralization** of this blockchain. The Canxium Labs will become an organization aimed at realizing ideas & missions initiated and approved by the community of CAU stakeholders. This is the next mission and vision we are striving for until we achieve it.

---

As mentioned, the next vision is to build an ecosystem and community. Therefore, the roadmap below will revolve around this vision, divided into three main phases:

## **Transition Phase: Introduce $OFF (Q4–2024)**

This transition phase will focus on addressing outstanding issues from before, including the following:

- **Release of the OFF token** on Canxium.
- Maintenance and upgrades of the **Canxium swap platform** and **wallet**.
- **Development of a new Canxium website**.
- Increase the minimum mining difficulty from **500 GH to 5 TH** once the total number of mined transactions reaches **50 million**. The purpose of raising the difficulty is to reduce the number of mined transactions and alleviate network congestion; it does not impact miners.
- **Launch an Retained PoW mining competition**: Celebrating miners who set up the most impressive fully Retained PoW CAU mining environment. Rewards include both **CAU** and **OFF**.
- **Complete integration** of the Canxium network into the **Tangem wallet**.

---

## **Phase 3: Ecosystem Development (Q1 2025 — Q4 2025)**

- **dApp Development Toolkit**: Release a toolkit and documentation to help developers easily build dApps on Canxium.
- **Marketplace for dApps**: Introduce a centralized marketplace for discovering and using dApps built on Canxium.
  - Implement **user ratings** and reviews for quality assurance.
- **Crowdfunding Platform**: Build a crowdfunding platform on Canxium, allowing startups to raise funds through token sales, connecting investors with innovative projects.
- **Hackathons**: Launch hackathons to encourage innovative dApp development.
- **More Wallet**: Collaborate with other wallets to officially support the Canxium network.

---

## **Phase 4: User Engagement and Adoption (Q1 2026 — Q4 2027)**

- **Cross-Chain Functionality**: Expand the existing bridge to connect with other blockchain networks beyond Ethereum, facilitating the transfer of assets between blockchains easily, securely, and quickly.
- **Incentive Program**: Implement reward programs for users participating in the network and using dApps. Programs will include **referral bonuses**, and **community challenges** to drive engagement.
- **Staking Program**: Users can stake any amounts of **CAU** and receive rewards from validators as well as from dApps built on Canxium. Rewards will be distributed in various tokens or assets, not just the native token.
- **Educational Initiatives**: Roll out webinars, tutorials, and documentation to onboard new users and developers.
- **Launch CNS**: Canxium Name Service.
- **Launch COF**: Canxium Official Forum (low priority).
- **Launch CRS**: Research and integrate AI to build a **user wallet address ranking system** based on transaction history, CAU holding, and interaction history. This ranking will assess future airdrop eligibility and other programs.

---

## **Phase 5: Full Decentralization and Future Growth (2028 and Beyond)**

#### **Transition to Community Governance**
- **Fully decentralize decision-making**, empowering the community to lead initiatives.
- Establish a **transparent process** for proposal submissions and voting.

#### **Ongoing: Continuous Innovation**
- Implement **regular updates** based on community feedback and emerging trends.
- Research feasible solutions to **expand the network**.
- **Integrate new mining algorithms** into Retained PoW mining.
- **Upgrade transaction processing capabilities** to achieve **1k-1.2k TPS** (Max Theoretical TPS).
- Study the feasibility of **decreasing mining rewards annually** to align with USD inflation.
- Research the creation of a **hedge fund** to acquire CAU when the price falls below the average mining cost and vice versa.

---

## Cross-Chain Mining (12/2024 - Q2/2025) {#kaspa-merge-mining}


### **Phase 1: Research and Planning**
1. **Analyze Kaspa’s Mining Protocol**
   - Review Kaspa’s block structure, `kHeavyHash` algorithm, and network behavior.
   - Understand how Kaspa implements its difficulty adjustment, block validation, and reward distribution.

2. **Define Integration Scope**
   - Determine how Canxium will validate Kaspa’s blocks in its Retained PoW mining protocol.
   - Decide whether Kaspa blocks will be stored entirely or partially within Canxium blocks.

3. **Community Engagement**
   - Share initial plans and gather feedback from the Canxium and Kaspa communities.

### **Phase 2: Development and Testing**
1. **Proof-of-Concept Development**
   - Implement a basic mechanism for Canxium to accept and validate Kaspa blocks.
   - Create a lightweight integration layer for the `kHeavyHash` algorithm within Canxium's framework.

2. **Retained PoW Mining Adaptation**
   - Integrate Kaspa block data into Canxium’s Retained PoW mining protocol.
   - Test scenarios for how Retained PoW mining workflows will incorporate Kaspa’s data.

3. **Testnet Deployment**
   - Deploy the updated Canxium node software on a dedicated testnet.
   - Simulate mining with Kaspa blocks to debug any technical or performance issues.

---

### **Phase 3: Pre-Launch Preparations**
1. **Audit and Code Review**
   - Conduct thorough security audits of the integration code.
   - Review compatibility with existing Canxium and Kaspa consensus mechanisms.

2. **Finalize Reward Mechanisms**
   - Define how Kaspa miners will be incentivized for contributing valid blocks.
   - Publish the details of Kaspa miner rewards to the community.

3. **Documentation**
   - Update Canxium’s documentation to include details about cross-chain mining with Kaspa.
   - Provide clear instructions for miners to enable and participate in the integration.

4. **Community Announcement**
   - Share the final launch date and miner reward structure.
   - Provide updates through social media, Medium.

---

### **Phase 4: Official Launch**
1. **Mainnet Deployment**
   - Roll out the updated Canxium software to the mainnet.
   - Activate cross-chain mining functionality with Kaspa.

2. **Community Support**
   - Monitor the network closely for any unforeseen issues.
   - Provide technical support to miners during the initial phase.

---

### **Phase 5: Post-Launch Optimization (Ongoing)**
1. **Performance Monitoring**
   - Track mining efficiency and ensure the stability of the integration.

2. **Expand Partnerships**
   - Promote cross-chain mining benefits to other blockchains and projects.
   - Begin planning for Litecoin integration after Kaspa’s success.

3. **Iterative Improvements**
   - Gather miner feedback and improve cross-chain mining functionality over time.

---

### **Projected Timeline**
| **Phase**               | **Duration**         |
|--------------------------|----------------------|
| Research and Planning    | 1-2 weeks           |
| Development and Testing  | 4-6 weeks           |
| Pre-Launch Preparations  | 4-6 weeks           |
| Official Launch          | 1-2 weeks           |
| Post-Launch Optimization | Ongoing             |

:::warning
The timeline above is only an estimate; the actual timeframe may vary depending on the nature and complexity of the mining integration.
:::

---

By prioritizing Kaspa first, this roadmap ensures a smooth integration that showcases the benefits of cross-chain mining for both Canxium and Kaspa communities.


## **Summary**

In summary, Canxium is still a young blockchain with a limited team and resources, facing increasing competition. Therefore, its next focus is to maximize resources for ecosystem development and user expansion. This is a key factor in ensuring Canxium’s survival and growth, ultimately aiming to create a **sustainable blockchain** and a **reliable digital currency**.

You have also seen what we have achieved during this time. The **Retained PoW mining mechanism** operates very stably and securely. The **supply’s flexibility** according to the market has helped slow down the market downturn when emissions are paused. Miners temporarily halt their operations when the price drops below the fixed mining cost, contributing to greater **stability** and **reliability** compared to typical PoW coins.

We truly believe that the path we have chosen, which is completely different from the rest of the world, is the right direction. **Reliability, stability, fairness,** and **true decentralization** will be the core values that bring prosperity to this young blockchain industry.
