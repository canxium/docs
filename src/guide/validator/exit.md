# Exit Validator Node

:::warning
This process may take up to 20 hours after you submit the request to the blockchain network. Make sure your node remains running until you receive your 320 CAU back.
:::


## Exit with Lighthouse

Please run this script:
```
/canxium/lighthouse/target/release/lighthouse --network canxium account validator exit --keystore /canxium/keystores/keystore-m_12381_3600_0_0_0-1714923694.json --beacon-node http://localhost:5052
```

More info can be found on [Lighthouse](https://lighthouse-book.sigmaprime.io/voluntary-exit.html)


## Exit with Lodestart

Please run this script:
```
cd /canxium/lodestar && ./lodestar validator voluntary-exit --network canxium --pubkeys 0x00 --importKeystores /canxium/keystores --importKeystoresPassword /canxium/password.txt
```

More info can be found on [Lodestar](https://chainsafe.github.io/lodestar/run/validator-management/validator-cli/#validator-voluntary-exit)


## Exit with Prysm

Please run this script:
```
cd /canxium/prysm
go build -o=./build/bin/prysmctl ./cmd/prysmctl
./build/bin/prysmctl validator exit --wallet-dir=/canxium/wallet/keystores --beacon-rpc-provider=127.0.0.1:4000

```

More info can be found on [Prysm](https://docs.prylabs.network/docs/wallet/exiting-a-validator)