const Str = require('@supercharge/strings');
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol"); 
var evaluator = artifacts.require("Evaluator.sol");
var tokenERC20 = artifacts.require("ERC20Token.sol");
var ExerciceSolution = artifacts.require("ExerciceSolution.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts);
		await deployERC20Token(deployer, network, accounts);
		await deployExerciceSolution(deployer, network, accounts); 
        await deployRecap(deployer, network, accounts); 
    });
};

async function deployTDToken(deployer, network, accounts) {
	// TDToken = await TDErc20.new("TD-AMM-101","TD-AMM-101",web3.utils.toBN("20000000000000000000000000000"))
	// dummyToken = await ERC20.new("dummyToken", "DTK", web3.utils.toBN("2000000000000000000000000000000"))
	uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f";
	wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab";
	uniswapV2Router02Address ="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
	TDToken = await TDErc20.at("0x89Aa93ac2f2B59a1c00294815fbE6b1e8438319e");
	console.log("######TDToken######");
	var mesPoints = await TDToken.balanceOf(accounts[0]);
	console.log(mesPoints.toString());

}

async function deployEvaluator(deployer, network, accounts) {
	//Evaluator = await evaluator.new(TDToken.address, dummyToken.address, uniswapV2FactoryAddress, wethAddress)
	Evaluator = await evaluator.at("0x90315516b2F5534ac68f109bA9412530EbECfac1");
	console.log("######Evaluator######");
	var exo = [1,2,5,6,7,8,9,10,11];
	for (var i of exo){
		var progresse = await Evaluator.exerciceProgression(accounts[0],i);
		console.log("exo "+i +" "+ progresse);
	}
	var DummyToken = await Evaluator.dummyToken();
	console.log("dummytoken "+DummyToken);
	dummyToken = await ERC20.at(DummyToken);

	//EXo1 : buy and check dummyToken on Uniswap
	//await Evaluator.ex1_showIHaveTokens();
	//var exo1=await Evaluator.exerciceProgression(accounts[0],1);
	//console.log("exo1 "+exo1);

	//EXo2 : provide liquidity to the Weth - dummyToken pool on Uniswap and check
	//await Evaluator.ex2_showIProvidedLiquidity();
	//var exo2=await Evaluator.exerciceProgression(accounts[0],2);
	//console.log("exo2 "+exo2);

	// EXo6 : receive a random ticker for your ERC20 token
	//await Evaluator.ex6a_getTickerAndSupply();
	//var ticker = await Evaluator.readTicker(accounts[0]);
	//console.log("ticker "+ticker);
	//var supply = await Evaluator.readSupply(accounts[0]);
	//console.log("supply "+supply);
	
}

async function deployERC20Token(deployer, network, accounts) {
	//ERC20Token = await tokenERC20.new("ERC20Token", "0KoZ5", web3.utils.toBN("944096955000000000000000000"));
	
	//var ticker = await Evaluator.readTicker(accounts[0]);
	//var supply = await Evaluator.readSupply(accounts[0]);
	//ERC20Token = await tokenERC20.new("ERC20Token", ticker,supply);

	ERC20Token = await tokenERC20.at("0x00eB1745C4Aa60e0DBDB9D9cDED83548430eeD58");
	console.log("######ERC20Token######");
	//var balanceOf = await ERC20Token.balanceOf(accounts[0]);
	//console.log(balanceOf.toString());
	var symbolToken = await ERC20Token.symbol();
	console.log("Token symbol " +symbolToken.toString());
	var supplyToken = await ERC20Token.totalSupply();
	console.log("Token supply " + supplyToken.toString());
	// submit token contract to Evaluator
	//await Evaluator.submitErc20(ERC20Token.address);
	submitErc20 = await Evaluator.hasBeenPaired(ERC20Token.address);
	console.log("submitErc20 "+submitErc20);

	//EXo6
	//await Evaluator.ex6b_testErc20TickerAndSupply();
	//var exo6=await Evaluator.exerciceProgression(accounts[0],6);
	//console.log("exo6 "+exo6);

	//EXo7
	//await Evaluator.ex7_tokenIsTradableOnUniswap();
	//var exo7=await Evaluator.exerciceProgression(accounts[0],7);
	//console.log("exo7 "+exo7);

}

async function deployExerciceSolution(deployer, network, accounts) {
	//ExerciceSolution= await ExerciceSolution.new(ERC20Token.address,dummyToken.address,uniswapV2FactoryAddress,uniswapV2Router02Address, wethAddress);
	ExerciceSolution = await ExerciceSolution.at("0x930e9E7c8D973Cb9ad1dB5405fdb010121e6BB73");
	const balance = await ExerciceSolution.getBalance();
	console.log("ETH balance " + balance);

	//EXo 8
	//await ERC20Token.approve(ExerciceSolution.address,web3.utils.toBN(500 * 10 **18), {from: accounts[0]});
	//await ERC20Token.increaseAllowance(ExerciceSolution.address,web3.utils.toBN(500 * 10 **18));
	//const allowance = await ERC20Token.allowance(accounts[0],ExerciceSolution.address);
	//console.log("allowance " + allowance);
	const Ownerbalance = await ERC20Token.balanceOf(accounts[0]);
	console.log("Owner balance  " + Ownerbalance );
	//await ERC20Token.transferFrom(accounts[0],ExerciceSolution.address,web3.utils.toBN(500 * 10 **18), {from: accounts[0]}); //test
	//await ERC20Token.transfer(ExerciceSolution.address,web3.utils.toBN('5000000000000000000000'));
	const balancecontract = await ERC20Token.balanceOf(ExerciceSolution.address);
	console.log("contract token balance " + balancecontract);
	//await ExerciceSolution.swapYourTokenForDummyToken(); //Error: execution reverted: UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT
	//await Evaluator.submitExercice(ExerciceSolution.address);
	//var exo8=await Evaluator.exerciceProgression(accounts[0],8);
	//console.log("exo8 "+exo8); 

	//EXo 9
	//sawait ExerciceSolution.swapYourTokenForEth(); //Error: execution reverted: UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT
	//await Evaluator.submitExercice(ExerciceSolution.address);
	//var exo9=await Evaluator.exerciceProgression(accounts[0],9);
	//console.log("exo9 "+exo9);

	//EXo 10
	//await ExerciceSolution.addLiquidity(); //Error: execution reverted: UniswapV2Library: INSUFFICIENT_AMOUNT
	//await Evaluator.submitExercice(ExerciceSolution.address);
	//await Evaluator.ex10_contractCanProvideLiquidity();
	//var exo10=await Evaluator.exerciceProgression(accounts[0],10);
	//console.log("exo10 "+exo10);
	
	//EXo 11
	//await ExerciceSolution.withdrawLiquidity(); //Error: execution reverted: UniswapV2Library: INSUFFICIENT_AMOUNT
	//await Evaluator.submitExercice(ExerciceSolution.address);
	//await Evaluator.ex11_contractCanWithdrawLiquidity();
	//var exo11=await Evaluator.exerciceProgression(accounts[0],11);
	//console.log("exo11 "+exo11);

	//getbat ETH from contract
	await ExerciceSolution.sendViaCall(accounts[0]);
}

async function deployRecap(deployer, network, accounts) {
	console.log("######Recap######");
	console.log("TDToken " + TDToken.address);
	console.log("Evaluator " + Evaluator.address);
	console.log("dummyToken " + dummyToken.address);
	console.log("ERC20Token " + ERC20Token.address);
	console.log("ExerciceSolution "+ ExerciceSolution.address);
}


