const express = require("express");
const { createCase, getCases, assignLawyer, closeCase, getCaseById, uploadCaseDocument, updateCaseTimeline } = require("../controllers/caseController");
const { protect } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();


// Client creates a new case
router.post("/create", protect, checkRole(["client"]), createCase);

// Clients & Lawyers get cases assigned to them
router.get("/my-cases", protect, getCases);

// Lawyer assigns themselves to a case
router.put("/assign", protect, checkRole(["lawyer"]), assignLawyer);

// Client or Lawyer closes a case
router.put("/close", protect, closeCase);

// Get a single case by ID (must be last to avoid conflicts with other routes)
router.get("/:id", protect, getCaseById);

router.post(
  "/:id/upload-document",
  protect,
  checkRole(["client", "lawyer"]), // optional role restriction
  upload.array("documents", 5),
  uploadCaseDocument
);

router.post("/:id/update-timeline", protect, checkRole(["lawyer"]), updateCaseTimeline);

module.exports = router;
