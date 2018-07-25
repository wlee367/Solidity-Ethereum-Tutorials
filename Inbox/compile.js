/**
 * @compile.js
 * compile.js uses the path and fs library from node
 * to call the solidity compiler (solc) and compiles
 * our solidity files.
 */

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];
