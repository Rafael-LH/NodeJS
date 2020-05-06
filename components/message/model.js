const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({ // schema de mongoose
  chat: {
    type: Schema.ObjectId,
    ref: 'chats'
  },
  user: [{
    type: Schema.ObjectId, // el typo de ObjectId hara referencia a nuestra coleccion de users
    ref: 'users', // users is my collection (table in mysql) of MongoDB
  }],
  message: {
    type: String,
    required: true
  },
  file: String,
  date: Date,
})

// collection (table en mysql) name is messages
const model = mongoose.model('messages', mySchema);
module.exports = model