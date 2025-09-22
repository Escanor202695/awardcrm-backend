# Handymench LLC Project Management System

## Table of Contents
1.  [Project Overview](#project-overview)
2.  [System Architecture](#system-architecture)
3.  [Technology Stack](#technology-stack)
4.  [Directory Structure](#directory-structure)
5.  [Database Design](#database-design)
6.  [API Architecture](#api-architecture)
7.  [Authentication & Security](#authentication--security)
8.  [Frontend Components](#frontend-components)
9.  [Development Workflow](#development-workflow)
10. [Deployment Guide](#deployment-guide)
11. [API Reference](#api-reference)
12. [Troubleshooting](#troubleshooting)

---

## Project Overview

### Purpose
A comprehensive construction project management system designed for Handymench LLC to manage projects, track finances, coordinate subcontractors, and monitor progress in real-time.

### Key Features
- **Project Management**: Full lifecycle project tracking with budgets and timelines
- **Financial Tracking**: Expenses and invoices with retention calculations
- **Task Management**: Gantt chart visualization and assignment tracking
- **Contact Management**: Subcontractors, suppliers, and client databases
- **Material Tracking**: Delivery scheduling and inventory management
- **Daily Reports**: Site activity logging and progress documentation
- **Change Orders**: Project modification workflow and approval process
- **RFI Management**: Request for Information tracking and responses
- **Punch Lists**: Quality control and completion item management
- **Reporting**: Financial summaries and progress analytics

### Business Value
- Centralized project data management
- Real-time financial tracking and budget control
- Improved communication with subcontractors and clients
- Automated reporting and compliance documentation
- Enhanced project visibility and decision-making

---

## System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│   (MongoDB)     │
│   React App     │    │   REST API      │    │   Collections   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Browser  │    │   File Storage  │    │   Backup/Logs   │
│   Authentication│    │   (Local/Cloud) │    │   (Winston)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow
1. **User Interaction**: Frontend captures user actions
2. **API Communication**: REST calls to backend with JWT authentication
3. **Business Logic**: Backend processes requests and validates data
4. **Database Operations**: MongoDB stores/retrieves data
5. **Response**: JSON data returned to frontend for display

### Security Layer
- JWT token-based authentication
- Role-based access control (Admin, Manager, User)
- Input validation and sanitization
- Rate limiting and CORS protection
- Secure file upload handling

---

## Technology Stack

### Frontend
- **Framework**: Next.js 15.5.2 (React 19.1.0)
- **Styling**: Tailwind CSS 4.1.13
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API with custom service layer
- **PDF Generation**: jsPDF 3.0.2 + html2canvas-pro 1.5.11 + jsPDF-AutoTable 5.0.2
- **Excel Export**: SheetJS (xlsx 0.18.5)
- **Icons**: Heroicons React 2.2.0
- **Build Tool**: Next.js Turbopack
- **Development**: TypeScript support ready

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi schemas
- **File Upload**: Multer
- **Security**: Helmet, CORS, express-rate-limit
- **Logging**: Winston
- **Testing**: Jest + Supertest

### DevOps & Infrastructure
- **Containerization**: Docker + Docker Compose
- **Database**: MongoDB 6.0+
- **Caching**: Redis (optional)
- **Process Management**: PM2 (production)
- **Health Monitoring**: Custom health checks

---

## Directory Structure

### Backend Structure
```
handymench-backend/
├── config/
│   └── database.js              # MongoDB connection configuration
├── middleware/
│   ├── auth.js                  # JWT authentication middleware
│   ├── errorHandler.js          # Global error handling
│   ├── upload.js                # File upload configuration
│   └── validation.js            # Request validation middleware
├── models/
│   ├── User.js                  # User authentication schema
│   ├── Project.js               # Project management schema
│   ├── Task.js                  # Task tracking schema
│   ├── Expense.js               # Expense tracking schema
│   ├── Invoice.js               # Invoice management schema
│   ├── Contact.js               # Contact/subcontractor schema
│   ├── Material.js              # Material delivery schema
│   ├── DailyReport.js           # Daily site report schema
│   ├── ChangeOrder.js           # Change order schema
│   ├── RFI.js                   # Request for Information schema
│   └── PunchList.js             # Punch list item schema
├── routes/
│   ├── auth.js                  # Authentication endpoints
│   ├── users.js                 # User management endpoints (admin)
│   ├── projects.js              # Project CRUD operations
│   ├── tasks.js                 # Task management endpoints
│   ├── expenses.js              # Expense tracking endpoints
│   ├── invoices.js              # Invoice management endpoints
│   ├── contacts.js              # Contact management endpoints
│   ├── materials.js             # Material tracking endpoints
│   ├── dailyReports.js          # Daily report endpoints
│   ├── changeOrders.js          # Change order endpoints
│   ├── rfis.js                  # RFI management endpoints
│   ├── punchLists.js            # Punch list endpoints
│   ├── reports.js               # Reporting and analytics
│   └── uploads.js               # File upload endpoints
├── scripts/
│   └── seed.js                  # Database seeding script
├── utils/
│   └── validation.js            # Validation schemas
├── logs/                        # Application logs
├── uploads/                     # Uploaded files storage
├── docs/
│   └── api-documentation.md     # API documentation
├── tests/                       # Test files
├── server.js                    # Main application entry point
├── healthcheck.js               # Health monitoring script
├── package.json                 # Dependencies and scripts
├── Dockerfile                   # Container configuration
├── docker-compose.yml           # Multi-service container setup
├── mongo-init.js                # MongoDB initialization
└── README.md                    # Project documentation
```

### Frontend Structure
```
crm-react-upwork/
├── app/                         # Next.js 13+ app directory
├── components/
│   ├── AllSubcontractors/
│   │   └── index.js            # Global subcontractor management component
│   ├── DataTable/
│   │   └── index.js            # Reusable data table component
│   ├── FormField/
│   │   └── index.js            # Reusable form input component
│   ├── Header/
│   │   └── index.js            # Main navigation/header component
│   ├── Modal/
│   │   └── index.js            # Reusable modal/dialog component
│   ├── PdfDownloader/
│   │   └── index.js            # PDF export functionality component
│   └── ReportsTab/
│       └── index.js            # Reporting dashboard component
├── login/                       # Authentication pages/components
├── projectTabs/                 # Project-specific tab components
│   ├── ChangeOrders/           # Change orders management
│   ├── DailyReports/           # Daily reports tracking
│   ├── Expense/                # Expense management
│   ├── Invoice/                # Invoice management
│   ├── Materials/              # Materials tracking
│   ├── PunchList/              # Punch list management
│   ├── RFI/                    # RFI (Request for Information) management
│   ├── Subcontractor/          # Project-level subcontractor management
│   └── Task/                   # Task management
├── services/
│   └── api.js                  # Backend API communication layer
├── settings/
│   └── page.js                 # User/app settings page
├── public/                     # Static assets and uploads
├── node_modules/               # Dependencies
├── favicon.ico                 # Site favicon
├── globals.css                 # Global Tailwind/CSS styling
├── layout.js                   # Root layout component
├── page.jsx                    # Main dashboard/home page
├── .gitignore                  # Git ignore rules
├── jsconfig.json               # JavaScript configuration
├── next.config.mjs             # Next.js configuration
├── package-lock.json           # Dependency lock file
├── package.json                # Project dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Project documentation
├── eslint.config.mjs           # ESLint configuration
├── index.html                  # HTML entry point
└── tailwind.config.js          # Tailwind CSS configuration

---

## Database Design

### Collections Overview
```
MongoDB Database: handymench
├── users                        # System users and authentication
├── projects                     # Construction projects
├── tasks                        # Project tasks and scheduling
├── expenses                     # Project expenses and vendor payments
├── invoices                     # Client invoicing and payments
├── contacts                     # Subcontractors, suppliers, clients
├── materials                    # Material deliveries and tracking
├── dailyreports                 # Daily site activity reports
├── changeorders                 # Project change requests
├── rfis                         # Requests for information
└── punchlists                   # Quality control items
```

### Key Relationships
```
Users ──┐
        ├─→ Projects ──┐
        │              ├─→ Tasks
        │              ├─→ Expenses
        │              ├─→ Invoices
        │              ├─→ Materials
        │              ├─→ Daily Reports
        │              ├─→ Change Orders
        │              ├─→ RFIs
        │              └─→ Punch Lists
        └─→ Contacts ──────┘
```

### Data Models

#### User Schema
```javascript
{
  name: String,           # User full name
  email: String,          # Unique login email
  password: String,       # Hashed password
  role: Enum,             # admin, manager, user
  isActive: Boolean,      # Account status
  timestamps: Date        # Created/updated timestamps
}
```

#### Project Schema
```javascript
{
  projectId: String,      # Unique project identifier
  name: String,           # Project name
  client: String,         # Client company name
  manager: ObjectId,      # Reference to User
  awardAmount: Number,    # Contract amount
  spentToDate: Number,    # Total expenses
  remainingBudget: Number,# Calculated field
  progress: Number,       # Completion percentage
  startDate: Date,        # Project start
  endDate: Date,          # Project completion
  status: Enum,           # active, completed, on-hold, cancelled
  driveFolder: String,    # Google Drive link
  description: String,    # Project description
  address: Object,        # Project location
  timestamps: Date
}
```

#### Task Schema
```javascript
{
  taskId: String,         # Unique task identifier
  project: ObjectId,      # Reference to Project
  taskName: String,       # Task description
  trade: String,          # Trade specialty
  startDate: Date,        # Task start
  endDate: Date,          # Task completion
  durationDays: Number,   # Calculated duration
  status: Enum,           # Not Started, In Progress, Completed, On Hold
  assignedTo: ObjectId,   # Reference to Contact
  notes: String,          # Additional notes
  dependencies: [ObjectId], # Task dependencies
  completionPercentage: Number,
  timestamps: Date
}
```

#### Financial Schemas (Expense/Invoice)
```javascript
{
  project: ObjectId,      # Reference to Project
  invoiceNumber: String,  # Invoice identifier
  vendor: String,         # Vendor/client name
  invoiceDate: Date,      # Invoice date
  description: String,    # Item description
  amount: Number,         # Invoice amount
  dueDate: Date,          # Payment due date
  status: Enum,           # Pending, Paid, Overdue, Cancelled
  paymentDate: Date,      # Actual payment date
  retentionHeld: Number,  # Retention amount
  netPaid: Number,        # Net payment amount
  notes: String,          # Additional notes
  timestamps: Date
}
```

---

## API Architecture

### RESTful Design Principles
- **Resource-based URLs**: `/api/projects`, `/api/tasks`
- **HTTP methods**: GET (read), POST (create), PUT (update), DELETE (remove)
- **Status codes**: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)
- **JSON responses**: Consistent response format

### Endpoint Structure
```
/api/auth/*                      # Authentication
├── POST /login                  # User login
├── POST /register               # User registration (public)
└── GET /me                      # Current user info

/api/users/*                     # User Management (Admin Only)
├── GET /                        # List all users with search/pagination
├── GET /:id                     # Get single user details
├── POST /                       # Create new user (admin creates users)
├── PUT /:id                     # Update user information
├── DELETE /:id                  # Delete user (with safety checks)
└── PATCH /:id/toggle-status     # Activate/deactivate user account

/api/projects/*                  # Project management
├── GET /                        # List all projects
├── GET /:id                     # Get single project
├── POST /                       # Create new project
├── PUT /:id                     # Update project
└── DELETE /:id                  # Delete project

/api/tasks/*                     # Task management
├── GET /project/:projectId      # Get project tasks
├── POST /                       # Create task
├── PUT /:id                     # Update task
└── DELETE /:id                  # Delete task

/api/expenses/*                  # Expense tracking
├── GET /project/:projectId      # Get project expenses
├── POST /                       # Create expense
├── PUT /:id                     # Update expense
└── DELETE /:id                  # Delete expense

/api/reports/*                   # Reporting
├── GET /financial/:projectId?   # Financial summary
└── GET /progress/:projectId     # Progress report

/api/uploads/*                   # File management
├── POST /single                 # Upload single file
└── POST /multiple               # Upload multiple files
```

### Request/Response Format
```javascript
// Request Format
{
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer <jwt_token>"
  },
  "body": {
    "name": "New Project",
    "client": "ABC Corp",
    "awardAmount": 150000
  }
}

// Response Format
{
  "success": true,
  "data": {
    "id": "60f7b1b2b1b2b1b2b1b2b1b2",
    "name": "New Project",
    "client": "ABC Corp"
  },
  "message": "Project created successfully"
}
```

---

## Authentication & Security

### JWT Authentication Flow
1. **Login**: User provides email/password
2. **Verification**: Backend validates credentials
3. **Token Generation**: JWT token created with user info
4. **Token Storage**: Frontend stores token (localStorage)
5. **Request Authentication**: Token sent in Authorization header
6. **Token Validation**: Backend verifies token on protected routes

### Security Measures
- **Password Hashing**: bcryptjs with salt rounds
- **JWT Secrets**: Environment-based secret keys
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Joi schema validation
- **CORS Protection**: Configured allowed origins
- **Helmet Security**: HTTP security headers
- **File Upload Limits**: 10MB max file size
- **SQL Injection Prevention**: Mongoose parameterized queries

### Role-Based Access Control
```javascript
// Roles and Permissions
Admin: {
  users: ['create', 'read', 'update', 'delete'],        // Full user management
  projects: ['create', 'read', 'update', 'delete'],
  reports: ['read', 'export'],
  system: ['configure', 'backup']
}

Manager: {
  users: ['read'],                                      // View users only
  projects: ['create', 'read', 'update'],              // Cannot delete projects
  tasks: ['create', 'read', 'update', 'delete'],
  expenses: ['create', 'read', 'update'],
  reports: ['read']
}

User: {
  users: [],                                            // No user management
  projects: ['read'],                                   // View-only projects
  tasks: ['read', 'update'],                           // Can update assigned tasks
  reports: ['read']
}
```

### User Management Features
- **Admin-Only Access**: Only administrators can manage user accounts
- **Self-Protection**: Admins cannot delete or deactivate their own accounts
- **Account Status**: Users can be activated/deactivated without deletion
- **Password Security**: Passwords are hashed using bcrypt with salt rounds
- **Email Validation**: Unique email enforcement with proper validation
- **Search Functionality**: Find users by name or email with pagination
- **Audit Trail**: User creation and modification tracking

---

## Frontend Components

### Component Architecture
```
App.js (Main Container)
├── Header (Navigation & User Menu)
├── Dashboard (Project Overview)
├── ProjectDetail (Project Management)
│   ├── TasksTab (Project tasks and scheduling)
│   ├── ExpensesTab (Project expense tracking)
│   ├── InvoicesTab (Project invoice management)
│   ├── SubcontractorsTab (Project-level subcontractor management)
│   ├── MaterialsTab (Material delivery tracking)
│   ├── DailyReportsTab (Daily site reports)
│   ├── ChangeOrdersTab (Change order management)
│   ├── RFITab (Request for Information)
│   ├── PunchListTab (Quality control items)
│   └── ReportsTab (Project-level reporting)
├── AllSubcontractorsTab (Global subcontractor management)
├── CentralReports (Global reporting dashboard)
└── Modals (Forms and Dialogs)
```

### Dual Reporting System
The application implements a two-level reporting structure:

#### 1. Project-Level Reports (ReportsTab.js)
Located within individual project management sections:
- **Vendors Paid Report**: Project-specific expense tracking by vendor
- **Cash Flow Report**: Project-specific invoice collection timeline
- **Date Filtering**: Filter reports by custom date ranges
- **Export Options**: PDF, Excel, and Print functionality

#### 2. Central Reports Dashboard (Global)
Cross-project analytics and reporting:
- **Portfolio Overview**: All projects financial summary
- **Company-wide Cash Flow**: Consolidated invoice tracking
- **Resource Utilization**: Subcontractor and equipment usage
- **Performance Metrics**: Project completion rates and budget variance
- **Executive Summaries**: High-level business intelligence

### PDF Export System
Advanced document generation using multiple libraries:
```javascript
// PDF Export Dependencies
import jsPDF from 'jspdf';                    // Core PDF generation
import html2canvas from 'html2canvas-pro';    // HTML to canvas conversion
import 'jspdf-autotable';                     // Table generation
import * as XLSX from 'xlsx';                 // Excel export functionality

// Export Implementation
const exportToPDF = async (reportType, data) => {
  const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation
  
  // Add company header
  pdf.setFontSize(18);
  pdf.text('Handymench LLC - Project Report', 20, 20);
  
  // Generate table using autoTable
  pdf.autoTable({
    head: [headers],
    body: data,
    startY: 30,
    theme: 'grid',
    styles: { fontSize: 8 }
  });
  
  pdf.save(`${reportType}-${new Date().toISOString().split('T')[0]}.pdf`);
};
```

### State Management Pattern
```javascript
// Local component state for UI
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// API data state
const [projects, setProjects] = useState([]);
const [selectedProject, setSelectedProject] = useState(null);

// Modal state
const [showModal, setShowModal] = useState(false);
const [formData, setFormData] = useState({});
```

### API Integration Pattern
```javascript
// Service layer usage
import apiService from '../services/api';

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await apiService.getProjects();
    setProjects(response.projects);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

---

## Development Workflow

### Setup Process
1. **Clone repositories**
2. **Install dependencies** (`npm install`)
3. **Configure environment** (`.env` files)
4. **Start MongoDB** (local or Docker)
5. **Seed database** (`npm run seed`)
6. **Start backend** (`npm run dev`)
7. **Start frontend** (`npm run dev`)

### Frontend Dependencies (package.json)
```json
{
  "name": "handymench-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack", 
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "html2canvas-pro": "^1.5.11",
    "jspdf": "^3.0.2",
    "jspdf-autotable": "^5.0.2",
    "next": "15.5.2",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "autoprefixer": "^10.4.21",
    "eslint": "^9",
    "eslint-config-next": "15.5.2",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.13"
  }
}
```

### User Management Integration
The frontend includes a comprehensive user management system accessible through the settings page:

#### User Management Features:
- **User Table View**: Paginated list of all system users with search functionality
- **Add Users**: Create new user accounts with role assignment
- **Edit Users**: Modify user information, roles, and passwords
- **Delete Users**: Remove user accounts (with confirmation dialogs)
- **Account Status**: Activate/deactivate users without deletion
- **Role Management**: Assign admin, manager, or user roles
- **Search & Filter**: Find users by name or email
- **Form Validation**: Password confirmation and email format validation

#### Security Features:
- **Admin Protection**: Prevents admins from deleting their own accounts
- **Role Restrictions**: Only admins can access user management
- **Password Security**: Secure password handling with confirmation
- **Real-time Validation**: Form validation with immediate feedback

### Configuration Files

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
```

#### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
```

#### .env.local (Frontend Environment Variables)
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Application Settings
NEXT_PUBLIC_APP_NAME=Handymench LLC
NEXT_PUBLIC_APP_VERSION=1.0.0

# Development Settings
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_ENABLE_LOGGING=true

# File Upload Settings
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf,doc,docx,xls,xlsx

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Code review and merge
# Create pull request
# Review and approve
# Merge to main branch
```

### Testing Strategy
- **Unit Tests**: Individual component/function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user workflow testing
- **Manual Testing**: UI/UX validation

---

## Deployment Guide

### Development Environment
```bash
# Start with Docker Compose
docker-compose up -d

# Or manual setup
mongod
npm run dev  # Backend on :5000
npm run dev  # Frontend on :3000
```

### Production Deployment
```bash
# Build applications
npm run build

# Set production environment
NODE_ENV=production

# Use process manager
pm2 start server.js --name handymench-api
pm2 start npm --name handymench-frontend -- start

# Or use Docker
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Configuration
```bash
# Development
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/handymench
JWT_SECRET=dev_secret_key

# Production
NODE_ENV=production
MONGODB_URI=mongodb://user:pass@cluster.mongodb.net/handymench
JWT_SECRET=secure_production_key_32_chars_minimum
```

---

## API Reference

### Authentication Endpoints
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b1b2b1b2b1b2b1b2b1b2",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "manager"
  }
}
```

### Project Management
```http
GET /api/projects?status=active&page=1&limit=10
Authorization: Bearer <token>

Response:
{
  "projects": [...],
  "totalPages": 5,
  "currentPage": 1,
  "total": 42
}
```

### Task Operations
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "project": "60f7b1b2b1b2b1b2b1b2b1b2",
  "taskName": "Install Electrical Panel",
  "trade": "Electrical",
  "startDate": "2025-01-15",
  "endDate": "2025-01-20",
  "assignedTo": "60f7b1b2b1b2b1b2b1b2b1b3"
}
```

---

## Troubleshooting

### Common Issues

#### Database Connection Error
```
Error: MongoNetworkError: failed to connect to server
```
**Solution:**
- Verify MongoDB is running
- Check connection string in .env
- Verify network connectivity
- Check firewall settings

#### JWT Authentication Error
```
Error: JsonWebTokenError: invalid token
```
**Solution:**
- Verify JWT_SECRET is set
- Check token expiration
- Ensure Authorization header format: "Bearer <token>"
- Clear browser localStorage

#### Port Already in Use
```
Error: EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

#### File Upload Error
```
Error: ENOENT: no such file or directory, open 'uploads/...'
```
**Solution:**
```bash
# Create uploads directory
mkdir uploads
chmod 755 uploads
```

### Debugging Tips
- **Check logs**: `tail -f logs/error.log`
- **Verify environment**: `echo $NODE_ENV`
- **Test API endpoints**: Use Postman or curl
- **Check database**: Use MongoDB Compass
- **Monitor resources**: `htop` or `pm2 monit`

### Performance Optimization
- **Database indexing**: Key fields indexed
- **Query optimization**: Populate only needed fields
- **Caching**: Redis for frequent queries
- **CDN**: Static asset delivery
- **Compression**: gzip middleware enabled