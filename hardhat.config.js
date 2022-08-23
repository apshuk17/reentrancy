require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    localhost: {
      chainId: 31337,
      blockConfirmations: 1,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  solidity: {
    compilers: [{ version: "0.8.9" }, { version: "0.8.11" }],
  },
};
