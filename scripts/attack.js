const { ethers } = require("hardhat");

// 0x5FbDB2315678afecb367f032d93F642f64180aa3 - Bank
// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 - Attack

const main = async () => {
  //   const bankAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  //   const attackAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  //   const signer = (await ethers.getSigners())[0];

  const bank = await ethers.getContract("Bank");
  console.log("##bank address", bank.address);

  const attackContract = await ethers.getContract("Attack");
  console.log("##attack address", attackContract.address);

  // Bank Balance Before Deposit
  const amountBeforeDeposit = await bank.getBalance();
  console.log(
    "## Before Deposit Balance",
    ethers.utils.formatEther(amountBeforeDeposit)
  );

  // Add some balance in Bank
  const tx = await bank.deposit({ value: ethers.utils.parseEther("100") });
  await tx.wait(1);

  // Bank Balance After Deposit
  const amountAfterDeposit = await bank.getBalance();
  console.log(
    "## After Deposit Balance",
    ethers.utils.formatEther(amountAfterDeposit)
  );

  // Get bank address
  const bankAddress = await attackContract.getBankAddress();
  console.log("##bankAddress", bankAddress);

  // Do the attack
  const attackTx = await attackContract.attack({
    value: ethers.utils.parseEther("10"),
  });
  await attackTx.wait(1);

  // Check Attack Balance
  //   const attackBalance = await attackContract.getBalance();
  //   console.log(
  //     "## Final Attack Balance",
  //     ethers.utils.formatEther(attackBalance)
  //   );

  const attackBankBalance = await attackContract.getBankBalance();
  console.log(
    "## Final Bank Balance",
    attackBankBalance.toString()
  );

  const randomBalance = await attackContract.getRandom();
  console.log("## Random Balance", randomBalance.toString());
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
