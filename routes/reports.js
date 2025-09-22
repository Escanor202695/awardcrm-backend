// routes/reports.js
const express = require('express');
const Project = require('../models/Project');
const Expense = require('../models/Expense');
const Invoice = require('../models/Invoice');
const Task = require('../models/Task');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Financial summary
router.get('/financial/:projectId?', auth, async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const matchStage = projectId ? { project: projectId } : {};
    
    const [expenses, invoices, projects] = await Promise.all([
      Expense.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: '$status',
            totalAmount: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        }
      ]),
      Invoice.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: '$status',
            totalAmount: { $sum: '$amount' },
            count: { $sum: 1 }
          }
        }
      ]),
      projectId ? 
        Project.findById(projectId) : 
        Project.aggregate([
          {
            $group: {
              _id: null,
              totalAwardAmount: { $sum: '$awardAmount' },
              totalSpent: { $sum: '$spentToDate' },
              activeProjects: {
                $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
              },
              completedProjects: {
                $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
              }
            }
          }
        ])
    ]);

    res.json({
      expenses,
      invoices,
      projects: projectId ? projects : projects[0],
      projectId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Project progress report
router.get('/progress/:projectId', auth, async (req, res) => {
  try {
    const projectId = req.params.projectId;
    
    const [project, tasks, expenses, invoices] = await Promise.all([
      Project.findById(projectId),
      Task.aggregate([
        { $match: { project: projectId } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]),
      Expense.aggregate([
        { $match: { project: projectId } },
        {
          $group: {
            _id: null,
            totalExpenses: { $sum: '$amount' },
            paidExpenses: {
              $sum: {
                $cond: [{ $eq: ['$status', 'Paid'] }, '$amount', 0]
              }
            }
          }
        }
      ]),
      Invoice.aggregate([
        { $match: { project: projectId } },
        {
          $group: {
            _id: null,
            totalInvoices: { $sum: '$amount' },
            paidInvoices: {
              $sum: {
                $cond: [{ $eq: ['$status', 'Paid'] }, '$amount', 0]
              }
            }
          }
        }
      ])
    ]);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({
      project,
      tasksSummary: tasks,
      financialSummary: {
        expenses: expenses[0] || { totalExpenses: 0, paidExpenses: 0 },
        invoices: invoices[0] || { totalInvoices: 0, paidInvoices: 0 }
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;status(401).json({ message: 'Token is not valid' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = { auth, authorize };