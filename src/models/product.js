const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const schema   = new Schema({
  title: {
    type: String,
    required: [true, 'campo obrigatório'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'campo obrigatório'],
    trim: true,
    index: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'campo obrigatório']
  },
  price: {
    type: Number,
    required: [true, 'campo obrigatório']
  },
  active: {
    type: Boolean,
    required: [true, 'campo obrigatório'],
    default: true
  },
  tags: [{
    type: String,
    required: [true, 'campo obrigatório']
  }]
})

module.exports = mongoose.model('Product', schema)