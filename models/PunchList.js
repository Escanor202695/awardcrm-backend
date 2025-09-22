// models/PunchList.js
const mongoose = require('mongoose');

const punchListSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  itemNumber: {
    type: String,
    required: true,
    unique: true
  },
  dateIdentified: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  trade: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  dateAssigned: {
    type: Date,
    default: Date.now
  },
  targetCompletion: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Completed', 'Verified'],
    default: 'Open'
  },
  completionDate: {
    type: Date
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationDate: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  },
  cost: {
    type: Number,
    min: 0
  },
  photos: [{
    before: String,
    after: String,
    uploadDate: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('PunchList', punchListSchema);