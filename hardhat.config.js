require("@nomicfoundation/hardhat-toolbox");
require("dotenv".config());

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      // This value will be replaced on runtime
      url: process.env.INFURA_GOERLI,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
