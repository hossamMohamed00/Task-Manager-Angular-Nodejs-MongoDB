const mongoose = require('mongoose')

// Create list schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 64,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  listId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
