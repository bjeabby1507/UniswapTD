pragma solidity ^0.6.0;
import './ERC20Token.sol';
import './DummyToken.sol';
import "./utils/IUniswapV2Factory.sol";
import "./utils/IUniswapV2Pair.sol";
import "./utils/IUniswapV2Router02.sol";

contract ExerciceSolution {
    ERC20Token public mytoken;
    DummyToken public dummyToken;
    IUniswapV2Factory public uniswapV2Factory;
    IUniswapV2Router02 public uniswapV2Router02;
    address public WETH;
    address public Owner;

    constructor( ERC20Token _mytoken, DummyToken _dummyToken, IUniswapV2Factory _uniswapV2Factory,IUniswapV2Router02 _uniswapV2Router02, address _WETH) 
	public 
	{
		mytoken = _mytoken;
        dummyToken = _dummyToken;
        uniswapV2Factory = _uniswapV2Factory; //0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f
        uniswapV2Router02 = _uniswapV2Router02; //0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
        WETH= _WETH; //0xc778417e063141139fce010982780140aa0cd5ab
        Owner = msg.sender;
	}

    modifier onlyOwner() {
        require(msg.sender == Owner );
        _;
    }

    fallback () external payable 
	{}
    
	receive () external payable 
	{}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function sendViaCall(address payable _to) public payable onlyOwner {
        // Call returns a boolean value indicating success or failure.
        (bool sent, bytes memory data) = _to.call.value(address(this).balance)("");
        require(sent, "Failed to send Ether");
    }

    event AddedLiquidity(address sender , bool status,uint amountToken, uint amountETH, uint liquidity);
    function addLiquidity() public {
        uint amountTokenDesired = 500 * 10 ** mytoken.decimals();
        // checking ETH balance token in the contract
        require(address(this).balance > 0, "Not enough ether in contract");
        // checking token balance token in the contract
        uint mytokenBalanceInContract =mytoken.balanceOf(address(this));
        require(mytokenBalanceInContract >0 , "Not enough token in contract");
        //uniswapV2Router02.addLiquidityETH(token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline);
        //allownace of at least amountTokenDesired : to the router
        require(mytoken.approve(address(uniswapV2Router02), amountTokenDesired), 'approve failed.');
        uint amountTokenMin = 0;
        //uint amountEthMin = (getAmountInMin(address(mytoken),WETH,amountTokenDesired))*11/10; //amountETHDesired
        uint amountEthMin = 1;
        (uint amountToken, uint amountETH, uint liquidity)= uniswapV2Router02.addLiquidityETH.value(amountEthMin)(address(mytoken),amountTokenDesired,amountTokenMin,amountEthMin,address(this), block.timestamp + 200);
        emit AddedLiquidity(address(this),true,amountToken,amountETH,liquidity);
        // refund leftover ETH to user
        Owner.call.value(address(this).balance)("");
    }

    event WithdrawLiquidity(address sender , bool status,uint amountToken, uint amountETH);
	function withdrawLiquidity() public {
        uint liquidity = 5 * 10 ** mytoken.decimals();
        //allownace of at least liquidity token to remove : to the router
        require(mytoken.approve(address(uniswapV2Router02), liquidity), 'approve failed.');
        uint amountTokenMin = 0;
        //uint amountEthMin = getAmountInMin(address(mytoken),WETH,liquidity);
        uint amountEthMin = 1;
        //uniswapV2Router02.removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
        (uint amountToken, uint amountETH) = uniswapV2Router02.removeLiquidityETH(address(mytoken),liquidity,amountTokenMin, amountEthMin, address(this), block.timestamp + 200);
        emit WithdrawLiquidity (address(this),true,amountToken,amountETH);
    }

	function swapYourTokenForDummyToken() public {
        // checking token balance token to swap
        uint mytokenBalance =mytoken.balanceOf(Owner);
        require(mytokenBalance >0 , "Not enough token to swap");
        // we transfer the token in our contract
        uint amountIn = 50 * 10 ** mytoken.decimals();
        //uint amountOutMin = getAmountOutMin(address(mytoken),address(dummyToken),amountIn);
        uint amountOutMin =  1;
        // approve the contract to withdraw token 
        //require(mytoken.approve(address(this), amountIn), 'approve contract failed.');
        //mytoken.transferFrom(Owner, address(this), amountIn);
        //require(mytoken.transferFrom(Owner, address(this), amountIn), 'transferFrom failed.');
        // checking token balance token in the contract to swap
        uint mytokenBalanceInContract =mytoken.balanceOf(address(this));
        require(mytokenBalanceInContract >0 , "Not enough token in contract to swap");
        // approuve the router to withdraw my token
        require(mytoken.approve(address(uniswapV2Router02), amountIn), 'approve failed.');
        // now swap
        //get path
        address[] memory path = new address[](3);
        path[0] =address(mytoken);
        path[1] =WETH;
        path[2] =address(dummyToken);
        //uniswapV2Router02.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline);
        uniswapV2Router02.swapExactTokensForTokens(amountIn,amountOutMin,path, address(this), block.timestamp + 200);

    }

	function swapYourTokenForEth() public {
        // checking token balance token to swap
        uint mytokenBalance =mytoken.balanceOf(Owner);
        require(mytokenBalance >0 , "Not enough token to swap");
        // we transfer the token in our contract
        uint amountIn = 50 * 10 ** mytoken.decimals();
        //uint amountOutMin = getAmountOutMin(address(mytoken),WETH,amountIn);
        uint amountOutMin =  1;
        // approuve the contract to withdraw token 
        //require(mytoken.approve(address(this), amountIn), 'approve contract failed.');
        //require(mytoken.transferFrom(Owner, address(this), amountIn), 'transferFrom failed.');
        // checking token balance token in the contract to swap
        uint mytokenBalanceInContract =mytoken.balanceOf(address(this));
        require(mytokenBalanceInContract >0 , "Not enough token in contract to swap");
        // approuve the router to withdraw my token
        require(mytoken.approve(address(uniswapV2Router02), amountIn), 'approve failed.');
        // now swap
        //get path
        address[] memory path = new address[](2);
        path[0] =address(mytoken);
        path[1] =WETH;
        //uniswapV2Router02.swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline);
        uniswapV2Router02.swapExactTokensForETH(amountIn,amountOutMin, path, address(this), block.timestamp + 200);

    }

    //this function will return the minimum amount out from a swap
    function getAmountOutMin(
        address _tokenIn,
        address _tokenOut,
        uint _amountIn
    ) public returns (uint) {
        address[] memory path;
        if (_tokenIn == WETH || _tokenOut == WETH) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = WETH;
            path[2] = _tokenOut;
        }

        // same length as path
        uint[] memory amountOutMins = uniswapV2Router02.getAmountsOut(
            _amountIn,
            path
        );

        return amountOutMins[path.length - 1];
    }

    //this function will return the minimum amount in required
    function getAmountInMin(
        address _tokenIn,
        address _tokenOut,
        uint _amountOut
    ) public returns (uint) {
        address[] memory path;
        if (_tokenIn == WETH || _tokenOut == WETH) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = WETH;
            path[2] = _tokenOut;
        }

        // same length as path
        uint[] memory amountInMins = uniswapV2Router02.getAmountsIn(
            _amountOut,
            path
        );

        return amountInMins[path.length - 1];
    }
}