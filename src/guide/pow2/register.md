# Register a Miner

Before your node can mine PoW 2.0 blocks, you must register a miner in the **Work Distribution Contract (WDC)**. Registration deposits CAU and links a **signer** address to your miner address; the WDC then assigns you an exclusive nonce range to mine.

- **WDC address:** `0x0000000000000000000000000000000000003003`
- **Network ID / Chain ID:** `3003`

The examples below use [Foundry's `cast`](https://book.getfoundry.sh/) against a public RPC endpoint. Any wallet or library that can send a contract transaction works the same way.

## 1. Prepare two accounts

You need two separate accounts:

1. **Miner account** - sends the registration transaction, owns the deposit and receives all block rewards. Keep this key offline; it is never placed on the mining node.
2. **Signer account** - a hot key whose *private key* runs on your mining node (`--miner.signerkey`) and signs the payloads your node broadcasts. It does not need to hold any funds.

Generate a fresh signer key:

```
cast wallet new
```

Save the private key for the node setup and note the address for registration.

:::warning
Never reuse your miner (deposit) key as the signer key. The signer key sits on an internet-connected machine - if it leaks, an attacker still cannot touch your deposit or rewards, and you can re-register with a new signer.
:::

## 2. Calculate the required deposit

The minimum deposit grows with the number of miners already registered:

```
required = MIN_DEPOSIT × (minersCount + 1) × 23053 / 5,000,000
```

where `MIN_DEPOSIT` is 303 CAU. Check the current number of registered miners:

```
cast call 0x0000000000000000000000000000000000003003 \
  "minersCount()(uint256)" \
  --rpc-url https://rpc.canxium.org
```

For example, if 9 miners are already registered, the required deposit is `303 × 10 × 23053 / 5,000,000 ≈ 13.97 CAU`. Send a little more than the computed minimum to be safe - the transaction reverts if the value is below the requirement, and the full amount you send is credited as your deposit and returned when you exit.

## 3. Register

Call `register(address signer)` from your **miner account**, passing your **signer address** and attaching the deposit:

```
cast send 0x0000000000000000000000000000000000003003 \
  "register(address)" <YOUR_SIGNER_ADDRESS> \
  --value 14ether \
  --rpc-url https://rpc.canxium.org \
  --private-key <YOUR_MINER_PRIVATE_KEY>
```

Each address can register only once. To change your signer, exit and register again.

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

To stop mining and withdraw your deposit, call `exit()` from your miner account:

```
cast send 0x0000000000000000000000000000000000003003 \
  "exit()" \
  --rpc-url https://rpc.canxium.org \
  --private-key <YOUR_MINER_PRIVATE_KEY>
```

Notes:

- You cannot exit in the same epoch you registered.
- After queuing an exit you keep your range and may continue mining until the end of the current epoch.
- At the next epoch rotation your **full deposit is refunded automatically** and your miner is removed - no second withdrawal transaction is needed.
