import { expect } from 'chai';
import hre from 'hardhat';
describe("Token contract",function(){
    it("Deploy should assign the total supply of tokens to the owner", async function(){
        const [owner] = await hre.ethers.getSigners();
        const hardhatToken = await hre.ethers.deployContract('Token');
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    })
})