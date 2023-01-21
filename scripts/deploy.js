const hre = require("hardhat");

async function getbalances(address) {
  const balancebigint = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balancebigint);
}

async function consolebalances(addresses) {
  for (const address of addresses) {
    console.log(`Address balance:`, await getbalances(address));
  }
}

async function consolememos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      ` At ${timestamp},name ${name}, address ${from} , message ${message}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory("chai");
  const contract = await chai.deploy(); //INSTANCE OF CONTRACT
  await contract.deployed();

  console.log("Address ", contract.address);

  const addresses = [owner.address, from1.address];
  console.log("Before Buying Chai");
  await consolebalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).buychai("from1", "Very Nice Chai", amount);
  await contract.connect(from2).buychai("from1", "Very Nice Course", amount);
  await contract
    .connect(from3)
    .buychai("from1", "Very Nice Information", amount);

  console.log("After Buying Chai");
  await consolebalances(addresses);

  const memos = await contract.getmemos();
  consolememos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
