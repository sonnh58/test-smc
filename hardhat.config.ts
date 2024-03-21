import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const privateKey = ""
const config: HardhatUserConfig = {
  networks: {
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      accounts: [privateKey],
    },
    bscMainnet: {
      url: "https://bsc-dataseed1.binance.org",
      chainId: 56,
      accounts: [privateKey],
    },
    onusTestnet: {
      url: "https://rpc-testnet.onuschain.io",
      chainId: 1945,
      accounts: [privateKey],
    },
    onusMainnet: {
      url: "https://rpc.onuschain.io",
      chainId: 1975,
      accounts: [privateKey],
    },
    hardhat: {
      allowUnlimitedContractSize: false,
      chainId: 1,
      forking: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        blockNumber: 15360000,
      },
    }
  },
  defaultNetwork: 'onusMainnet',
  etherscan: {
    apiKey: {
      bscTestnet: "PU3J9UJCQZWI8TPS4KICA8ISPEEZ7DV53K",
      bscMainnet: "F9EDC142ACR97453R1F1DATAZBUABR2RAK",
      onusTestnet: "NONEED",
      onusMainnet: "NONEED",
    },
    customChains: [
      {
        network: "onusTestnet",
        chainId: 1945,
        urls: {
          apiURL: "https://explorer-testnet.onuschain.io/api",
          browserURL: "https://explorer-testnet.onuschain.io",
        },
      },
      {
        network: "onusMainnet",
        chainId: 1975,
        urls: {
          apiURL: "https://explorer.onuschain.io/api",
          browserURL: "https://explorer.onuschain.io",
        },
      },
      {
        network: "bscMainnet",
        chainId: 56,
        urls: {
          apiURL: "https://api.bscscan.com/api",
          browserURL: "https://bscscan.com",
        },
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: "0.8.18",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 1_000_000,
          }
        }
      }
    ]
  }
};

export default config;
