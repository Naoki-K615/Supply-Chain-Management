const Transaction = require("../models/Transaction");
const Medicine = require("../models/Medicine");
const { web3js, contract } = require("../config/web3");

// @desc   Record a new transaction
// exports.addTransaction = async (req, res) => {
//   try {
//     const { medicineId, from, to, action } = req.body;

//     if (!medicineId || !from || !to || !action) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Ensure valid medicine exists
//     const medicine = await Medicine.findOne({ blockchainId: medicineId });
//     if (!medicine) {
//       return res.status(404).json({ error: "Medicine not found" });
//     }

//     // Get nonce & gas price
//     const nonce = await web3js.eth.getTransactionCount(from);
//     const gasPrice = await web3js.eth.getGasPrice();

//     const tx = {
//       from: from,
//       to: contract.options.address,
//       gas: 2000000,
//       gasPrice: gasPrice,
//       nonce: nonce,
//       data: contract.methods.transferMedicine(medicineId, to).encodeABI(),
//     };

//     // Sign and send transaction
//     const signedTx = await web3js.eth.accounts.signTransaction(tx, process.env.OWNER_PRIVATE_KEY);
//     const receipt = await web3js.eth.sendSignedTransaction(signedTx.rawTransaction);

//     // Save transaction in MongoDB
//     const transaction = new Transaction({
//       medicineId,
//       participant: from,
//       action,
//       timestamp: Date.now(),
//     });

//     await transaction.save();

//     res.status(201).json({ message: "Transaction recorded successfully", transaction });

//   } catch (error) {
//     console.error("Error adding transaction:", error);
//     res.status(500).json({ error: "Error adding transaction" });
//   }
// };

// @desc   Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ timestamp: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions" });
  }
};

exports.recordTransaction = async (req, res) => {
  try {
      const { medicineId, participant, action, timestamp } = req.body;
      const transaction = new Transaction({ medicineId, participant, action, timestamp });
      await transaction.save();
      res.status(201).json({ message: 'Transaction recorded successfully', transaction });
  } catch (error) {
      res.status(500).json({ message: 'Error recording transaction', error });
  }
};