# Run a PoW 2.0 Node

A PoW 2.0 node is a single `canxium` (go-canxium) binary - no beacon or validator client is needed anymore. The same binary can run as a plain full/RPC node, or mine when started with the mining flags.

:::warning
To ensure your node operates stably and achieves the highest number of connections with peers on the network, we recommend running the node in a Linux environment on servers that operate 24/7. ovh.com or contabo.com are suitable options.
:::

## 1. Build go-canxium

```
sudo snap install go --channel=1.22 --classic

sudo apt install build-essential -y

git clone https://github.com/canxium/go-canxium.git

cd go-canxium

make canxium
```

Use the latest PoW 2.0 release listed on the [releases page](/about/releases).

## 2. Initialize the PoW 2.0 genesis

PoW 2.0 uses its own genesis file, which embeds the Work Distribution Contract at block 0. Initialize a fresh data directory with it:

```
./build/bin/canxium --db.engine=pebble --datadir ~/.canxium_pow20 init genesis/mainnet.pow2.0.genesis.json
```

## 3. Start the node

### Mining node

You need your registered **miner address** and the **signer private key** you linked to it - see [Register a Miner](/guide/pow2/register) if you haven't done this yet.

```
./build/bin/canxium --http --db.engine=pebble --syncmode full --gcmode=archive --networkid 3003 \
  --datadir ~/.canxium_pow20 --verbosity 3 \
  --bootnodes enode://314f1041da4b27f5e4c02b4eac52ca7bd2f025cb585490cb7032fdb08db737aa10d7d64a780db697643ece6027d3bc1a511696420e76192648c0d2d74d099c73@boot.canxium.net:30303,enode://767d3e408b073ca501ea7336096c048eea46513ac5c44659ac902d7575881ca114c82277dff7826630ec9fb45d8cfa5a82b9eacc8b477dc475746eaec39e2f2a@boot.canxium.org:30303,enode://f06de34b87954abb25be2e8d592306bc55b396a4eead839dba90baf4e59465d3ef704866962cf2fd995e6ce04f17de31edebb11afcac9df4eaea847f35e3cbaf@boot-n2.canxium.org:30303 \
  --mine --miner.threads=1 \
  --miner.etherbase <YOUR_MINER_ADDRESS> \
  --miner.signerkey <YOUR_SIGNER_PRIVATE_KEY>
```

The mining flags:

| Flag | Value |
| --- | --- |
| `--miner.etherbase` | Your **miner address** - the address you registered in the WDC. The node uses it to look up your assigned nonce range. Block rewards are paid to this address by the contract. |
| `--miner.signerkey` | The hex **private key of your signer** - the address you passed to `register(signer)`. It signs the payloads your node broadcasts; other nodes verify the signature against the signer registered for your miner. |
| `--miner.threads` | Number of CPU mining threads. |

:::warning
The signer key is a hot key on this machine. Use a dedicated key with no funds - never your miner (deposit) key.
:::

### RPC / full node (no mining)

Run the same command without the `--mine`, `--miner.*` flags:

```
./build/bin/canxium --http --db.engine=pebble --syncmode full --gcmode=archive --networkid 3003 \
  --datadir ~/.canxium_pow20 --verbosity 3 \
  --bootnodes enode://314f1041da4b27f5e4c02b4eac52ca7bd2f025cb585490cb7032fdb08db737aa10d7d64a780db697643ece6027d3bc1a511696420e76192648c0d2d74d099c73@boot.canxium.net:30303,enode://767d3e408b073ca501ea7336096c048eea46513ac5c44659ac902d7575881ca114c82277dff7826630ec9fb45d8cfa5a82b9eacc8b477dc475746eaec39e2f2a@boot.canxium.org:30303,enode://f06de34b87954abb25be2e8d592306bc55b396a4eead839dba90baf4e59465d3ef704866962cf2fd995e6ce04f17de31edebb11afcac9df4eaea847f35e3cbaf@boot-n2.canxium.org:30303
```

## 4. Verify it's working

- The node should find peers and start importing blocks shortly after start.
- Once synced, a mining node logs that mining has started and begins searching its assigned nonce range. Remember your nonce range is only assigned at the first epoch rotation after [registration](/guide/pow2/register).
- When your node seals a block `N`, the reward is settled automatically in block `N+1` to your miner address - check its balance or look up your miner in the WDC:

```
cast call 0x0000000000000000000000000000000000003003 \
  "minerNonces(address)" <YOUR_MINER_ADDRESS> \
  --rpc-url http://127.0.0.1:8545
```

## Running as a systemd service

For 24/7 operation, wrap the start command in a systemd unit:

```
echo "[Unit]
Description=Canxium PoW 2.0 Miner

[Service]
User=root
WorkingDirectory=/root
ExecStart=/root/go-canxium/build/bin/canxium --http --db.engine=pebble --syncmode full --gcmode=archive --networkid 3003 --datadir /root/.canxium_pow20 --verbosity 3 --bootnodes enode://314f1041da4b27f5e4c02b4eac52ca7bd2f025cb585490cb7032fdb08db737aa10d7d64a780db697643ece6027d3bc1a511696420e76192648c0d2d74d099c73@boot.canxium.net:30303,enode://767d3e408b073ca501ea7336096c048eea46513ac5c44659ac902d7575881ca114c82277dff7826630ec9fb45d8cfa5a82b9eacc8b477dc475746eaec39e2f2a@boot.canxium.org:30303,enode://f06de34b87954abb25be2e8d592306bc55b396a4eead839dba90baf4e59465d3ef704866962cf2fd995e6ce04f17de31edebb11afcac9df4eaea847f35e3cbaf@boot-n2.canxium.org:30303 --mine --miner.threads=1 --miner.etherbase <YOUR_MINER_ADDRESS> --miner.signerkey <YOUR_SIGNER_PRIVATE_KEY>
Restart=always

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/canxium.service

systemctl enable canxium
systemctl start canxium
```
