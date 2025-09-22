// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  invoiceNumber: {
    type: String,
    required: true,
    trim: true
  },
  vendor: {
    type: String,
    required: true,
    trim: true
  },
  invoiceDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Overdue', 'Cancelled'],
    default: 'Pending'
  },
  paymentDate: {
    type: Date
  },
  checkNumber: {
    type: String,
    trim: true
  },
  retentionHeld: {
    type: Number,
    default: 0,
    min: 0
  },
  netPaid: {
    type: Number,
    default: 0,
    min: 0
  },
  notes: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Materials', 'Labor', 'Equipment', 'Permits', 'Utilities', 'Other'],
    default: 'Other'
  },
  attachments: [{
    filename: String,
    url: String,
    uploadDate: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', expenseSchema);