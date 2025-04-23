# Cross-Chain Retained PoW Mining Protocol

:::danger
If you are actively mining in any of the following pools, simply update your CAU address to start participating and receiving CAU rewards automatically.
1. F2Pool: Finished | [Guide](https://f2pool.zendesk.com/hc/en-us/articles/43969826620825-f2pool-launches-KAS-CAU-cross-chain-mining) | [Scan Address](https://scan.canxium.org/address/0x1f11fe5f07d1e74C8f77A3cB3101438878853E12)
2. WhalePool: Finished | [Guide](https://www.whalepool.com/news/7) | [Scan Address](https://scan.canxium.org/address/0x1923a3A063C1964b3a3Cb243527F125e702AC5F1)
3. K1Pool: Finished | [Scan Address](https://scan.canxium.org/address/0x92d003f6Ba388dF9943c01a26A9616b9bda0Ac7B)
4. HumPool: Finished | [Guide](https://www.humpool.com/pool/announcement-details?id=55) | [Scan Address](https://scan.canxium.org/address/0x61faba23a639d1028e74bffe14c483bb80be9d0e)
5. EMCD: Finished | [X](https://x.com/emcd_io/status/1902028305164906961) | [Scan Address](https://scan.canxium.org/address/0xafd0ede3a0dd8c4c88cc96b47b4d49cad1320b24)
6. BaikalMine.com: Finished
6. Kaspa-nodes.org: Finished
:::

:::warning
Kaspa is the only supported chain as of now, more chains will be integrated in the future
:::

To begin cross-chain mining CAU with Kaspa, miners or mining pools need to ensure that their **coinbase transaction payload** includes a specific string, which integrates the Canxium mining protocol. Below are the steps and explanation of how this works:

### **What is the Coinbase Transaction Payload?**
- The coinbase transaction is the first transaction in a block and is used to reward miners.
- The payload of the coinbase transaction often contains metadata, which miners and pools typically use to store their identity or software version (e.g., "0.14.1/viabtc").

### **Adding the Cross-Chain Mining String**
For the block to be valid for Canxium Cross-Chain Retained PoW Mining, miners or pools must append the following string to the **coinbase transaction payload**:

```
canxiuminer:<Canxium Address Without 0x>
```

- **`canxiuminer:`**: A fixed prefix required to identify Canxium Cross-Chain Retained PoW Mining.
- **`<Canxium Address Without 0x>`**: The miner's Canxium address, stripped of the `0x` prefix.

### **Example**
In the provided block:  
[Kaspa Block](https://explorer.kaspa.org/blocks/b973fc339674f647ca78d0564cb989714b0cd8d2634c3d622053055aa255e1a9)

The existing payload is:  
```
fad5f605000000004ec8089d0100000000002220311eaa45a32f32cbe02b4fede4c4479aec3fec9918271028758b733df7ad6c36ac302e31342e312f766961627463
```

Converted to text:  
```
úÕöNÈ" 1ªE£/2Ëà+OíäÄGì?ì'(us=÷­l6¬0.14.1/viabtc
```

To make it valid for Canxium cross-chain mining, append the Canxium-specific string.  
For example, if the address is `0x52b2237aBB643a8EdaCc9B66D56E92B09F22847c`, the appended payload becomes:  

```
úÕöNÈ" 1ªE£/2Ëà+OíäÄGì?ì'(us=÷­l6¬0.14.1/viabtc/canxiuminer:52b2237aBB643a8EdaCc9B66D56E92B09F22847c
```

## **Technical Requirements**
:::danger
If the same miner has more than one block with the same timestamp, only one block will be accepted, and the remaining blocks will be discarded.
:::

1. **Modify the Block Template**:
    - When pools or miners generate the block template, they need to add the `canxiuminer:` string with their address at the end of the coinbase transaction payload.
	- This string serves as:
		- **Proof of Cross-Chain Retained PoW Mining**: Identifies that the block was mined with Canxium integration.
		- **Reward Allocation**: The Canxium address ensures that rewards for the PoW mining are credited to the correct miner.

2. **Use Valid Address**:
   - Ensure that the address provided is correct and formatted without the `0x` prefix. For instance, `0x52b2237aBB643a8EdaCc9B66D56E92B09F22847c` should be written as `52b2237aBB643a8EdaCc9B66D56E92B09F22847c`.

3. **Mining Software Compatibility**:
   - Mining pools or software should support customizing the coinbase transaction payload to append the required string.

## Standard Integration Guide
**For Mining Pools**  
1. Initialize a Kaspa block.  
2. Append the tag `canxiuminer:<Canxium Address Without 0x>` to the coinbase transaction payload.  
3. Mine the block, find a valid nonce, and broadcast it to the Kaspa network.  

   *[Valid Kaspa blocks are automatically relayed to Canxium, with a delay of 2-5 seconds.]*  

4. Periodically call the `eth_getTransactionReceiptByAuxPoWHash` RPC method to verify if the Kaspa block has been synchronized on the Canxium network.  
5. If the receipt status is `0x1`, either retrieve the transaction value or compute the reward using [`CrossMiningReward`](https://github.com/canxium/go-canxium/blob/8f6ea0d45e004bf9d9d3d9b8437fadc931ba7fbf/consensus/misc/cip0002.go#L164). (You have to exclude Validators and Canxium labs percentage) 
6. Distribute CAU rewards to your Kaspa miners.  

**For Solo Miners**  
1. Initialize a Kaspa block.  
2. Append the tag `canxiuminer:<Canxium Address Without 0x>` to the coinbase transaction payload.  
3. Mine the block, find a valid nonce, and broadcast it to the Kaspa network.  
4. Enjoy your CAU reward.

## Advanced Guide (You can skip this)

### Cross-Chain Mining Transaction

To participate in Cross-Chain mining between Kaspa and Canxium, miners must create and send a specialized transaction to the Canxium network.
This transaction contains essential information, including the Kaspa block header, coinbase transaction proof, miner’s address, and reward details.

:::warning
These transactions are initiated automatically by the Canxium team. Every valid Kaspa block is monitored in real-time, and a mining transaction is then created and sent to Canxium. You do not need to perform this step.
:::

### Prerequisites
1. **Development Environment**:
   - Install Go and the necessary Canxium/Kaspa libraries.
2. **Miner's Wallet Address**:
   - A Canxium address to receive the rewards.
3. **Canxium Node**:
   - A running Canxium node to broadcast the transaction, you can you public RPC at:
   - Mainnet
		- RPC: https://rpc.canxium.org
		- Explorer: https://scan.canxium.org
		- Chain Id: 3003
		- Mining Contract: 0x6c6331CA2BC039996E833479b7c13Cc62Ab5c6BA
		- Helium Fork Time: 1740787200
		- Min Kaspa Block Difficulty: 100 TH
	- Testnet
		- RPC: https://testnet-rpc.canxium.net
		- Explorer: https://testnet-scan.canxium.net
		- Chain Id: 30303
		- Mining Contract: 0x5FD4e99DC1eFC12eBE5c5530d6C7b3860C819f9D
		- Helium Fork Time: 1739454301
		- Min Kaspa Block Difficulty: 1 MH

4. **Kaspa Block Data**:
   - Access to Kaspa block headers and transactions.

### Create the Mining Transaction

**Step 1: Generate the Kaspa Block Header**

Create an immutable Kaspa block header that captures the essential fields required for the Canxium mining process:

```go
import  "github.com/ethereum/go-ethereum/core/types"

blockHeader := types.NewImmutableKaspaBlockHeader(
	block.Header.Version(),
	block.Header.Parents(),
	block.Header.HashMerkleRoot(),
	block.Header.AcceptedIDMerkleRoot(),
	block.Header.UTXOCommitment(),
	block.Header.TimeInMilliseconds(),
	block.Header.Bits(),
	block.Header.Nonce(),
	block.Header.DAAScore(),
	block.Header.BlueScore(),
	block.Header.BlueWork(),
	block.Header.PruningPoint(),
)
```

**Step 2: Generate the Merkle Proof**

A Merkle proof is required to verify the inclusion of the coinbase transaction in the block:

```go
// GenerateMerkleProofForFirstTransaction calculates the merkle root path, to verify coinbase transaction is included in the merkle root
func GenerateMerkleProofForCoinbase(transactions []*externalapi.DomainTransaction, massActivated bool) []*externalapi.DomainHash {
	// If there is only one hash, no proof is needed
	txHashes := make([]*externalapi.DomainHash, len(transactions))
	for i, tx := range transactions {
		txHashes[i] = consensushashing.TransactionHashWithMass(tx, massActivated)
	}

	if len(txHashes) <= 1 {
		return []*externalapi.DomainHash{}
	}

	proof := []*externalapi.DomainHash{}
	levelHashes := txHashes

	for len(levelHashes) > 1 {
		if len(levelHashes)%2 != 0 {
			// Set the last hash to zero if the number of hashes is odd
			levelHashes = append(levelHashes, &externalapi.DomainHash{})
		}

		// The sibling hash is always the second element
		proof = append(proof, levelHashes[1])

		// Calculate the next level of the tree
		nextLevel := []*externalapi.DomainHash{}
		for i := 0; i < len(levelHashes); i += 2 {
			newHash := hashMerkleBranches(levelHashes[i], levelHashes[i+1])
			nextLevel = append(nextLevel, newHash)
		}

		levelHashes = nextLevel
	}

	return proof
}

proof := GenerateMerkleProofForCoinbase(block.Transactions)
```

**Step 3: Create the Kaspa Block Object**

Combine the Kaspa block header, Merkle proof, and coinbase transaction into a `KaspaBlock` object:

```go
kaspaBlock := &types.KaspaBlock{
	Header:      &blockHeader,
	MerkleProof: proof,
	Coinbase:    block.Transactions[0],
	StorageMassActivated: true
}
```

For Kaspa Mainnet: `StorageMassActivated: false`
For Kaspa Testnet 10: `StorageMassActivated: false`
For Kaspa Testnet 11: `StorageMassActivated: true`

**Step 4: Calculate the Mining Reward**

Use the provided Canxium reward calculation logic to determine the reward for this block:

```go
import "github.com/ethereum/go-ethereum/consensus/misc"
value := misc.CrossChainMiningReward(kaspaBlock, HeliumForkTime, uint64(time.Now().Unix()))
```

**Step 5: Prepare the Data Payload**

The mining transaction uses the `crossChainMining(address,uint16,uint256)` method signature. Construct the transaction payload as follows:

1. **Generate the Method ID**:
   ```go
   mineFnSignature := []byte("crossChainMining(address,uint16,uint256)")
   hash := sha3.NewLegacyKeccak256()
   hash.Write(mineFnSignature)
   methodID := hash.Sum(nil)[:4]
   ```

2. **Prepare the Data Fields**:
   - Miner address, padded to 32 bytes:
     ```go
     receiver, err := kaspaBlock.GetMinerAddress()
     if err != nil {
         return nil, common.Address{}, err
     }
     paddedAddress := common.LeftPadBytes(receiver.Bytes(), 32)
     ```
   - Chain ID, padded to 32 bytes:
     ```go
     chain := types.KaspaChain
     chainHex := fmt.Sprintf("%04x", chain)
     chainPadded, _ := hex.DecodeString(fmt.Sprintf("%064s", chainHex))
     ```
   - Timestamp, padded to 32 bytes:
     ```go
     timestamp := big.NewInt(block.Header.TimeInMilliseconds())
     timestampPadded := make([]byte, 32)
     timestamp.FillBytes(timestampPadded)
     ```

3. **Assemble the Payload**:
   Combine the components into the `data` field:
   ```go
   var data []byte
   data = append(data, methodID...)
   data = append(data, paddedAddress...)
   data = append(data, chainPadded...)
   data = append(data, timestampPadded...)
   ```

**Step 6: Sign the Transaction**

Create and sign the mining transaction:

```go
signedTx, err := types.SignTx(types.NewTx(&types.CrossChainMiningTx{
	ChainID:   big.NewInt(3003),
	Nonce:     p.account.nonce,
	GasTipCap: big.NewInt(0),
	GasFeeCap: big.NewInt(0),
	Gas:       100000,
	From:      p.account.address,
	To:        common.HexToAddress("0x6c6331CA2BC039996E833479b7c13Cc62Ab5c6BA"), // Mainnet mining contract
	Value:     value,
	Data:      data,
	AuxPoW:    kaspaBlock,
}), types.NewLondonSigner(big.NewInt(3003)), Private_Key)
if err != nil {
	return nil, common.Address{}, errors.Errorf("Failed to sign raw transaction error: %+v", err)
}
```

**Step 7: Submit the Transaction to the Canxium Network**

Once signed, broadcast the transaction to the Canxium network using your node’s RPC endpoint:

```go
txHash, err := canxiumClient.SendTransaction(ctx, signedTx)
if err != nil {
	log.Fatalf("Failed to send transaction: %v", err)
}
fmt.Printf("Transaction submitted! Hash: %s\n", txHash.Hex())
```

---

[Source Code Available Here](https://github.com/canxium/kaspa-merge-mining/blob/master/processing/merge.go#L292)

---

By following these steps, miners can successfully create and submit a mining transactions to the Canxium network, enabling rewards for participating in Kaspa Cross-Chain mining.

---

## Tools for Cross-Chain Mining

1. [Mining Reward Emissions](/whitepaper/tokenomics/cross_chain_mining_rewards#incentive-model)

1. CPU Mining Tool

We have created a tool to help miners mine using their CPU: Kaspa Miner. This tool allows miners to efficiently mine Kaspa blocks while integrating with the Canxium cross-chain mining process.

[Kaspa-miner](https://github.com/canxium/kaspa-miner)

This tool enables efficient CPU mining and ensures compatibility with the cross-chain mining setup:
`./kaspa-miner --mining-address kaspa:XXXXX --extra-data MINER_NAME/canxiuminer:52b2237aBB643a8EdaCc9B66D56E92B09F22847c`

2. Automatic Cross-Chain Retaned PoW Mining Transaction Generator

We also provide software to automatically listen for all Kaspa blocks, generate cross-chain mining transactions, and submit them to the Canxium network for all valid Kaspa blocks: [Kaspa Mining Tool](https://github.com/canxium/kaspa-merge-mining).

3. Additional RPC Method for Cross-Chain Mining

To assist with retrieving cross-chain mining transactions based on Kaspa block hashes, we have introduced a new RPC method:

`eth_getTransactionByAuxPoWHash`

This method fetches the cross-chain mining transaction corresponding to a given Kaspa block hash. Example:

```
curl --location 'https://rpc.canxium.org' \
--header 'Content-Type: application/json' \
--data '{
  "jsonrpc": "2.0",
  "method": "eth_getTransactionByAuxPoWHash",
  "params": ["083bc9811dc5743f701bddf7e86bfa9797d8987f01171f8406b3ac5d4ddaf1c6"], // KASPA block hash
  "id": 2
}
'
```

`eth_getTransactionReceiptByAuxPoWHash`

This method fetches the cross-chain mining transaction corresponding to a given Kaspa block hash. Example:

```
curl --location 'https://rpc.canxium.org' \
--header 'Content-Type: application/json' \
--data '{
  "jsonrpc": "2.0",
  "method": "eth_getTransactionReceiptByAuxPoWHash",
  "params": ["083bc9811dc5743f701bddf7e86bfa9797d8987f01171f8406b3ac5d4ddaf1c6"], // KASPA block hash
  "id": 2
}
'
```