const express = require('express');
const RFI = require('../models/RFI');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get RFIs by project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    const filter = { project: req.params.projectId };
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    
    const rfis = await RFI.find(filter)
      .populate('submittedBy', 'company contactName')
      .sort({ dateSubmitted: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await RFI.countDocuments(filter);

    res.json({
      rfis,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create RFI
router.post('/', auth, async (req, res) => {
  try {
    const rfi = new RFI(req.body);
    await rfi.save();
    await rfi.populate('submittedBy', 'company contactName');
    
    res.status(201).json(rfi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update RFI
router.put('/:id', auth, async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If closing RFI, set response date
    if (updateData.status === 'Closed' && !updateData.responseDate) {
      updateData.responseDate = new Date();
    }
    
    const rfi = await RFI.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('submittedBy', 'company contactName');
    
    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }
    
    res.json(rfi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete RFI
router.delete('/:id', auth, async (req, res) => {
  try {
    const rfi = await RFI.findByIdAndDelete(req.params.id);
    
    if (!rfi) {
      return res.status(404).json({ message: 'RFI not found' });
    }
    
    res.json({ message: 'RFI deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;