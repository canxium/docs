---
id: nodes-networks
title: Nodes and networks
sidebar_label: Nodes and networks
---

## Nodes

A RPC Canxium **node** is a running instance of Canxium's client software. This software is responsible for running the Canxium blockchain and serving RPC calls.

:::warning
To ensure your node operates stably and achieves the highest number of connections with peers on the network, we recommend running the node in a Linux environment on servers that operate 24/7. ovh.com or contabo.com are suitable options.
:::

## Setup Node

### Using Script
If you are installing Node on a Linux environment and have experience running scripts, we recommend using the pre-written script we have provided to quickly install Node:

Run:

```bash <(curl -fsSL https://raw.githubusercontent.com/canxium/scripts/refs/heads/main/beacon.sh)```

### Using Docker Images

If you want to launch Node in a Docker environment, please follow these steps.

Download one of threes supported client in docker compose format:
1. https://github.com/canxium/lighthouse/blob/main/docker-compose.yml
2. https://github.com/canxium/prysm/blob/main/docker-compose.yml
3. https://github.com/canxium/lodestar/blob/main/docker-compose.yml

Run the docker compose

```docker compose -f docker-compose.yml up -d```

You should see this logs, mean your node is up and running:
- Lighthouse
![](./images/lighthouse.png)
- Lodestar
![](./images/lodestar.png)
- Prysm
![](./images/prysm.png)

### Using Native Binary
1. Build and run go-canxium:
```
sudo snap install go --channel=1.22 --classic

git clone https://github.com/canxium/go-canxium.git

sudo apt install build-essential -y

cd go-canxium/ && git checkout v0.1.3

make canxium

mkdir -p /canxium

openssl rand -hex 32 | tr -d "\n" > "/canxium/jwt.hex"

./go-canxium/build/bin/canxium --db.engine=pebble init ./go-canxium/genesis/mainnet.genesis.json
```

```
echo "[Unit]
Description=Canxium Bootnode

[Service]
User=root
WorkingDirectory=/root
ExecStart=/root/go-canxium/build/bin/canxium --http --http.addr 127.0.0.1 --http.api debug,net,eth,shh,web3,txpool --ethstats [node_name]:canxium@stats.canxium.org --db.engine=pebble --syncmode "full" --authrpc.addr 127.0.0.1 --authrpc.jwtsecret=/canxium/jwt.hex --bootnodes enode://314f1041da4b27f5e4c02b4eac52ca7bd2f025cb585490cb7032fdb08db737aa10d7d64a780db697643ece6027d3bc1a511696420e76192648c0d2d74d099c73@boot.canxium.net:30303,enode://767d3e408b073ca501ea7336096c048eea46513ac5c44659ac902d7575881ca114c82277dff7826630ec9fb45d8cfa5a82b9eacc8b477dc475746eaec39e2f2a@boot.canxium.org:30303,enode://f06de34b87954abb25be2e8d592306bc55b396a4eead839dba90baf4e59465d3ef704866962cf2fd995e6ce04f17de31edebb11afcac9df4eaea847f35e3cbaf@boot-n2.canxium.org:30303
Restart=always

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/node.service

systemctl enable node
systemctl start node
```

2. Build and run one of these beacon client:
a. Lighthouse:

Install rustc, clang, make:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

source "$HOME/.cargo/env"

sudo apt install libclang-dev

sudo apt install build-essential

sudo apt install cmake
```

Clone and build lighthouse binary:

```
git clone https://github.com/canxium/lighthouse.git

cd lighthouse/ && make

echo "[Unit]
Description=Lighthouse Static Node

[Service]
User=root
WorkingDirectory=/root
ExecStart=/root/lighthouse/target/release/lighthouse bn --network canxium --execution-endpoint http://127.0.0.1:8551 --execution-jwt /canxium/jwt.hex --http --debug-level info --datadir /canxium/lighthouse_static --enr-address [your_node_public_ipv4] --port 9000 --enr-udp-port 9000 --enr-tcp-port 9000

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/lighthouse.node.service

systemctl enable lighthouse.node.service

systemctl start lighthouse.node.service
```

b. Prysm:

Install golang, build-essential:

```
sudo snap install go --channel=1.22 --classic

sudo apt install build-essential
Clone and build Prysm:
git clone https://github.com/canxium/prysm.git

cd prysm && git checkout v5.0.1

go build -o=./build/bin/beacon-chain ./cmd/beacon-chain && go build -o=./build/bin/validator ./cmd/validator
```

Start prysm node:

```
echo "[Unit]
Description=Prysm Static Node

[Service]
User=root
WorkingDirectory=/root
ExecStart=/root/prysm/build/bin/beacon-chain --datadir=/canxium/beacondata --min-sync-peers=3 --canxium --execution-endpoint=http://127.0.0.1:8551 --chain-id=3003 --accept-terms-of-use --jwt-secret=/canxium/jwt.hex --verbosity info

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/prysm.node.service

systemctl enable prysm.node.service

systemctl start prysm.node.service
```

c. Lodestar:

Install node v20.12.2, yarn:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install v20.12.2

nvm use v20.12.2

ln -s /root/.nvm/versions/node/v20.12.2/bin/node /usr/bin/node

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install --no-install-recommends yarn
```

Clone and build Lodestar:

```
git clone https://github.com/canxium/lodestar.git

cd lodestart && git checkout v1.17.0

yarn && yarn build
Run lodestar node:
echo "[Unit]
Description=Lodestar Static Node

[Service]
User=root
WorkingDirectory=/root/lodestar
ExecStart=/root/lodestar/lodestar beacon --network canxium --jwtSecret /canxium/jwt.hex --logLevel info --rest=true --rest.namespace "beacon","config","events","node","validator","lightclient","debug" --enr.ip [your_public_ipv4] --dataDir=/canxium/lodestar

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/lodestar.node.service

systemctl enable lodestar.node.service

systemctl start lodestar.node.service
```

Now you have both **execution nodes** and **beacon nodes** installed on your machine.