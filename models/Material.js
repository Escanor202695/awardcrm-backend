// models/Material.js
const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  poNumber: {
    type: String,
    required: true,
    unique: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  materialDescription: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: String,
    required: true,
    trim: true
  },
  unitPrice: {
    type: Number,
    min: 0
  },
  totalCost: {
    type: Number,
    min: 0
  },
  deliveryTime: {
    type: String,
    trim: true
  },
  receivingCrew: {
    type: String,
    trim: true
  },
  storageLocation: {
    type: String,
    trim: true
  },
  specialRequirements: {
    type: String,
    trim: true
  },
  contactPerson: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'In Transit', 'Delivered', 'Cancelled'],
    default: 'Scheduled'
  },
  actualDeliveryDate: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Material', materialSchema);