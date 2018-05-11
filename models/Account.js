const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  iban: {type: String, unique: true, required: true},
  money: {type: Number, required: true, default:1000}
});

module.exports = mongoose.model('Account', AccountSchema);
