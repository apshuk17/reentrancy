const { network } = require('hardhat');

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("-----------Deploying Bank Contract-----------")

    const bankContract = await deploy('Bank', {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: network.config.blockConfirmations || 1
    })

    log(`-----------Bank Contract Deployed-----------${bankContract.address}`)
}

module.exports.tags = ["all", "reentrancy"]