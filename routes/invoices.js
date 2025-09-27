// routes/invoices.js
const express = require('express');
const Invoice = require('../models/Invoice');
const { auth } = require('../middleware/auth');
const Project = require('../models/Project');
const router = express.Router();

// Get invoices by project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { project: req.params.projectId };
    
    if (status) filter.status = status;
    
    const invoices = await Invoice.find(filter)
      .sort({ invoiceDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Invoice.countDocuments(filter);
    const totalAmount = await Invoice.aggregate([
      { $match: filter },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      invoices,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      totalAmount: totalAmount[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create invoice
router.post('/', auth, async (req, res) => {
  try {
        const { project } = req.body;

    // Check if project exists
    const existingProject = await Project.findById(project);
    if (!existingProject) {
      return res.status(400).json({ message: 'Invalid project ID: project does not exist' });
    }

    const invoice = new Invoice(req.body);
    await invoice.save();
    
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update invoice
router.put('/:id', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete invoice
router.delete('/:id', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;