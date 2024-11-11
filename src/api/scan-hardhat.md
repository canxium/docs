# Canxium Scan API

If you are using Hardhat to build smart contracts, here is the recommended configuration:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    praseody: {
      url: 'https://pr-rpc.canxium.net',
      accounts: ["0x"],
      hardfork: "london"
    },
    canxium: {
      url: 'https://rpc.canxium.org',
      accounts: ["0x"],
      hardfork: "london"
    }
  },
  etherscan: {
    apiKey: {
      praseody: "abc",
      canxium: "abc",
    },
    customChains: [
      {
        network: "praseody",
        chainId: 30203,
        urls: {
          apiURL: "https://testnet-scan.canxium.net/api",
          browserURL: "https://testnet-scan.canxium.net"
        }
      },
      {
        network: "canxium",
        chainId: 3003,
        urls: {
          apiURL: "https://scan.canxium.org/api",
          browserURL: "https://scan.canxium.org"
        }
      }
    ]
  }
};


```

To verify your deployed contract, run: `npx hardhat verify --network canxium 0x00`