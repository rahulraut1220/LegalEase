// 📁 File: backend/models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case", // Assuming your case model is named "Case"
    required: true
  },
  appointmentTime: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "confirmed"
  },
  paymentId: String,
  paymentStatus: String,
  amount: {
    type: Number,
    default: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
