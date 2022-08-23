const { ethers } = require("hardhat");

const main = async () => {
  const etherStore = await ethers.getContract("EtherStore");
  console.log("##bank address", etherStore.address);

  const attackStore = await ethers.getContract("AttackStore");
  console.log("##attack address", attackStore.address);

  // Bank Balance Before Deposit
  const amountBeforeDeposit = await etherStore.getBalance();
  console.log(
    "## Before Deposit EtherStore Balance",
    ethers.utils.formatEther(amountBeforeDeposit)
  );

  console.log("---------------------------------------------------")

  // Add some balance in Bank
  const tx = await etherStore.deposit({
    value: ethers.utils.parseEther("50"),
  });
  await tx.wait(1);

  // Bank Balance After Deposit
  const amountAfterDeposit = await etherStore.getBalance();
  console.log(
    "## After Deposit EtherStore Balance",
    ethers.utils.formatEther(amountAfterDeposit)
  );

    console.log("---------------------------------------------------")

  // Check Attack Balance before Attack
  const attackBalanceBeforeAttack = await attackStore.getBalance();
  console.log(
    "## Initial Attack Balance",
    ethers.utils.formatEther(attackBalanceBeforeAttack)
  );

  console.log("---------------------------------------------------")

  // Do the attack
  const attackTx = await attackStore.attack({
    value: ethers.utils.parseEther("10"),
  });
  await attackTx.wait(1);

  // Check Attack Balance
  const attackBalance = await attackStore.getBalance();
  console.log(
    "## Final Attack Balance",
    ethers.utils.formatEther(attackBalance)
  );

  console.log("---------------------------------------------------")

  // Bank Balance After Attack
  const amountAfterAttack = await etherStore.getBalance();
  console.log(
    "## After Attack EtherStore Balance",
    ethers.utils.formatEther(amountAfterAttack)
  );
};

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error("##err", err);
    process.exit(1);
  }
})();
