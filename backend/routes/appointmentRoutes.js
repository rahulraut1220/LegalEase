// routes/appointmentRoutes.js
const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getMyAppointments,
  verifyPaymentAndConfirm,
  getMyAppointmentsByCaseId,
  getAppointmentById
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

// Book appointment
router.post("/book", protect, createAppointment);

// Get my appointments
router.get("/my", protect, getMyAppointments);

// Payment verification route (optional)
router.post("/verify", protect, verifyPaymentAndConfirm);

// Get all appointments (admin or for specific use cases)
router.get("/case/:caseId", protect, getMyAppointmentsByCaseId);

// Get appointment by ID (for details view)
router.get("/:id", protect, getAppointmentById);

module.exports = router;
