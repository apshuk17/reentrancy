const { network } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("-----------Deploying EtherStore Contract-----------");

  const etherStoreContract = await deploy("EtherStore", {
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log(`-----------EtherStore Contract Deployed-----------${etherStoreContract}`);
};

module.exports.tags = ["all", "reentrancy", "revised"];
