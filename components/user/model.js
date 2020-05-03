const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: String,
  date: Date
})

const model = mongoose.model('users', mySchema);
module.exports = model;