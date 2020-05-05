const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({ // schema de mongoose
  user: [{
    type: Schema.ObjectId, // objecta id porque le seteare el id de mi schema de users
    ref: 'users', // users is my collection (table in mysql) of MongoDB
  }],
  message: {
    type: String,
    required: true
  },
  date: Date,
})

// collection (table en mysql) name is messages
const model = mongoose.model('messages', mySchema);
module.exports = model