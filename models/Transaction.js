const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  benefactor: {type: String, required: true},
  beneficiary: {type: String, required: true},
  amount: {type: Number, required: true}, //soldi della transizione
});

module.exports = mongoose.model('Transaction', TransactionSchema);
