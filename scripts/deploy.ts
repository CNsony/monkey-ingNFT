import hre,{ethers} from "hardhat";

async function main() {
    const provider = ethers.provider;
    const blockNumber = await provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);
    const RoboPunkNFT = await hre.ethers.deployContract("RoboPunkNFT");
    await RoboPunkNFT.deployed();
    console.log( `RoboPunkNFT deployed to ${RoboPunkNFT.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});