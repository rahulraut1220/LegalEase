const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lawyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedLawyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    caseNumber: { type: String, unique: true },

    // 📎 Documents uploaded by client or lawyer
    documents: [
      {
        url: { type: String, required: true },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    // 📌 Timeline updates by lawyer
    timeline: [
      {
        status: { type: String, required: true }, // e.g., Hearing Scheduled
        description: { type: String },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Case", caseSchema);
