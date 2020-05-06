const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
  users: [{
    type: Schema.ObjectId, // el typo de ObjectId hara referencia a nuestra coleccion de users
    ref: 'users' // users is my collection (table in mysql) of MongoDB
  }],
  date: Date,
});

// collection (table en mysql) name is chats
const model = mongoose.model('chats', mySchema);
module.exports = model;