import Web3 from 'web3';

// local instance of web3 and grabbing the current provider 
// property aka the rinekby test network
const web3 = new Web3(window.web3.currentProvider);

export default web3;