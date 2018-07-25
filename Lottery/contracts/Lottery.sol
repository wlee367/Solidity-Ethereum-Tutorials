pragma solidity ^0.4.17;

contract Lottery {
    //type visibility variable name
    address public manager;

    address[] public players;

    constructor() public{
        manager = msg.sender;
    }

    //payable is a function type that lets you know that the function expects a
    // parameter, specifically ether or money. 
    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    //view type makes it unmodifiable
    function random() private view returns (uint){
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance); //0xacbasdfkjsdalf
        players = new address[](0);
    }

    //function modifier used solely to reduce the amount of code to write
    // kind of like a helper function 
    modifier restricted() {
        require( msg.sender== manager);
        _; //target: take out all the code from the function that the modifier 
        //is called, and put it in place of the _;
    }

    //view keyword makes the function not be able to change the data in the contract
    function getPlayers() public view returns (address[]){
        return players;
    }
}