const { Web3 } = require('web3');
require('dotenv').config();
const SupplyChainABI = require('../../build/contracts/SupplyChain.json');

const web3js = new Web3(process.env.BLOCKCHAIN_NODE_URL);
const contract = new web3js.eth.Contract(SupplyChainABI.abi, process.env.CONTRACT_ADDRESS);

module.exports = { web3js, contract }