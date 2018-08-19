import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !=='undefined' ) {
    //we are in the browser! AND Metamask has injected a version of web3 aka running
    web3 = new Web3(window.web3.currentProvider);
} else {
    //if the user doesn't have metamask
    // OR
    //we are on the server
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/ffZJQmtFJn6leNLNzyUB',
    );
    web3 = new Web3(provider);
}

export default web3;