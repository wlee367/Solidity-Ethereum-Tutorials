pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public{
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request{
        string description;
        uint value;
        address receipient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    constructor(uint minimum, address creator) public{
        manager = creator;
        minimumContribution = minimum;
    }
    function contribute() public payable{
        //payable makes the function able to
        //receive some amount of money.
        require(msg.value>minimumContribution);
        //msg.value is the value in wei

        approvers[msg.sender] = true;
        approversCount++;
    }
    function createRequest(string description, uint value, address receipient)
        public restricted{
        Request memory newRequest = Request ({
            description: description,
            value: value,
            receipient: receipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }
    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        //if this person already voted on the contract, and
        // their address exists in the mapping, return true
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;

    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        request.receipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}