const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload'); // Assuming you have a multer setup for file uploads

// ✅ Contract types
router.get('/types', contractController.getContractTypes);

// ✅ Get contract by type ID
router.get('/types/:id', contractController.getContractTypeById);

// ✅ Lawyer listing (Client only)
router.get('/lawyers', protect, checkRole(['client']), contractController.getLawyers);

// ✅ Create contract (Client only)
router.post(
  '/submit',
  protect,
  checkRole(['client']),
  contractController.createContract
);

// ✅ Get contracts for logged-in client
router.get('/my', protect, checkRole(['client']), contractController.getClientContracts);

// ✅ Download signed contract (Client or Lawyer)
router.get('/:id/download', protect, contractController.downloadContract);

// ✅ Client get single contract
router.get('/:id', protect, checkRole(['client']), contractController.getContract);

/* ------------------- Lawyer Routes ------------------- */

// Get all pending contracts for lawyer
router.get('/lawyer/pending', protect, checkRole(['lawyer']), contractController.getPendingContracts);

// Get all signed contracts for lawyer
router.get('/lawyer/signed', protect, checkRole(['lawyer']), contractController.getSignedContracts);

// Get contract details for lawyer review
router.get('/lawyer/:id', protect, contractController.getContractByIdForLawyer);

// Update contract data before signing
router.put('/lawyer/:id', protect, checkRole(['lawyer']), contractController.updateContract);

// Sign contract
router.post('/lawyer/:id/sign', protect, checkRole(['lawyer']), contractController.signContract);

module.exports = router;
