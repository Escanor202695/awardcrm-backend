const mongoose = require('mongoose');

const dailyReportSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  weather: {
    type: String,
    required: true,
    trim: true
  },
  crewCount: {
    type: Number,
    required: true,
    min: 0
  },
  tradesOnSite: {
    type: String,
    trim: true
  },
  workCompleted: {
    type: String,
    trim: true
  },
  issuesDelays: {
    type: String,
    trim: true
  },
  safetyNotes: {
    type: String,
    trim: true
  },
  visitors: {
    type: String,
    trim: true
  },
  photosTaken: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  nextDayPlan: {
    type: String,
    trim: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hoursWorked: {
    type: Number,
    min: 0
  },
  equipmentUsed: [String],
  materialsReceived: [{
    material: String,
    quantity: String,
    supplier: String
  }],
  incidentReports: [{
    type: String,
    description: String,
    actionTaken: String
  }]
}, {
  timestamps: true
});

// Compound index for project and date
dailyReportSchema.index({ project: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyReport', dailyReportSchema);