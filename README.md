# AMM 101

## Introduction
Welcome! This is an automated workshop that will guide you into using Uniswap and doing a simple integration in a smart contract.
It is aimed at developpers that are familiar with Solidity and ERC20 

## How to work on this TD
### Introduction
The TD has three components:
- An ERC20 token, ticker TD-AMM-101, that is used to keep track of points 
- An evaluator contract, that is able to mint and distribute TD-ERC20-101 points
- A dummy ERC20 token that you'll trade in the beginning of the workshop

Your objective is to gather as many TD-AMM-101 points as possible. Please note :
- The 'transfer' function of TD-AMM-101 has been disabled to encourage you to finish the TD with only one address
- You can answer the various questions of this workshop with different contracts. However, an evaluated address has only one evaluated contract at a time. To change the evaluated contract associated with your address, call `submitExercice()`  with that specific address.
- You will also have to deploy an ERC20 and register it with `submitErc20()`  
- In order to receive points, you will have to do execute code in `Evaluator.sol` such that the function `TDERC20.distributeTokens(msg.sender, n);` is triggered, and distributes n points.
- This repo contains an interface `IExerciceSolution.sol`. Your ERC20 contract will have to conform to this interface in order to validate the exercice; that is, your contract needs to implement all the functions described in `IExerciceSolution.sol`. 
- A high level description of what is expected for each exercice is in this readme. A low level description of what is expected can be inferred by reading the code in `Evaluator.sol`.
- The Evaluator contract sometimes needs to make payments to buy your tokens. Make sure he has enough ETH to do so! If not, you can send ETH directly to the contract.

### Getting to work
- Clone the repo on your machine
- Install the required packages `npm install truffle`, `npm install @openzeppelin/contracts@3.4.1` , `npm install @truffle/hdwallet-provider`
- Rename `example-truffle-config.js` to `truffle-config.js` . That is now your truffle config file.
- Configure a seed for deployment of contracts in your truffle config file
- Register for an infura key and set it up in your truffle config file
- Download and launch Ganache
- Test that you are able to connect to the rinkeby network with `truffle console`
- Test that you are able to connect to the rinkeby network with `truffle console --network rinkeby`
- To deploy a contract, configure a migration in the [migration folder](migrations). Look at the way the TD is deploy and try to iterate
- Test your deployment in Ganache `truffle migrate`
- Deploy on Rinkeby `truffle migrate --network rinkeby --skip-dry-run`


## Points list
### Setting up
- Create a git repository and share it with the teacher
- Install truffle and create an empty truffle project. Create an infura API key to be able to deploy to the Rinkeby testnet
These points will be attributed manually if you do not manage to have your contract interact with the evaluator, or automatically in the first ERC20 question.

### Uniswap basics
- Find the dummyToken address by calling `dummyToken()` on the Evaluator
- Buy some units of dummyToken on Uniswap. You can do this using their website
- Prove that you own these tokens by calling `ex1_showIHaveTokens()` (2 pts)
- Provide liquidity to the Weth - dummyToken pool on Uniswap
- Prove that you own these tokens by calling `ex2_showIProvidedLiquidity()` (2 pts)

### ERC20 basics
- Call  `ex6a_getTickerAndSupply()` in the evaluator contract to receive a random ticker for your ERC20 token, as well as an initial token supply. You can read your assigned ticker and supply in `Evaluator.sol` by calling getters `readTicker()` and `readSupply()`  (2 pt)
- Create an ERC20 token contract with the proper ticker and supply 
- Deploy it to the Rinkeby testnet 
- Call `submitErc20()` in the Evaluator to configure the contract you want evaluated (Previous 3 points are attributed at that step)
- Call `ex6b_testErc20TickerAndSupply()` in the evaluator to receive your points (2 pts) 

### Uniswap basics - again
- Create a uniswap pool for you token and add liquidity to it
- Call `ex7_tokenIsTradableOnUniswap` to show your token is tradable on uniswap (5 pts)

### Uniswap integration
You will need to interact with UniswapV2Router02 in order to complete this part. It can be found [here](https://rinkeby.etherscan.io/address/0x7a250d5630b4cf539739df2c5dacb4c659f2488d#writeContract)
- Create a contract that can swap tokens in Uniswap in the WETH/Your token pool
- Submit your contract address using `submitExercice()` (repeat as needed)
- Prove your contract work by calling `ex8_contractCanSwapVsEth()` in the evaluator (1pts)
- Create a contract that can swap tokens in Uniswap in the dummyToken/Your token pool
- Prove your contract work by calling `ex9_contractCanSwapVsDummyToken()` in the evaluator (2pts)
- Create a contract that can deposit tokens in Uniswap in the WETH/Your token pool
- Prove your contract work by calling `ex10_contractCanProvideLiquidity()` in the evaluator (2pts)
- Create a contract that can withdraw tokens in Uniswap from the WETH/Your token pool
- Prove your contract work by calling `ex11_contractCanWithdrawLiquidity()` in the evaluator (2pts)

### Extra points
Extra points if you find bugs / corrections this TD can benefit from, and submit a PR to make it better.  Ideas:
- Adding a way to check the code of a specific contract was only used once (no copying) 
- Publish the code of the Evaluator on Etherscan using the "Verify and publish" functionnality 

## TD addresses
- Points contracts `0xC366a0CDcdcD2E0C3141acDC8302f0fCa53848a3`
- Evaluator `0x34342dE8bDFd22228350e65376109123CF1Bd7E8`

## Installing
npm install truffle`, `npm install @openzeppelin/contracts@3.4.1` , `npm install @truffle/hdwallet-provider`, `npm i @supercharge/strings`
## TD
- address : 0x6f7280BF25d0D4A3f47b874bEdDdc4Ff4Cb44Cd6 
```
truffle migrate -- network ganache --skip-dry-run (to test)
truffle migrate  --network rinkeby --skip-dry-run
```
#### Uniswap basics
- Interact with Evaluator contract and call dummyToken()  with [Mycrypto] to get the address contract then buy some units of dummyToken on Uniswap
#### ERC20 basics
Ticker = 0KoZ5
Supply = 944096955000000000000000000
ERC20Token 0x8baE1b7734CF0DE201435881296c6174cb024c41





