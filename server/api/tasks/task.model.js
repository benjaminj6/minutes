let mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
  _owner: {
    required: true,
    type: mongoose.Schema.ObjectId,
  },
  title: {
    type: String,
    required: true,
    default: 'My Task',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  time: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model('Task', taskSchema);

