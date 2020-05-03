const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({ // schema de mongoose
  user: String,
  message: {
    type: String,
    required: true
  },
  date: Date,
})

// collection (table en mysql) name is messages
const model = mongoose.model('messages', mySchema);
module.exports = model