# Whitepaper {#whitepaper}

:::info You are reading the latest version of Canxium Whitepaper

- Updated on **Jan 26, 2025**.
- Version: v2.6
  :::

# **Canxium Cross-Chain Retained PoW: Comprehensive Technical Documentation**

This document provides an in-depth look into the Canxium  Cross-Chain Retained PoW mining mechanism, including the transaction format, verification process, smart contract implementation, and consensus layer interactions.

## Overview of  Cross-Chain Retained PoW

 Cross-Chain Retained PoW mining enables miners to contribute computational work on another blockchain (e.g., Kaspa) and submit proof-of-work (PoW) to Canxium via a specific transaction type. This mechanism rewards miners with CAU tokens based on the difficulty of the submitted PoW, ensuring compatibility with supported chains and rewarding effort proportionately.

##  Cross-Chain Retained PoW Mining Transaction Format

A valid  Cross-Chain Retained PoW mining transaction contains the following key fields:
- **type**: Type of transaction, specific to cross-chain PoW mining ("0x7e").
- **Value (`value`)**: The reward amount calculated as `reward per difficulty * difficulty`.
- **Input Data (`data`)**: Encoded in the format of the `crossChainMining(address,uint16,uint256)` method:
  - Method signature: `0x2979ee24`
  - `receiver` padded to 32 bytes
  - `chain` (16-bit, padded to 32 bytes)
  - `timestamp` (256-bit, padded to 32 bytes)
- **auxPoW**: Sidechain Block details (Depending on the parent blockchain, this is the structure for the Kaspa blockchain)
  - `header`: Block header
  - `merkleProof`: Merkle tree path to verify coinbase hash if it is included in the hashMerkleRoot
  - `coinbase`: Coinbase transaction

Example of a valid Cross-Chain Retained PoW mining transaction with Kaspa:

```
{
    "type": "0x7e",  // Type of transaction, specific to Cross-Chain Retained PoW mining.
    "nonce": "0x0",  // Transaction nonce for ordering.
    "gasPrice": "0x0",
    "maxPriorityFeePerGas": "0x0",  // Priority fee per gas, set to zero in this case.
    "maxFeePerGas": "0x0",          // Maximum fee per gas, also zero.
    "gas": "0x186a0",               // Gas limit for transaction execution.
    "value": "0x199d52",            // Amount of CAU rewarded (if applicable).
    "input": "0x2979ee2400000000000000000000000052b2237abb643a8edacc9b66d56e92b09f22847c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000001949cda37c4",
    "to": "0x5fd4e99dc1efc12ebe5c5530d6c7b3860c819f9d",          // Address to which the transaction is sent.
    "chainId": "0x765f",            // Chain ID for Canxium network.
    "from": "0x0d9947ea33c2b889e60f1a9528ba10ddfff2873f",        // Canxium address submitting the transaction.
    "algorithm": "0x4",             // Identifier for the PoW algorithm (e.g., KASPA is KHeavyHashAlgorithm).
    "v": "0x0",                     // Signature recovery parameter.
    "r": "0xd4c4a14c...",           // Signature part R.
    "s": "0x6d864e29...",           // Signature part S.
    "auxPoW": {                     // Cross-Chain Retained PoW proof data.
        "header": {                 // KASPA block header details.
            "hashMerkleRoot": "1889a71902ad5690fb50c4da57cac0903854df4529f5516834f9e76b4ca29d4a",       // Merkle root of all transaction hashes in the block.
            "acceptedIDMerkleRoot": "e9cda391a73433f1e92ad526565c02c43f618fe3ca43e94db50dbf0453712a92", // Merkle root of accepted transaction IDs.
            "utxoCommitment": "8bb48234f2069009c844e30f49b63942ecb65133eb71fd86596675beb10eda45",      // UTXO set commitment for the block.
            "timestamp": 1737798334404,           // Block timestamp (in milliseconds).
            "bits": 503480227,                    // Difficulty target in compact format.
            "nonce": 12947157943426607992,        // Nonce value used to solve PoW.
            "daaScore": 85179021,                 // Difficulty adjustment algorithm score.
            "blueScore": 84078766,                // Blue score (related to KASPA's GHOSTDAG protocol).
            "blueWork": 1066184383663824,         // Total work in the blue chain.
            "pruningPoint": "5fc745cb165c3248192c1bd0a6eba8d6e0a610fe37a1ec0baec597b61d0be059"         // Pruning point hash for the block.
        },
        "merkleProof": [            // Proof of inclusion in the Merkle tree. To verify the coinbase transaction if it is included in the hashMerkleRoot
            "bc000bf497e2938e05f653939ae059f2655169e8a7ba13fa1e2fc01b4cdb1d6c",
            "4ba19df7e33fbc4abe8557234632cc7c8e9c8781e8193835a1bd288ef3ed3e78"
        ],
        "coinbase": {               // Coinbase transaction details.
            "version": 0,
            "inputs": [],
            "outputs": [
                {
                    "value": 10000152200,         // Output value in smallest unit (e.g., satoshis).
                    "scriptPublicKey": {
                        "script": "ICIkke0D9XimemIKJLb0En4quZc7PKjZdY0qDeBHQnmwrA==", // Output script (e.g., P2PKH).
                        "version": 0
                    }
                },
                {
                    "value": 9799885899,
                    "scriptPublicKey": {
                        "script": "OToT08G3en7GQ73vjN2BVDIUXqpu040J1uhMyrIrA==",
                        "version": 0
                    }
                }
            ],
            "lockTime": 0,
            "subnetworkID": "0100000000000000000000000000000000000000",       // Subnetwork ID (specific to KASPA).
            "gas": 0,
            "payload": "rvACBQAAAABLZB5IAgAAAAAAIiDlJdHnIzAlzkEQ4u+UrPbxrBqmpjcFv7GGm3mCWl+6CKwwLjE2LjAvTkVPL2NhbnhpdW1pbmVyOjUyYjIyMzdhQkI2NDNhOEVkYUNjOUI2NkQ1NkU5MkIwOUYyMjg0N2M=",       // Coinbase payload (includes canxium miner address).
            "fee": 0,
            "mass": 0
        }
    }
}
```

## Cross-Chain Retained PoW Mining Transaction Verification

The verification of a Cross-Chain Retained PoW mining transaction in the consensus layer involves:

1. **Validate Transaction Structure:** 
  - Ensure the AuxPoW field is a valid block.
  - Ensure the `data` field matches the expected structure for the `crossChainMining` method, including padding and encoding.
2. **Verify Proof of Work:**
   - The submitted PoW must meet the minimum difficulty threshold.
   - Check that the PoW is valid and corresponds to the parent chain specified in the transaction.
3. **Verify coinbase transaction**: Confirm that the coinbase is valid and it's hash is included in the `hashMerkleRoot`.
3. **Validate Receiver Address:** Confirm that the `to` address matches the predefined mining smart contract address.
4. **Timestamp Validation:**
   - Retrieve the last recorded timestamp from the Canxium state database for the `receiver` and `chain`.
   - Ensure the submitted `timestamp` is strictly greater than the stored value.
5. **Value Validation:** Confirm that the reward value (`msg.value`) matches the calculated reward based on difficulty and the current decay factor.
6. **Smart Contract Call:** The transaction calls the `crossChainMining` function of the mining contract, distributing rewards accordingly.

---

## Cross-Chain Retained PoW Mining Reward Mechanism

The reward is distributed among the miner, treasury, and block proposer (coinbase) as follows:

#### Reward Distribution Formula

- **Miner Reward**: `reward = msg.value - fundReward - coinbaseReward`
- **Treasury Reward**: `fundReward = msg.value * treasuryTax / 100`
- **Coinbase Reward**: `coinbaseReward = msg.value * coinbaseTax / 10000`

The reward values are validated within the smart contract to ensure correctness. The contract emits events for each reward distribution:

- `CrossChainMiningReward` for miner rewards.
- `CrossChainMiningTaxes` for treasury and coinbase rewards.

## Mining Smart Contract

The `crossChainMining` function handles reward distribution and updates miner timestamps. Key elements include:

1. **Validation Checks:**
   - Ensure `msg.value > 0`.
   - Verify `chain > 0`.
   - Confirm `timestamp > crossChainMiningTimestamp[receiver][chain]`.
   - Validate treasury tax is set.
2. **Reward Distribution:**
   - Transfer miner, treasury, and coinbase rewards.
   - Emit appropriate events for logging.
3. **Timestamp Updates:**
   - Update `crossChainMiningTimestamp[receiver][chain]` to the new `timestamp`.

## Smart Contract Code
```solidity
/** 
* @dev crossChainMining distribute reward to foundation, coinbase and tx miner in the Cross-Chain Retained Proof of Work
* @param receiver Miner receiver address
* @param chain Source chain Id
* @param timestamp Timestamp of the block
*/
function crossChainMining(address receiver, uint16 chain, uint256 timestamp) public payable {
    require(msg.value > 0, "invalid mining value");
    require(chain > 0, "invalid mining chain id");
    require(timestamp > crossChainMiningTimestamp[receiver][chain], "invalid mining timestamp");
    
    if (chain == KASPA_CHAIN) {
        kaspaMiningRewardDistribution(receiver);
    }

    crossChainMiningTimestamp[receiver][chain] = timestamp;
}

function kaspaMiningRewardDistribution(address receiver) public payable {
    address payable to = payable(receiver);
    address payable coinbase = payable(block.coinbase);

    uint256 crossChainMiningCoinbaseTax = coinbaseRewardPercentage(block.timestamp);

    require(crossChainMiningTreasuryTax > 0, "invalid mining treasury tax");
    require(crossChainMiningCoinbaseTax > 0 && crossChainMiningCoinbaseTax < 10000, "invalid mining coinbase tax");

    uint256 fundReward = msg.value * crossChainMiningTreasuryTax / 100;
    uint256 coinbaseReward = msg.value * crossChainMiningCoinbaseTax / 10000;
    uint256 reward = msg.value - fundReward - coinbaseReward;
    
    require(reward > 0, "invalid mining miner reward");

    to.transfer(reward);
    treasuryAddress.transfer(fundReward);
    coinbase.transfer(coinbaseReward);

    crossChainMiningMinerReward = crossChainMiningMinerReward + reward;
    crossChainMiningTreasuryReward = crossChainMiningTreasuryReward + fundReward;
    crossChainMiningValidatorReward = crossChainMiningValidatorReward + coinbaseReward;

    // emit events
    emit CrossChainMiningReward(msg.sender, to, reward);
    emit CrossChainMiningTaxes(treasuryAddress, fundReward, coinbase, coinbaseReward);
}
```

Source: https://github.com/canxium/mining-contract/blob/merge-mining/contracts/MiningRewardDistribution.sol#L230

---

## State Database Interaction

The consensus layer validates Cross-Chain Retained PoW mining transactions by accessing state data. The process includes:

1. **Retrieve Timestamp from State:**
   - Use the `crossChainMiningStorageKey` function to calculate the storage key based on the miner's address and chain ID.
   - Retrieve the timestamp from the state database (`StateDB`).

2. **Validate Transaction Timestamp:**
   - Compare the submitted `timestamp` with the stored timestamp.
   - Reject transactions with `timestamp <= stored timestamp`.

### Code
```go
func crossChainMiningStorageKey(address common.Address, chainID uint16) common.Hash {
    addressBytes := common.LeftPadBytes(address.Bytes(), 32)
    hash := sha3.NewLegacyKeccak256()
    hash.Write(append(addressBytes, MiningContractSlotBytes...))
    outerKeyHash := hash.Sum(nil)

    chainBytes := common.LeftPadBytes(big.NewInt(int64(chainID)).Bytes(), 32)
    hash = sha3.NewLegacyKeccak256()
    hash.Write(append(chainBytes, outerKeyHash...))
    return common.BytesToHash(hash.Sum(nil))
}

func (s *StateDB) GetCrossChainMiningTimestamp(contract common.Address, address common.Address, chain types.CrossChain) uint64 {
    key := crossChainMiningStorageKey(address, uint16(chain))
    data := s.GetState(contract, key)
    return data.Big().Uint64()
}
```

---

## Proof of Work Validation

1. **Minimum Difficulty:** Ensure the PoW meets the minimum difficulty specified for the parent chain.
2. **Proof Validation:** Validate the block's proof-of-work using the `VerifyPoW` method.
3. **Coinbase Validation:** Ensure the block's coinbase transaction matches the miner's Canxium address.

---

## Error Handling

The following errors are defined and handled during verification:

- **ErrInvalidDifficulty:** Non-positive difficulty in the transaction.
- **ErrInvalidMiningTimeLine:** Cross-Chain mining not yet supported for the parent chain.
- **ErrInvalidMiningTxValue:** Incorrect reward value in the transaction.
- **ErrInvalidMiningReceiver:** Invalid receiver address in the transaction.
- **ErrInvalidCrossChainPoW:** Invalid proof of work.
- **ErrInvalidCrossChainCoinbase:** Invalid coinbase transaction in the block.

---

## Golang Implementation
- Transaction format: https://github.com/canxium/go-canxium/blob/merge-mining/core/types/tx_merge_mining.go
- Kaspa transaction: https://github.com/canxium/go-canxium/blob/merge-mining/core/types/merge_kaspa_block.go
- Transaction validation: https://github.com/canxium/go-canxium/blob/merge-mining/consensus/misc/cip0002.go
- StateDb Timestamp: https://github.com/canxium/go-canxium/blob/merge-mining/core/state/statedb.go#L1190
- Smart contract: https://github.com/canxium/mining-contract/blob/merge-mining/contracts/MiningRewardDistribution.sol#L230
- Build a mining Transaction with Kaspa: https://github.com/canxium/kaspa-merge-mining/blob/master/processing/merge.go#L292