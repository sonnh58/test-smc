import { ethers } from 'hardhat'
import hre from 'hardhat';
import { network } from './config';

const whitelists = [
	'0x6561EDEF35B8BeFEc781a71AC529f7136103925c',
	'0x557D55E71204CE7DfDc5C839446Dd34F1b299354'
];
const currencies = network.miaMainnet.currencies;
const router = network.miaMainnet.router;

const minMintAmount = 1;
const feeWithdraw = 13; // 1.3 %
const bonus = 10; // 1%
const minPriceMint = 25000;
const maxPriceRedeem = 27000;

const deployFactory = async () => {
   console.info('STAGE 1: DEPLOY VNDC');

	const vndcContract = (await ethers.deployContract("TokenVNDC", [router, minMintAmount, feeWithdraw, bonus, minPriceMint, maxPriceRedeem]));
	const vndcAddress = await vndcContract.getAddress()
	console.log('Address: ' + vndcAddress);
	await vndcContract.deploymentTransaction()?.wait(5)

	console.info('STAGE 2: SET VALUE');
	await (await vndcContract.addWhitelist(whitelists, true, true, '100000000000000000000', currencies[0])).wait(2);
	await (await vndcContract.setCurrencyList(currencies, true)).wait(2);

	// không cần, đã có giao diện mia swap
	// await (await vndcContract.approve(router, '24000000000')).wait(2);

	console.info('STAGE 3: VERIFY');
	await hre.run("verify:verify", {
		address: vndcAddress,
		constructorArguments: [router, minMintAmount, feeWithdraw, bonus, minPriceMint, maxPriceRedeem]
	});
}

deployFactory().catch((err) => {
	console.error(err)
	process.exitCode = 1
});

// npx hardhat run ./scripts/deploy-vndc-2.0.ts --network onusTestnet
// npx hardhat verify --network onusMainnet 0xb7C54F55FbdBEE191850Ea4417e01c7108b3b9d4 --constructor-args ./scripts/arguments.js
// npx hardhat flatten ./contracts/VNDC2.0.sol > ./contracts/VNDC2.0_flat.sol
