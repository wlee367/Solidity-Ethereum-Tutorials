const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'unit seat tattoo pistol early brain session document kid believe there later',
    'https://rinkeby.infura.io/ffZJQmtFJn6leNLNzyUB',
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account: ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface)) //interface is the ABI
        .deploy({ data: bytecode, arguments:['Hi there'] })
        .send({gas: '1000000', from: accounts[0]});

    console.log('contract deployed to: ', result.options.address);
};

deploy();