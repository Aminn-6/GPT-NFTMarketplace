require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config(); // dotenv package ko import karna

const fs = require('fs');

// Define a custom task to print the list of accounts
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// Export Hardhat configuration
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    localganache: {
      url: process.env.PROVIDER_URL,  // ENV se URL fetch kar raha hai
      accounts: [`0x${process.env.PRIVATE_KEY}`]  // ENV se private key fetch kar raha hai
    }
  },
  solidity: {
    version: "0.8.20", // Update this line to match OpenZeppelin contracts
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
