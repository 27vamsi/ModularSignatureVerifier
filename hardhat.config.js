require("@nomiclabs/hardhat-ethers");
require("dotenv").config(); 

module.exports = {
  solidity: "0.8.20", 
  networks: {
    sepolia: {
      url: process.env.INFURA_URL, //  Infura URL
      accounts: [process.env.PRIVATE_KEY] //  private key
    }
  }
};
