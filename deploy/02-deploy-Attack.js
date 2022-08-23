const { network, ethers } = require('hardhat');

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const bankContract = await ethers.getContract("Bank");
    const bankContractAddress = bankContract.address;

    log("-----------Deploying Attack Contract-----------")

    const attackContract = await deploy('Attack', {
        from: deployer,
        log: true,
        args: [bankContractAddress],
        waitConfirmations: network.config.blockConfirmations || 1
    })

    log(`-----------Attack Contract Deployed-----------${attackContract.address}`)
}

module.exports.tags = ["all", "reentrancy"]