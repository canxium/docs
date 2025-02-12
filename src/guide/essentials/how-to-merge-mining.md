# How to Merge Mining?

To begin merge mining Kaspa with Canxium, miners or mining pools need to ensure that their **coinbase transaction payload** includes a specific string, which integrates the Canxium mining protocol. Below are the steps and explanation of how this works:

## **What is the Coinbase Transaction Payload?**
- The coinbase transaction is the first transaction in a block and is used to reward miners.
- The payload of the coinbase transaction often contains metadata, which miners and pools typically use to store their identity or software version (e.g., "viabtc" in the example block you provided).

## **Adding the Merge Mining String**
For the block to be valid for Canxium merge mining, miners or pools must append the following string to the **coinbase transaction payload**:

```
canxiuminer:<Canxium Address Without 0x>
```

- **`canxiuminer:`**: A fixed prefix required to identify Canxium merge mining.
- **`<Canxium Address Without 0x>`**: The miner's Canxium address, stripped of the `0x` prefix.

## **Example**
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

To make it valid for Canxium merge mining, append the Canxium-specific string.  
For example, if the address is `0x52b2237aBB643a8EdaCc9B66D56E92B09F22847c`, the appended payload becomes:  

```
úÕöNÈ" 1ªE£/2Ëà+OíäÄGì?ì'(us=÷­l6¬0.14.1/viabtc/canxiuminer:52b2237aBB643a8EdaCc9B66D56E92B09F22847c
```

## **Technical Requirements**
1. **Modify the Block Template**:
   - When pools or miners generate the block template, they need to add the `canxiuminer:` string with their address at the end of the coinbase transaction payload.

2. **Use Valid Address**:
   - Ensure that the address provided is correct and formatted without the `0x` prefix. For instance, `0x52b2237aBB643a8EdaCc9B66D56E92B09F22847c` should be written as `52b2237aBB643a8EdaCc9B66D56E92B09F22847c`.

3. **Mining Software Compatibility**:
   - Mining pools or software should support customizing the coinbase transaction payload to append the required string.

## **Why is This Necessary?**
This string serves as:
1. **Proof of Merge Mining**: Identifies that the block was mined with Canxium integration.
2. **Reward Allocation**: The Canxium address ensures that rewards for the merge mining are credited to the correct miner.

## **Steps for Miners and Pools**
1. Update your mining software to support appending the required `canxiuminer:<address>` string to the coinbase payload.
2. Test the block validity to ensure it complies with both Kaspa and Canxium merge mining requirements.
3. Begin merge mining by submitting valid blocks containing the Canxium merge mining string.

## **Conclusion**
By appending the `canxiuminer:<address>` string to the coinbase transaction payload, miners can successfully participate in Kaspa and Canxium merge mining. This setup ensures proper validation and reward distribution across both chains.

---

# Creating and Submitting a Merge Mining Transaction to the Canxium Network

## Overview
To participate in merge mining between Kaspa and Canxium, miners must create and send a specialized transaction to the Canxium network.
This transaction contains essential information, including the Kaspa block header, coinbase transaction proof, miner’s address, and reward details.

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
		- HeliumForkTime: NOT YET
		- Min Kaspa Block Difficulty: 1 PH
	- Testnet
		- RPC: https://testnet-rpc.canxium.net
		- Explorer: https://testnet-scan.canxium.net
		- Chain Id: 30303
		- Mining Contract: 0x5FD4e99DC1eFC12eBE5c5530d6C7b3860C819f9D
		- HeliumForkTime: 1739092268
		- Min Kaspa Block Difficulty: 1 MH

4. **Kaspa Block Data**:
   - Access to Kaspa block headers and transactions.

## Steps to Create and Send the Merge Mining Transaction

### Step 1: Generate the Kaspa Block Header
Create an immutable Kaspa block header that captures the essential fields required for the Canxium merge mining process:

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

### Step 2: Generate the Merkle Proof
A Merkle proof is required to verify the inclusion of the coinbase transaction in the block:

```go
func GenerateMerkleProofForCoinbase(transactions []*externalapi.DomainTransaction) []*externalapi.DomainHash {
	// If there is only one hash, no proof is needed
	txHashes := make([]*externalapi.DomainHash, len(transactions))
	for i, tx := range transactions {
		txHashes[i] = consensushashing.TransactionHash(tx)
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

### Step 3: Create the Kaspa Block Object
Combine the Kaspa block header, Merkle proof, and coinbase transaction into a `KaspaBlock` object:

```go
kaspaBlock := &types.KaspaBlock{
	Header:      &blockHeader,
	MerkleProof: proof,
	Coinbase:    block.Transactions[0],
}
```

### Step 4: Calculate the Merge Mining Reward
Use the provided Canxium reward calculation logic to determine the reward for this block:

```go
import "github.com/ethereum/go-ethereum/consensus/misc"
value := misc.MergeMiningReward(kaspaBlock, HeliumForkTime, uint64(time.Now().Unix()))
```

### Step 5: Prepare the Data Payload
The merge mining transaction uses the `mergeMining(address,uint16,uint256)` method signature. Construct the transaction payload as follows:

1. **Generate the Method ID**:
   ```go
   mineFnSignature := []byte("mergeMining(address,uint16,uint256)")
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

### Step 6: Sign the Transaction
Create and sign the merge mining transaction:

```go
signedTx, err := types.SignTx(types.NewTx(&types.MergeMiningTx{
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

### Step 7: Submit the Transaction to the Canxium Network
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

By following these steps, miners can successfully create and submit merge mining transactions to the Canxium network, enabling rewards for participating in Kaspa merge mining.

---

# Tools for Merge Mining

1. CPU Mining Tool

We have created a tool to help miners mine using their CPU: Kaspa Miner. This tool allows miners to efficiently mine Kaspa blocks while integrating with the Canxium merge mining process.

[Kaspa-miner](https://github.com/canxium/kaspa-miner)

This tool enables efficient CPU mining and ensures compatibility with the merge mining setup:
`./kaspa-miner --mining-address kaspa:XXXXX --extra-data MINER_NAME/canxiuminer:52b2237aBB643a8EdaCc9B66D56E92B09F22847c`

2. Automatic Merge Mining Transaction Generator

We also provide software to automatically listen for all Kaspa blocks, generate merge mining transactions, and submit them to the Canxium network for all valid Kaspa blocks: [Kaspa Merge Mining Tool](https://github.com/canxium/kaspa-merge-mining).

3. Additional RPC Method for Merge Mining

To assist with retrieving merge mining transactions based on Kaspa block hashes, we have introduced a new RPC method:

`eth_getTransactionByAuxPoWHash`

This method fetches the merge mining transaction corresponding to a given Kaspa block hash. Example:

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