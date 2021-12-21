const mongoose = require('mongoose')

// Create list schema
const listSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 64,
    trim: true,
    required: true
  }
})

const List = mongoose.model('List', listSchema)

module.exports = List
