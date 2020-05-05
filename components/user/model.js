const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: String,
  date: Date
})

// users (tabla en mysql) is my collection on Atlas MongoDB
const model = mongoose.model('users', mySchema);
module.exports = model;