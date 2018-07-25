/**
 * Versioning issues around web3:
 *
 * Web3 is the main library that connects JS with Ethereum network
 * There are 2 versions out right now (v0.21.x OR V1.X.X)
 * this tutorial goes through the new version lot of people
 * are using the older version of web3, and the 2 version are different
 * earlier version doesn't have callbacks/promises etc
 *
 *
 * Web3 always expects a provider which the Ganache library helps with
 *
 * class Car{
    park(){
        return 'stopped';
    }

    drive(){
        return 'vroom';
    }
}

let car; //now the file knows there's a variable called car
//const is short for constant

beforeEach(()=>{
    car = new Car();
});

describe('Car', ()=>{
    it('can park', ()=>{
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', ()=>{
        assert.equal(car.drive(), 'vroom');
    });
});

 */

const assert = require('assert'); //for testing
const ganache = require('ganache-cli'); //local ethereum test network
const Web3 = require('web3'); //uppercase bc this is a constructor function

const provider = ganache.provider();
const web3 = new Web3(provider);
//const web3 = new Web3(ganache.provider());//lowercase means instance
const {interface, bytecode} = require('../compile');
//mocha starts -> deploy new contract -> manipulate contract
// -> make an assertion about the contract -> deploy a new contract
// ->repeat

//Ganache-cli makes a set of accounts that are unlocked
//unlocked means they don't need a private key to use it

let accounts;
let inbox;

beforeEach(async()=>{
    // Get a list of all accounts
    //every function we call with web3 is asynchronous
    //so getACcounts will return a promise (almost every)
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface)) //there is a type of contract that has an interface
        //that web3 can interact with.
        .deploy({ data: bytecode, arguments: ['Hi there'] }) //tell web3 to deploy, creates a transaction object
        .send({ from:accounts[0], gas: '1000000' }) //sends the transaction that creates the contract

    inbox.setProvider(provider);
});

describe('Inbox', ()=>{
    it('deploys a contract', ()=>{
        assert.ok(inbox.options.address); //makes an assertion that whatever we pass in to the function exists 
                                        // and is not null
    });

    it('has a default message', async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there')
    });

    it('can change the message', async()=>{
        //inbox.methods is the way we get data and change it
        await inbox.methods.setMessage('bye').send({ from:accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    })
});