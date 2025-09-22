// models/ChangeOrder.js
const mongoose = require('mongoose');

const changeOrderSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  requestedBy: {
    type: String,
    required: true,
    trim: true
  },
  reason: {
    type: String,
    enum: ['Design Change', 'Field Condition', 'Owner Request', 'Code Requirement', 'Other'],
    default: 'Other'
  },
  costImpact: {
    type: Number,
    required: true
  },
  timeImpact: {
    type: Number,
    required: true,
    comment: 'Days'
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Under Review'],
    default: 'Pending'
  },
  approvalDate: {
    type: Date
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String,
    trim: true
  },
  attachments: [{
    filename: String,
    url: String,
    uploadDate: { type: Date, default: Date.now }
  }],
  originalBudget: Number,
  revisedBudget: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('ChangeOrder', changeOrderSchema);