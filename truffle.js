const HDWalletProvider = require("truffle-hdwallet-provider");

require('dotenv').config()  // Store environment-specific variable from '.env' to process.env

module.exports = {
  compilers: {
    solc: {
      version: "0.5.0", 
      docker: false,
      settings: {
        optimizer: {
          enabled: true,
          runs: 1000  
        },
        evmVersion: "byzantium"
      }
    }
},
  networks: {
  development: {
    host: 'localhost',
      port: 8545,
        network_id: '*' // Match any network id
  },
  // testnets
  // properties
  // network_id: identifier for network based on ethereum blockchain. Find out more at https://github.com/ethereumbook/ethereumbook/issues/110
  // gas: gas limit
  // gasPrice: gas price in gwei
  //use command: truffle migrate -f 2 --network <network name> --reset
  ropsten: {
    provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 3,
        gas: 3000000,
          gasPrice: 10000000000
  },
  kovan: {
    provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 42,
        gas: 3000000,
          gasPrice: 10000000000
  },
  rinkeby: {
    provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 4,
        gas: 3000000,
          gasPrice: 10000000000
  },
  // main ethereum network(mainnet)
  main: {
    provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 1,
        gas: 3000000,
          gasPrice: 10000000000
  }
}
}