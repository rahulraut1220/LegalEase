const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadAndAnalyzePDF, getDocumentHistory } = require('../controllers/pdfController');
const { protect } = require('../middleware/authMiddleware');
const Document = require('../models/Document');

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Route to upload and analyze PDF
router.post('/upload', protect, upload.single('pdf'), uploadAndAnalyzePDF);

// Route to get document history
router.get('/history', protect, getDocumentHistory);

module.exports = router;
