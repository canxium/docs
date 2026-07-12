# Register a Miner

Before your node can mine PoW 2.0 blocks, you must register a miner in the **Work Distribution Contract (WDC)**. Your **signer** account sends the registration transaction with a CAU deposit and names your **miner** address - the address that receives all block rewards; the WDC then assigns you an exclusive nonce range to mine.

- **WDC address:** `0x0000000000000000000000000000000000003003`
- **Network ID / Chain ID:** `3003`

The examples below use [Foundry's `cast`](https://book.getfoundry.sh/) against a public RPC endpoint. Any wallet or library that can send a contract transaction works the same way.

## 1. Prepare two accounts

You need two separate accounts:

1. **Miner account** - receives all block rewards and the deposit refund when you exit. It never has to send a transaction, so keep this key offline (a hardware wallet address works); it is never placed on the mining node.
2. **Signer account** - the operational hot key. It sends the registration transaction (paying the deposit and gas), signs your node's block proposals via `--miner.signerkey`, and can queue an exit for your miner. Fund it with the deposit amount before registering.

Generate a fresh signer key:

```
cast wallet new
```

Save the private key for the node setup and fund its address with the deposit.

:::warning
Never reuse your miner (reward) key as the signer key. The signer key sits on an internet-connected machine - if it leaks, an attacker still cannot redirect your rewards or deposit, because the contract only ever pays the miner address. The worst they can do is queue an exit; the refund still goes to your miner address, and you can register again with a new signer.
:::

## 2. Calculate the required deposit

The minimum deposit grows with the number of miners already registered:

```
required = MIN_DEPOSIT + (MIN_DEPOSIT × (minersCount + 1) × 23053) / 5,000,000
```

where `MIN_DEPOSIT` is 303 CAU. Check the current number of registered miners:

```
cast call 0x0000000000000000000000000000000000003003 \
  "minersCount()(uint256)" \
  --rpc-url https://rpc.canxium.org
```

For example, if 9 miners are already registered, the required deposit is `303 + (303 × 10 × 23053) / 5,000,000 ≈ 316.97 CAU`. Send a little more than the computed minimum to be safe - the transaction reverts if the value is below the requirement, and the full amount you send is credited as your deposit and refunded to your miner address when you exit.

## 3. Register

Call `register(address miner)` from your **signer account**, passing your **miner address** and attaching the deposit:

```
cast send 0x0000000000000000000000000000000000003003 \
  "register(address)" <YOUR_MINER_ADDRESS> \
  --value 317ether \
  --rpc-url https://rpc.canxium.org \
  --private-key <YOUR_SIGNER_PRIVATE_KEY>
```

The account that sends this transaction is recorded as the miner's block proposal signer. Each miner address can register only once. To change your signer, exit and register again.

## 4. Verify your nonce range

Your nonce range is assigned at the **next epoch rotation** after registration, not immediately. Once the epoch rotates, check it:

```
cast call 0x0000000000000000000000000000000000003003 \
  "nonce(address)(uint64,uint64)" <YOUR_MINER_ADDRESS> \
  --rpc-url https://rpc.canxium.org
```

It returns your `[start, end]` range. Your node discovers the range automatically from the contract - you never configure it by hand.

Now [start your mining node](/guide/pow2/node).

## Staying active

Ranges are recalculated every epoch, weighted by the number of blocks each miner won in the previous epoch - more real hash power earns a proportionally larger range.

:::warning
A miner that wins no block for a prolonged period (more than the contract's inactivity limit, measured in epochs) is automatically removed and refunded its deposit **minus an inactivity penalty**. Keep your node mining, or exit voluntarily if you plan to stop.
:::

## Exiting

To stop mining and withdraw your deposit, call `exit(address miner)` from either your signer or your miner account:

```
cast send 0x0000000000000000000000000000000000003003 \
  "exit(address)" <YOUR_MINER_ADDRESS> \
  --rpc-url https://rpc.canxium.org \
  --private-key <YOUR_SIGNER_PRIVATE_KEY>
```

Notes:

- The refund always goes to the **miner address**, no matter which of the two accounts queues the exit.
- You cannot exit in the same epoch you registered.
- After queuing an exit you keep your range and may continue mining until the end of the current epoch.
- At the next epoch rotation your **full deposit is refunded automatically** and your miner is removed - no second withdrawal transaction is needed.
