const Joi = require('joi');

const projectValidation = Joi.object({
  projectId: Joi.string().required(),
  name: Joi.string().min(2).max(100).required(),
  client: Joi.string().min(2).max(100).required(),
  awardAmount: Joi.number().min(0).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')),
  status: Joi.string().valid('active', 'completed', 'on-hold', 'cancelled'),
  driveFolder: Joi.string().uri(),
  description: Joi.string().max(500),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zipCode: Joi.string()
  })
});

const taskValidation = Joi.object({
  taskId: Joi.string().required(),
  project: Joi.string().hex().length(24).required(),
  taskName: Joi.string().min(2).max(100).required(),
  trade: Joi.string().min(2).max(50).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  status: Joi.string().valid('Not Started', 'In Progress', 'Completed', 'On Hold'),
  assignedTo: Joi.string().hex().length(24),
  notes: Joi.string().max(500),
  completionPercentage: Joi.number().min(0).max(100)
});

const expenseValidation = Joi.object({
  project: Joi.string().hex().length(24).required(),
  invoiceNumber: Joi.string().required(),
  vendor: Joi.string().min(2).max(100).required(),
  invoiceDate: Joi.date().required(),
  description: Joi.string().min(2).max(200).required(),
  amount: Joi.number().min(0).required(),
  dueDate: Joi.date().required(),
  status: Joi.string().valid('Pending', 'Paid', 'Overdue', 'Cancelled'),
  paymentDate: Joi.date(),
  checkNumber: Joi.string(),
  retentionHeld: Joi.number().min(0),
  netPaid: Joi.number().min(0),
  notes: Joi.string().max(500),
  category: Joi.string().valid('Materials', 'Labor', 'Equipment', 'Permits', 'Utilities', 'Other')
});

const contactValidation = Joi.object({
  contactType: Joi.string().valid('Subcontractor', 'Supplier', 'Client', 'Vendor').required(),
  company: Joi.string().min(2).max(100).required(),
  contactName: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).required(),
  email: Joi.string().email().required(),
  tradeSpecialty: Joi.string().min(2).max(100).required(),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zipCode: Joi.string()
  }),
  rating: Joi.number().min(1).max(5),
  notes: Joi.string().max(500),
  certifications: Joi.array().items(Joi.string()),
  insuranceExpiry: Joi.date()
});

const userValidation = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).when('isUpdate', {
    is: true,
    then: Joi.optional(),
    otherwise: Joi.required()
  }),
  role: Joi.string().valid('admin', 'manager', 'user').default('user'),
  isActive: Joi.boolean().default(true)
});

module.exports = {
  projectValidation,
  taskValidation,
  expenseValidation,
  contactValidation,
  userValidation
};