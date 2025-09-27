const express = require('express');
const ChangeOrder = require('../models/ChangeOrder');
const { auth } = require('../middleware/auth');
const Project = require('../models/Project');
const router = express.Router();

// Get change orders by project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { project: req.params.projectId };
    
    if (status) filter.status = status;
    
    const changeOrders = await ChangeOrder.find(filter)
      .populate('approvedBy', 'name')
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ChangeOrder.countDocuments(filter);

    res.json({
      changeOrders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create change order
router.post('/', auth, async (req, res) => {
  try {
    const { project } = req.body;

    // Check if project exists
    const existingProject = await Project.findById(project);
    if (!existingProject) {
      return res.status(400).json({ message: 'Invalid project ID: project does not exist' });
    }

    const changeOrder = new ChangeOrder(req.body);
    await changeOrder.save();
    res.status(201).json(changeOrder);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update change order
router.put('/:id', auth, async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If approving, set approvedBy and approvalDate
    if (updateData.status === 'Approved' && !updateData.approvedBy) {
      updateData.approvedBy = req.user._id;
      updateData.approvalDate = new Date();
    }
    
    const changeOrder = await ChangeOrder.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('approvedBy', 'name');
    
    if (!changeOrder) {
      return res.status(404).json({ message: 'Change order not found' });
    }
    
    res.json(changeOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete change order
router.delete('/:id', auth, async (req, res) => {
  try {
    const changeOrder = await ChangeOrder.findByIdAndDelete(req.params.id);
    
    if (!changeOrder) {
      return res.status(404).json({ message: 'Change order not found' });
    }
    
    res.json({ message: 'Change order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
