const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadPath = path.join(__dirname, '..', process.env.UPLOAD_PATH || 'uploads');

// Ensure upload folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only images and documents are allowed'));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: process.env.MAX_FILE_SIZE || 10485760 // 10MB
  },
  fileFilter
});

module.exports = upload;
