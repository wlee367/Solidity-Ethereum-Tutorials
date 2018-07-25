pragma solidity ^0.4.17;

contract Inbox{
    string public message;

    constructor(string initial_message) public{
        message = initial_message;
    }

    function setMessage(string newMessage) public{
        message = newMessage;
    }
}