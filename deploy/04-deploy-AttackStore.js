const { network, ethers } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const etherStoreContract = await ethers.getContract("EtherStore");
  const etherStoreContractAddress = etherStoreContract.address;

  log("-----------Deploying AttackStore Contract-----------");

  const attackStoreContract = await deploy("AttackStore", {
    from: deployer,
    log: true,
    args: [etherStoreContractAddress],
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log(
    `-----------AttackStore Contract Deployed-----------${attackStoreContract.address}`
  );
};

module.exports.tags = ["all", "reentrancy", "revised"];
