pragma solidity ^0.5.10;

/*******************************************************************************
 *
 * Copyright (c) 2019 Modenero Corp.
 * Released under the MIT License.
 *
 * aBitSuite Community Mineable Token
 *
 * Token Symbol: SUITE
 *
 * A "mineable" token for the aBS community.
 *
 * Version 20.1.1
 *
 * https://modenero.com
 * support@modenero.com
 */


/*******************************************************************************
 *
 * SafeMath
 */
library SafeMath {
    function add(uint a, uint b) internal pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }
    function sub(uint a, uint b) internal pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }
    function mul(uint a, uint b) internal pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }
    function div(uint a, uint b) internal pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}


library ExtendedMath {
    //return the smaller of the two inputs (a or b)
    function limitLessThan(uint a, uint b) internal pure returns (uint c) {
        if (a > b) return b;
        return a;
    }
}


// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}


// ----------------------------------------------------------------------------
// Contract function to receive approval and execute function in one call
//
// Borrowed from MiniMeToken
// ----------------------------------------------------------------------------
contract ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes memory data) public;
}


// ----------------------------------------------------------------------------
// Owned contract
// ----------------------------------------------------------------------------
contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        newOwner = _newOwner;
    }

    function acceptOwnership() public {
        require(msg.sender == newOwner);
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}


// ----------------------------------------------------------------------------
// ERC20 Token, with the addition of symbol, name and decimals and an
// initial fixed supply
// ----------------------------------------------------------------------------
contract aBitSuite is ERC20Interface, Owned {
    using SafeMath for uint;
    using ExtendedMath for uint;

    string public symbol;
    string public name;
    uint8 public decimals;
    uint public _totalSupply;

    // starting reward
    uint public MAXIMUM_REWARD = 50;

    // re-adjustment time
    // NOTE: Bitcoin is 14 days.
    uint public _BLOCKS_PER_READJUSTMENT = 1024; // approx. 7 days

    // a big number is easier; just find a solution that is smaller
    // NOTE: Bitcoin uses `2**224`.
    uint public _MAXIMUM_TARGET = 2**234;

    // a little number
    uint public _MINIMUM_TARGET = 2**16;

    uint public miningTarget;
    uint public tokensMinted;
    uint public rewardEra;
    uint public maxSupplyForEra;
    uint public latestDifficultyPeriodStarted;

    // number of 'blocks' mined
    uint public epochCount;

    // generate a new one when a new reward is minted
    bytes32 public challengeNumber;

    // diagnostic purposes only
    address public lastRewardTo;
    uint public lastRewardAmount;
    uint public lastRewardEthBlockNumber;

    mapping(bytes32 => bytes32) solutions;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    event Mint(
        address indexed from,
        uint reward_amount,
        uint epochCount,
        bytes32 newChallengeNumber
    );

    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------
    constructor() public {
        symbol = 'SUITE';
        name = 'aBitSuite';
        decimals = 8;
        _totalSupply = 21000000 * 10**uint(decimals);

        tokensMinted = 0;
        rewardEra = 0;
        maxSupplyForEra = _totalSupply.div(2);
        miningTarget = _MAXIMUM_TARGET;
        latestDifficultyPeriodStarted = block.number;

        /* Begin the first mining epoch. */
        _startNewMiningEpoch();

        // The owner gets nothing! You must mine this ERC20 token
        // balances[owner] = _totalSupply;
        // Transfer(address(0), owner, _totalSupply);
    }

    /**
     * Mint
     */
    function mint(
        bytes32 _challengeDigest,
        uint256 _nonce
    ) public returns (bool success) {
        // the PoW must contain work that includes a recent
        // ethereum block hash (challenge number) and the
        // msg.sender's address to prevent MITM attacks
        bytes32 digest = keccak256(
            abi.encodePacked(challengeNumber, msg.sender, _nonce));

        // the challenge digest must match the expected
        if (digest != _challengeDigest) revert();

        // the digest must be smaller than the target
        if (uint256(digest) > miningTarget) revert();

        // only allow one reward for each challenge
        bytes32 solution = solutions[challengeNumber];
        solutions[challengeNumber] = digest;

        /* Validate solution. */
        // prevent the same answer from awarding twice
        if (solution != 0x0) {
            revert();
        }

        /* Retrieve mining reward. */
        uint rewardAmount = getMiningReward();

        /* Update sender's balance. */
        balances[msg.sender] = balances[msg.sender].add(rewardAmount);

        /* Update minted total. */
        tokensMinted = tokensMinted.add(rewardAmount);

        // Cannot mint more tokens than there are
        assert(tokensMinted <= maxSupplyForEra);

        // set readonly diagnostics data
        lastRewardTo = msg.sender;
        lastRewardAmount = rewardAmount;
        lastRewardEthBlockNumber = block.number;

        /* Begin the next epoch. */
        _startNewMiningEpoch();

        /* Emit log info. */
        emit Mint(
            msg.sender,
            rewardAmount,
            epochCount,
            challengeNumber // this is the NEXT block hash
        );

        /* Return success. */
        return true;
    }

    // a new 'block' to be mined
    function _startNewMiningEpoch() internal {
        // if max supply for the era will be exceeded next reward round then enter the new era before that happens

        // 40 is the final reward era, almost all tokens minted
        // once the final era is reached, more tokens will not be given out because the assert function
        if (tokensMinted.add(getMiningReward()) > maxSupplyForEra && rewardEra < 39) {
            rewardEra = rewardEra + 1;
        }

        // set the next minted supply at which the era will change
        // total supply is 2100000000000000  because of 8 decimal places
        maxSupplyForEra = _totalSupply - _totalSupply.div( 2**(rewardEra + 1));

        epochCount = epochCount.add(1);

        // every so often, readjust difficulty. Dont readjust when deploying
        if (epochCount % _BLOCKS_PER_READJUSTMENT == 0) {
            _reAdjustDifficulty();
        }

        // make the latest ethereum block hash a part of the next challenge for PoW to prevent pre-mining future blocks
        // do this last since this is a protection mechanism in the mint() function
        challengeNumber = blockhash(block.number - 1);
    }

    /**
     * Re-adjust Difficulty
     *
     * Readjust the target by 5 percent.
     *
     * NOTE: As of 2017 the bitcoin difficulty was up to 17 zeroes, it was
     * only 8 in the early days.
     * source: https://en.bitcoin.it/wiki/Difficulty#What_is_the_formula_for_difficulty.3F
     */
    function _reAdjustDifficulty() internal {
        // NOTE: assume 240 ethereum blocks per hour
        uint ethBlocksSinceLastDifficultyPeriod = block.number - latestDifficultyPeriodStarted;

        // we want miners to spend 10 minutes to mine each 'block',
        // about 40 ethereum blocks = one 0xbitcoin epoch (~15 sec/block)
        uint epochsMined = _BLOCKS_PER_READJUSTMENT;

        // NOTE: should be 40 times slower than ethereum
        uint targetEthBlocksPerDiffPeriod = epochsMined * 40;

        // if there were less eth blocks passed in time than expected
        if (ethBlocksSinceLastDifficultyPeriod < targetEthBlocksPerDiffPeriod) {
            uint excess_block_pct = (targetEthBlocksPerDiffPeriod.mul(100)).div( ethBlocksSinceLastDifficultyPeriod );

            uint excess_block_pct_extra = excess_block_pct.sub(100).limitLessThan(1000);
            // If there were 5% more blocks mined than expected then this is 5.  If there were 100% more blocks mined than expected then this is 100.
            // make it harder
            miningTarget = miningTarget.sub(miningTarget.div(2000).mul(excess_block_pct_extra));   //by up to 50 %
        } else {
            uint shortage_block_pct = (ethBlocksSinceLastDifficultyPeriod.mul(100)).div( targetEthBlocksPerDiffPeriod );

            uint shortage_block_pct_extra = shortage_block_pct.sub(100).limitLessThan(1000); //always between 0 and 1000

            // make it easier
            miningTarget = miningTarget.add(miningTarget.div(2000).mul(shortage_block_pct_extra));   //by up to 50 %
        }

        latestDifficultyPeriodStarted = block.number;

        if (miningTarget < _MINIMUM_TARGET) { // very difficult
            miningTarget = _MINIMUM_TARGET;
        }

        if (miningTarget > _MAXIMUM_TARGET) { // very easy
            miningTarget = _MAXIMUM_TARGET;
        }
    }

    /**
     * Get Challenge Number
     *
     * This is a recent ethereum block hash, used to prevent pre-mining
     * future blocks.
     */
    function getChallengeNumber() public view returns (bytes32) {
        return challengeNumber;
    }

    /**
     * Get Mining Difficulty
     *
     * The number of zeroes the digest of the PoW solution requires.
     * (auto adjusts)
     */
    function getMiningDifficulty() public view returns (uint) {
        return _MAXIMUM_TARGET.div(miningTarget);
    }

    /**
     * Get Mining Target
     */
    function getMiningTarget() public view returns (uint) {
        return miningTarget;
    }

    /**
     * Get Mining Reward
     *
     * NOTE: 21,000,000 coins total
     *
     * Reward begins at 50 and is cut in half every reward era
     * (as tokens are mined). Once we get half way thru the coins,
     * only get 25 per block every reward era, the reward amount halves.
     */
    function getMiningReward() public view returns (uint) {
        /* Set maximum reward. */
        uint maxReward = MAXIMUM_REWARD * 10**uint(decimals);

        /* Set divisor. */
        // NOTE: Will (exponentially) double each era.
        uint divisor = 2**rewardEra;

        return (maxReward).div(divisor);
    }

    /**
     * Get Mint Digest
     *
     * Help debug mining software.
     */
    function getMintDigest(
        bytes32 _challengeNumber,
        uint256 _nonce
    ) public view returns (bytes32 digest) {
        /* Calculate digest. */
        digest = keccak256(
            abi.encodePacked(_challengeNumber, msg.sender, _nonce));
    }

    /**
     * Check Mint Solution
     *
     * Help debug mining software.
     */
    function checkMintSolution(
        bytes32 _challengeNumber,
        bytes32 _challengeDigest,
        uint256 _nonce,
        uint _testTarget
    ) public view returns (bool success) {
        /* Retrieve digest. */
        bytes32 digest = getMintDigest(_challengeNumber, _nonce);

        /* Validate digest. */
        if (uint256(digest) > _testTarget) {
            revert();
        }

        /* Verify success. */
        success = (digest == _challengeDigest);
    }

    // ------------------------------------------------------------------------
    // Total supply
    // ------------------------------------------------------------------------
    function totalSupply() public view returns (uint) {
        return _totalSupply  - balances[address(0)];
    }

    // ------------------------------------------------------------------------
    // Get the token balance for account `tokenOwner`
    // ------------------------------------------------------------------------
    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }

    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to `to` account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    // ------------------------------------------------------------------------
    // Token owner can approve for `spender` to transferFrom(...) `tokens`
    // from the token owner's account
    //
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
    // recommends that there are no checks for the approval double-spend attack
    // as this should be implemented in user interfaces
    // ------------------------------------------------------------------------
    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    // ------------------------------------------------------------------------
    // Transfer `tokens` from the `from` account to the `to` account
    //
    // The calling account must already have sufficient tokens approve(...)-d
    // for spending from the `from` account and
    // - From account must have sufficient balance to transfer
    // - Spender must have sufficient allowance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(from, to, tokens);
        return true;
    }

    // ------------------------------------------------------------------------
    // Returns the amount of tokens approved by the owner that can be
    // transferred to the spender's account
    // ------------------------------------------------------------------------
    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    // ------------------------------------------------------------------------
    // Token owner can approve for `spender` to transferFrom(...) `tokens`
    // from the token owner's account. The `spender` contract function
    // `receiveApproval(...)` is then executed
    // ------------------------------------------------------------------------
    function approveAndCall(address spender, uint tokens, bytes memory data) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, address(this), data);
        return true;
    }

    // ------------------------------------------------------------------------
    // Don't accept ETH
    // ------------------------------------------------------------------------
    function () external payable {
        revert('HODL Your ETH!!');
    }

    // ------------------------------------------------------------------------
    // Owner can transfer out any accidentally sent ERC20 tokens
    // ------------------------------------------------------------------------
    function transferAnyERC20Token(address tokenAddress, uint tokens) public onlyOwner returns (bool success) {
        return ERC20Interface(tokenAddress).transfer(owner, tokens);
    }

}
