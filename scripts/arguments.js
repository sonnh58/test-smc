const {network} = require("./config");
const minMintAmount = 1;
const feeWithdraw = 13; // 1.3 %
const bonus = 10; // 1%
const minPriceMint = 25000;
const maxPriceRedeem = 27000;
const router = network.miaMainnet.router;

module.exports = [router, minMintAmount, feeWithdraw, bonus, minPriceMint, maxPriceRedeem]
