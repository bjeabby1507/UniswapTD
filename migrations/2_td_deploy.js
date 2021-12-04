const Str = require('@supercharge/strings');
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol"); 
var evaluator = artifacts.require("Evaluator.sol");
var tokenERC20 = artifacts.require("ERC20Token.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts);
		await deployERC20Token(deployer, network, accounts);
        await deployRecap(deployer, network, accounts); 
    });
};

async function deployTDToken(deployer, network, accounts) {
	// TDToken = await TDErc20.new("TD-AMM-101","TD-AMM-101",web3.utils.toBN("20000000000000000000000000000"))
	// dummyToken = await ERC20.new("dummyToken", "DTK", web3.utils.toBN("2000000000000000000000000000000"))
	uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f";
	wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab";
	TDToken = await TDErc20.at("0xC366a0CDcdcD2E0C3141acDC8302f0fCa53848a3");
	console.log("######TDToken######");
	var mesPoints = await TDToken.balanceOf(accounts[0]);
	console.log(mesPoints.toString());

}

async function deployEvaluator(deployer, network, accounts) {
	//Evaluator = await evaluator.new(TDToken.address, dummyToken.address, uniswapV2FactoryAddress, wethAddress)
	Evaluator = await evaluator.at("0x34342dE8bDFd22228350e65376109123CF1Bd7E8");
	console.log("######Evaluator######");
	var exo = [1,2,5,6,7,8,9,10,11];
	for (var i of exo){
		var progresse = await Evaluator.exerciceProgression(accounts[0],i);
		console.log("exo "+i +" "+ progresse);
	}
	var ticker = await Evaluator.readTicker(accounts[0]);
	console.log("ticker "+ticker);
	var supply = await Evaluator.readSupply(accounts[0]);
	console.log("supply "+supply);
	var DummyToken = await Evaluator.dummyToken();
	console.log("dummytoken "+DummyToken);
	dummyToken = await ERC20.at(DummyToken);

	//await Evaluator.submitErc20("0x8baE1b7734CF0DE201435881296c6174cb024c41");
	submitErc20 = await Evaluator.hasBeenPaired("0x8baE1b7734CF0DE201435881296c6174cb024c41");
	console.log("submitErc20 "+submitErc20);
	//await Evaluator.ex6b_testErc20TickerAndSupply();
	//await Evaluator.ex7_tokenIsTradableOnUniswap();
	//var exo7=await Evaluator.exerciceProgression(accounts[0],7);
	//console.log("exo7 "+exo7);

	
}

async function deployERC20Token(deployer, network, accounts) {
	//ERC20Token = await tokenERC20.new("ERC20Token", "0KoZ5", web3.utils.toBN("944096955000000000000000000"));
	//var ticker = await Evaluator.readTicker(accounts[0]);
	//var supply = await Evaluator.readSupply(accounts[0]);
	//ERC20Token = await tokenERC20.new("ERC20Token", ticker,supply);

	ERC20Token = await tokenERC20.at("0x8baE1b7734CF0DE201435881296c6174cb024c41");
	console.log("######ERC20Token######");
	var balanceOf = await ERC20Token.balanceOf(accounts[0]);
	//console.log(balanceOf.toString());
	var symbolToken = await ERC20Token.symbol();
	console.log("Token symbol " +symbolToken.toString());
	var supplyToken = await ERC20Token.totalSupply();
	console.log("Token supply " + supplyToken.toString());

}

async function deployRecap(deployer, network, accounts) {
	console.log("######Recap######");
	console.log("TDToken " + TDToken.address);
	console.log("Evaluator " + Evaluator.address);
	console.log("dummyToken " + dummyToken.address);
	console.log("ERC20Token " + ERC20Token.address);
}


