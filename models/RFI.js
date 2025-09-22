// models/RFI.js
const mongoose = require('mongoose');

const rfiSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  rfiNumber: {
    type: String,
    required: true,
    unique: true
  },
  dateSubmitted: {
    type: Date,
    required: true
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  correspondentName: {
    type: String,
    required: true,
    trim: true
  },
  trade: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
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
  responseDue: {
    type: Date
  },
  responseDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Open', 'Pending Response', 'Closed', 'Cancelled'],
    default: 'Open'
  },
  responseSummary: {
    type: String,
    trim: true
  },
  costImpact: {
    type: String,
    trim: true
  },
  timeImpact: {
    type: String,
    trim: true
  },
  attachments: [{
    filename: String,
    url: String,
    uploadDate: { type: Date, default: Date.now }
  }],
  followUpRequired: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RFI', rfiSchema);