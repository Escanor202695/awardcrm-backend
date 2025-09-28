const express = require('express');
const PunchList = require('../models/PunchList');
const { auth } = require('../middleware/auth');
const Project = require('../models/Project');
const Contact = require('../models/Contact');
const User = require('../models/User');
const router = express.Router();

// Get punch list items by project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const { status, priority, trade, page = 1, limit = 10 } = req.query;
    const filter = { project: req.params.projectId };
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (trade) filter.trade = new RegExp(trade, 'i');
    
    const punchItems = await PunchList.find(filter)
      .populate('assignedTo', 'company contactName')
      .populate('verifiedBy', 'name')
      .sort({ dateIdentified: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await PunchList.countDocuments(filter);

    res.json({
      punchItems,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create punch list item
router.post('/', auth, async (req, res) => {
  try {
    const { project, assignedTo, verifiedBy } = req.body;

    // Check if project exists
    const existingProject = await Project.findById(project);
    if (!existingProject) {
      return res.status(400).json({ message: 'Invalid Project ID: Project does not exist' });
    }

    // Check if assignedTo contact exists
    const contactExists = await Contact.findById(assignedTo);
    if (!contactExists) {
      return res.status(400).json({ message: 'Invalid Contact ID: AssignedTo does not exist' });
    }

    // If verifiedBy is provided, check user exists
    if (verifiedBy) {
      const userExists = await User.findById(verifiedBy);
      if (!userExists) {
        return res.status(400).json({ message: 'Invalid User ID: VerifiedBy does not exist' });
      }
    }

    // Save punch item
    const punchItem = new PunchList(req.body);
    await punchItem.save();
    await punchItem.populate('assignedTo', 'company contactName');

    res.status(201).json(punchItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update punch list item
router.put('/:id', auth, async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // If completing item, set completion date
    if (updateData.status === 'Completed' && !updateData.completionDate) {
      updateData.completionDate = new Date();
    }
    
    // If verifying item, set verification info
    if (updateData.status === 'Verified') {
      updateData.verifiedBy = req.user._id;
      updateData.verificationDate = new Date();
    }
    
    const punchItem = await PunchList.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'company contactName')
     .populate('verifiedBy', 'name');
    
    if (!punchItem) {
      return res.status(404).json({ message: 'Punch list item not found' });
    }
    
    res.json(punchItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete punch list item
router.delete('/:id', auth, async (req, res) => {
  try {
    const punchItem = await PunchList.findByIdAndDelete(req.params.id);
    
    if (!punchItem) {
      return res.status(404).json({ message: 'Punch list item not found' });
    }
    
    res.json({ message: 'Punch list item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
