# PoW 2.0 Overview

Canxium is switching its consensus from the hybrid PoS model to **PoW 2.0 - the Cooperative Consensus Protocol (CCP)**, a complete re-engineering of Proof-of-Work. Validators and beacon nodes are being retired; the network is secured by registered miners again.

For the full protocol design, read the [PoW 2.0 Whitepaper](/whitepaper-2.0/abstract). This page summarizes what miners, pools and users need to know to operate on the new network.

## What changes

In legacy PoW (PoW 1.0), miners compete: each builds its own block template and races over the same nonce space. The losers' work is wasted as orphan/stale blocks.

In PoW 2.0, miners cooperate on a single canonical block:

- **Work Distribution Contract (WDC).** A system smart contract, embedded in the genesis block at address `0x0000000000000000000000000000000000003003`, acts as the network's consensus coordinator. Miners register with a deposit, and the contract assigns each miner an **exclusive nonce range**. Everyone mines the same block header, but searches a different part of the nonce space, so no hash power is ever wasted racing another miner.
- **Pipelined execution (the N+2 rule).** The miner who seals block `N` selects the transaction list for block `N+2`. While block `N` is being mined, block `N+1` is already executed, so mining is pure cryptographic work over a known state root and block times can be very short (1–1.5 seconds).
- **Lagged rewards.** The reward for block `N` is settled in block `N+1` by a mandatory system transaction that calls the WDC. The contract maps the winning nonce to its assigned range and pays the registered miner address automatically. Withholding a found nonce only delays your own payout, so fast propagation is the optimal strategy.

## What this means for you

**Miners and pools** must do two things to participate:

1. [Register a miner in the WDC](/guide/pow2/register) - deposit CAU and link a **signer** address to your miner address.
2. [Run a PoW 2.0 node](/guide/pow2/node) with mining enabled, configured with your miner address and signer key.

Solo mining without registration is not possible: a block is only valid if its nonce falls inside the range the WDC assigned to the sealing miner.

**Users** don't need to do anything. Addresses, balances, wallets and the JSON-RPC API keep working as before - you simply get much faster blocks and near-instant inclusion.

**Validators** are no longer part of consensus. If you were running a validator, simply shut it down or [migrate your node to PoW 2.0](/guide/pow2/node) - your staked CAU has already been transferred to your address on the new chain, so there is nothing to exit or withdraw.

## Key concepts

| Term | Meaning |
| --- | --- |
| **Miner address** | The address that registers in the WDC, owns the deposit and receives block rewards. Keep its key safe (cold). |
| **Signer address** | A hot key linked to the miner at registration. Its private key lives on your mining node (`--miner.signerkey`) and signs the payloads your node broadcasts. It holds no funds. |
| **Nonce range** | The exclusive `[start, end]` slice of the 64-bit nonce space assigned to your miner. Your node only searches this range. |
| **Epoch** | A fixed number of blocks. At each epoch boundary the WDC recalculates all nonce ranges, weighted by how many blocks each miner won in the previous epoch, so range size follows real hash power. |
| **System transaction** | The transaction the consensus engine injects into every block to report the previous block's winning nonce to the WDC and settle the lagged reward. |

## Why cooperate

- **~100% effective hash power.** No orphan blocks, no redundant work - every hash secures the canonical chain.
- **Stronger 51% resistance.** An attacker needs more than half of the *absolute* network hashrate, and lagged rewards mean a secret attack chain earns nothing until revealed, so attacks must be fully self-funded.
- **Low latency, high throughput.** Pre-executed state and continuous sealing enable 1–1.5s block times without fork instability.
