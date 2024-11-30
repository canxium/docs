# How to Mine Canxium Using Offline Mining Protocol

Canxium introduces an innovative offline mining protocol that allows miners to operate without continuous internet connectivity.
Mining Canxium through its "offline mining" method involves creating special mining transactions rather than blocks. This unique approach eliminates the dependency on continuous internet connectivity, allowing miners to operate independently from centralized pools or constant network interaction. Here's how the offline mining process works:

Here's how you can start:

### 1. Create a Special Mining Transaction
- Generate a mining transaction that contains your **proof of work (PoW)**. 
- The transaction does not require real-time blockchain synchronization.
- It encodes the mining work done offline.

### 2. Perform Proof-of-Work Offline
- Solve the PoW challenge by hashing data until the solution meets the required **difficulty target**.
- Use Canxium's supported **proof-of-work algorithms**, which are compatible with common mining hardware. (Only Ethash is supported at the present)

### 3. Submit the Mining Transaction
- Once you have a valid mining transaction, connect to the Canxium network and broadcast it for validation.
- Ensure you have a reliable wallet or client software to handle submissions.

### 4. Earn Mining Rewards
- If your transaction is validated, you'll receive mining rewards in Canxium coins ($CAU).
- The rewards are dynamically adjusted based on your transaction's difficulty.

### 5. Key Advantages of Offline Mining
- **Independence**: Miners operate without dependency on constant internet connectivity.
- **Sustainability**: Energy-efficient mining with better resource utilization.
- **Hardware Flexibility**: Supports multiple PoW algorithms for broader hardware compatibility.

# Mining Canxium: Pool vs. Independent Operation

Canxium's offline mining protocol ensures **fair mining**, allowing miners to solve proof-of-work challenges independently and submit results without continuous internet connectivity. Here are your two options for mining Canxium:

:::warning
When using a 3rd pool in Canxium's offline mining protocol, the mining reward will generally be less than mining independently
:::

## 1. Join a Pool Supporting Offline Mining
- **Fair Mining Principle**: Pools in Canxium’s offline protocol do not combine hashing power. Each miner operates independently and submits their individual proof-of-work solutions.
- **Role of the Pool**:
  - Acts as a service provider for transaction validation and submission.
  - Offers infrastructure to miners who prefer not to handle direct network interactions.
- **Fees**: Pools typically charge a small fee for handling submissions, which reduces miner rewards slightly.
- **Benefits**:
  - Simplifies the process of mining for users unfamiliar with managing direct submissions.
  - Offers a convenient solution for those who lack the resources to run their own nodes.

Currently, [GTPool](https://gtpool.io/) supports this protocol, simply connect your mining rig to this Pool

## 2. Run a Personal Pool or Mine Independently
- **Full Control**: Miners can operate their own infrastructure to validate and submit their mining transactions directly to the Canxium network.
- **No Fees**: By bypassing third-party pools, miners retain all earned rewards.
- **Infrastructure Requirements**:
  - A Canxium-compatible node or wallet capable of submitting mining transactions.
  - Adequate hardware for solving proof-of-work challenges using Canxium's supported algorithms.
- **Benefits**:
  - Maximum autonomy and reward retention.
  - Aligns with the decentralized philosophy of offline mining.

You have to start a pool by yourself using this Docker Image: [Open-Canxium-Pool](https://hub.docker.com/r/canxium/open-canxium-pool)

[Video Guide](https://www.youtube.com/watch?v=15kHFXmqtwg)