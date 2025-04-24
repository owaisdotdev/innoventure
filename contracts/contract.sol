// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StartupEscrow is ReentrancyGuard, Ownable {
    IERC20 public usdc;
    PlatformEquity public equityToken;

    enum State { INITIALIZED, FUNDED, ACTIVE, MILESTONE_APPROVED, DISPUTED, FAILED, COMPLETED, REFUNDED, PAUSED }
    enum MilestoneState { PENDING, APPROVED, DISPUTED }

    struct Milestone {
        uint256 amount;
        bool approved;
        uint256 deadline;
        string ipfsHash;
        MilestoneState state;
    }

    struct Investment {
        address investor;
        address startup;
        uint256 totalAmount;
        uint256 amountDeposited;
        uint256 amountReleased;
        uint256 deadline;
        State state;
        Milestone[] milestones;
    }

    mapping(uint256 => Investment) public investments;
    uint256 public investmentCount;

    modifier onlyInvestor(uint256 investmentId) {
        require(msg.sender == investments[investmentId].investor, "Not the investor");
        _;
    }

    modifier onlyStartup(uint256 investmentId) {
        require(msg.sender == investments[investmentId].startup, "Not the startup");
        _;
    }

    modifier notPaused() {
        require(investments[investmentCount].state != State.PAUSED, "Contract is paused");
        _;
    }

    constructor(IERC20 _usdc) Ownable() {
        usdc = _usdc;
        equityToken = new PlatformEquity();
    }

    // ---- Events ----
    event InvestmentCreated(uint256 investmentId, address investor, address startup, uint256 totalAmount);
    event EquityMinted(address to, uint256 amount);
    event FundsDeposited(uint256 investmentId, uint256 amount);
    event MilestoneAdded(uint256 investmentId, uint256 milestoneIndex, uint256 amount, uint256 deadline, string ipfsHash);
    event MilestoneApproved(uint256 investmentId, uint256 milestoneIndex);
    event MilestoneDisputed(uint256 investmentId, uint256 milestoneIndex);
    event FundsReleased(uint256 investmentId, uint256 amount);
    event RefundIssued(uint256 investmentId, uint256 amount);
    event InvestmentPaused(uint256 investmentId);
    event InvestmentUnpaused(uint256 investmentId);

    // ---- ERC20 Token (Platform Equity) ----
    contract PlatformEquity is ERC20 {
        address public minter;

        constructor() ERC20("Platform Equity", "EQUITY") {
            minter = msg.sender;
        }

        function mint(address to, uint256 amount) external {
            require(msg.sender == minter, "Only escrow contract can mint");
            _mint(to, amount);
        }
    }

    // ---- Core Logic ----

    function createInvestment(address _startup, uint256 _totalAmount, uint256 _deadline) external returns (uint256) {
        investmentCount++;
        uint256 investmentId = investmentCount;

        Investment storage newInvestment = investments[investmentId];
        newInvestment.investor = msg.sender;
        newInvestment.startup = _startup;
        newInvestment.totalAmount = _totalAmount;
        newInvestment.amountDeposited = 0;
        newInvestment.amountReleased = 0;
        newInvestment.deadline = _deadline;
        newInvestment.state = State.INITIALIZED;

        // Mint platform equity tokens to investor (e.g., 1:1 with investment)
        equityToken.mint(msg.sender, _totalAmount);
        emit EquityMinted(msg.sender, _totalAmount);

        emit InvestmentCreated(investmentId, msg.sender, _startup, _totalAmount);
        return investmentId;
    }

    function deposit(uint256 investmentId, uint256 amount) external notPaused {
        Investment storage inv = investments[investmentId];
        require(msg.sender == inv.investor, "Not the investor");
        require(inv.state == State.INITIALIZED, "Investment not initialized or already funded");
        require(amount > 0, "Amount must be greater than 0");

        usdc.transferFrom(msg.sender, address(this), amount);
        inv.amountDeposited += amount;
        inv.state = State.FUNDED;

        emit FundsDeposited(investmentId, amount);
    }

    function addMilestone(
        uint256 investmentId,
        uint256 amount,
        uint256 deadline,
        string memory ipfsHash
    ) external onlyOwner {
        Investment storage inv = investments[investmentId];
        require(inv.state != State.REFUNDED && inv.state != State.COMPLETED, "Investment is completed or refunded");

        inv.milestones.push(Milestone({
            amount: amount,
            approved: false,
            deadline: deadline,
            ipfsHash: ipfsHash,
            state: MilestoneState.PENDING
        }));

        emit MilestoneAdded(investmentId, inv.milestones.length - 1, amount, deadline, ipfsHash);
    }

    function approveMilestone(uint256 investmentId, uint256 milestoneIndex) external notPaused {
        Investment storage inv = investments[investmentId];
        require(msg.sender == inv.investor || msg.sender == inv.startup, "Only investor or startup can approve");
        require(milestoneIndex < inv.milestones.length, "Invalid milestone");

        Milestone storage milestone = inv.milestones[milestoneIndex];
        require(milestone.state == MilestoneState.PENDING, "Milestone already processed");

        milestone.state = MilestoneState.APPROVED;
        inv.amountReleased += milestone.amount;
        usdc.transfer(inv.startup, milestone.amount);

        emit MilestoneApproved(investmentId, milestoneIndex);
    }

    function disputeMilestone(uint256 investmentId, uint256 milestoneIndex) external notPaused {
        Investment storage inv = investments[investmentId];
        require(msg.sender == inv.investor || msg.sender == inv.startup, "Only investor or startup can dispute");
        require(milestoneIndex < inv.milestones.length, "Invalid milestone");

        Milestone storage milestone = inv.milestones[milestoneIndex];
        require(milestone.state == MilestoneState.PENDING, "Milestone already processed");

        milestone.state = MilestoneState.DISPUTED;

        emit MilestoneDisputed(investmentId, milestoneIndex);
    }

    function issueRefund(uint256 investmentId) external onlyInvestor(investmentId) notPaused {
        Investment storage inv = investments[investmentId];
        require(inv.state != State.COMPLETED && inv.state != State.REFUNDED, "Already completed or refunded");
        require(block.timestamp > inv.deadline, "Cannot refund yet");

        uint256 refundAmount = inv.amountDeposited - inv.amountReleased;
        inv.state = State.REFUNDED;
        usdc.transfer(inv.investor, refundAmount);

        emit RefundIssued(investmentId, refundAmount);
    }

    function pauseInvestment(uint256 investmentId) external onlyOwner {
        Investment storage inv = investments[investmentId];
        require(inv.state != State.PAUSED, "Already paused");
        inv.state = State.PAUSED;
        emit InvestmentPaused(investmentId);
    }

    function unpauseInvestment(uint256 investmentId) external onlyOwner {
        Investment storage inv = investments[investmentId];
        require(inv.state == State.PAUSED, "Not paused");
        inv.state = State.FUNDED;
        emit InvestmentUnpaused(investmentId);
    }

    function updateMilestoneProgress(uint256 investmentId, uint256 milestoneIndex, string memory newIpfsHash) external onlyStartup(investmentId) {
        Investment storage inv = investments[investmentId];
        require(milestoneIndex < inv.milestones.length, "Invalid milestone");
        inv.milestones[milestoneIndex].ipfsHash = newIpfsHash;
    }
}