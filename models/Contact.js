// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  contactType: {
    type: String,
    enum: ['Subcontractor', 'Supplier', 'Client', 'Vendor'],
    required: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  contactName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  tradeSpecialty: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  notes: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  certifications: [String],
  insuranceExpiry: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);