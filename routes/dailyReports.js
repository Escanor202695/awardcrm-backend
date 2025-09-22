const express = require('express');
const DailyReport = require('../models/DailyReport');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get daily reports by project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;
    const filter = { project: req.params.projectId };
    
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    const reports = await DailyReport.find(filter)
      .populate('reportedBy', 'name')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await DailyReport.countDocuments(filter);

    res.json({
      reports,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create daily report
router.post('/', auth, async (req, res) => {
  try {
    const report = new DailyReport({
      ...req.body,
      reportedBy: req.user._id
    });
    await report.save();
    await report.populate('reportedBy', 'name');
    
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update daily report
router.put('/:id', auth, async (req, res) => {
  try {
    const report = await DailyReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('reportedBy', 'name');
    
    if (!report) {
      return res.status(404).json({ message: 'Daily report not found' });
    }
    
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete daily report
router.delete('/:id', auth, async (req, res) => {
  try {
    const report = await DailyReport.findByIdAndDelete(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Daily report not found' });
    }
    
    res.json({ message: 'Daily report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;