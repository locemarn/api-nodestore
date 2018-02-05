const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const schema   = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  }
})

module.exports = mongoose.model('Customer', schema)