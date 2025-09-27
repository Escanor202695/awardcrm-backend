// routes/materials.js
const express = require('express');
const Material = require('../models/Material');
const { auth } = require('../middleware/auth');
const Project = require('../models/Project');
const router = express.Router();

// Get materials by project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { project: req.params.projectId };
    
    if (status) filter.status = status;
    
    const materials = await Material.find(filter)
      .populate('supplier', 'company contactName phone')
      .sort({ deliveryDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Material.countDocuments(filter);

    res.json({
      materials,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create material
router.post('/', auth, async (req, res) => {
  try {

        const { project } = req.body;

    // Check if project exists
    const existingProject = await Project.findById(project);
    if (!existingProject) {
      return res.status(400).json({ message: 'Invalid project ID: project does not exist' });
    }


    const material = new Material(req.body);
    await material.save();
    await material.populate('supplier', 'company contactName phone');
    
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update material
router.put('/:id', auth, async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('supplier', 'company contactName phone');
    
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    
    res.json(material);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete material
router.delete('/:id', auth, async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;