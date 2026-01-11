const SupplyChain = artifacts.require("Supplychain");

module.exports = function(deployer) {
  deployer.deploy(SupplyChain, { gas: 6721975 });
};