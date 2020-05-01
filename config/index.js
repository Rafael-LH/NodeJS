require('dotenv').config();

const CONFIG = {
  uri: process.env.MONGO_URI,
  database: process.env.MONGO_DB
}

module.exports = CONFIG;