import { ethers } from 'hardhat'
import hre from 'hardhat';

const deployFactory = async () => {
	console.info('STAGE 1: DEPLOY USDT');

	const stableCoinContract = await ethers.deployContract("USDT");  
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
