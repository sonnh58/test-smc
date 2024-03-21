import { ethers } from 'hardhat'
import hre from 'hardhat';

const pancakeSwapRouter = '0xD99D1c33F9fC3444f8101754aBC46c52416550D1';
const minMintAmount = 1;
const feeWithdraw = 3;

const deployFactory = async () => {
	console.info('STAGE 1: DEPLOY USDC');

	const stableCoinContract = await ethers.deployContract("USDC");  
	const stableCoinAddress = await stableCoinContract.getAddress()
	await stableCoinContract.waitForDeployment();

	await hre.run("verify:verify", {
		address: stableCoinAddress
	});
}

deployFactory().catch((err) => {
	console.error(err)
	process.exitCode = 1
})
