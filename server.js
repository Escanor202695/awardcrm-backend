// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
const expenseRoutes = require("./routes/expenses");
const invoiceRoutes = require("./routes/invoices");
const contactRoutes = require("./routes/contacts");
const materialRoutes = require("./routes/materials");
const dailyReportRoutes = require("./routes/dailyReports");
const changeOrderRoutes = require("./routes/changeOrders");
const rfiRoutes = require("./routes/rfis");
const punchListRoutes = require("./routes/punchLists");
const reportRoutes = require("./routes/reports");
const userRoutes = require('./routes/users');

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/handymench",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/daily-reports", dailyReportRoutes);
app.use("/api/change-orders", changeOrderRoutes);
app.use("/api/rfis", rfiRoutes);
app.use("/api/punch-lists", punchListRoutes);
app.use("/api/reports", reportRoutes);
app.use('/api/users', userRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
