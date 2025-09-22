const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  taskName: {
    type: String,
    required: true,
    trim: true
  },
  trade: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  durationDays: {
    type: Number,
    default: function() {
      return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24)) + 1;
    }
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
    default: 'Not Started'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  },
  notes: {
    type: String,
    trim: true
  },
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);