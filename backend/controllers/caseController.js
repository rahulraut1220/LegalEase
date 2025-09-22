const Case = require("../models/Case");

const generateCaseNumber = () => {
  return 'CASE-' + Date.now(); // Example: CASE-1720095800000
};

exports.createCase = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newCase = await Case.create({
      title,
      description,
      client: req.user.id,
      caseNumber: generateCaseNumber()
    });

    res.status(201).json({ success: true, case: newCase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all cases (Lawyer sees all open cases, Client sees their cases)
exports.getCases = async (req, res) => {
  try {
    console.log("Getting cases for user:", req.user);
    let cases;
    if (req.user.role === "lawyer") {
      // Show all cases assigned to the lawyer or unassigned cases
      cases = await Case.find({
        $or: [
          { lawyer: req.user._id }, // Cases assigned to this lawyer
          { lawyer: null }, // Unassigned cases
          { lawyer: { $exists: false } } // Cases without lawyer field
        ]
      })
      .populate("client", "name email")
      .populate("lawyer", "name email");
      
      console.log("Found cases for lawyer:", cases);
    } else {
      // Show all cases for the client
      cases = await Case.find({ client: req.user._id })
        .populate("client", "name email")
        .populate("lawyer", "name email");
      
      console.log("Found cases for client:", cases);
    }

    res.status(200).json({ success: true, cases });
  } catch (error) {
    console.error("Error in getCases:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Assign a lawyer to a case (Lawyer Only)
exports.assignLawyer = async (req, res) => {
  try {
    const caseId = req.body.id;

    // Check if user is a lawyer
    if (req.user.role !== "lawyer") {
      return res.status(403).json({ success: false, message: "Only lawyers can be assigned to cases" });
    }

    const caseToUpdate = await Case.findById(caseId);
    if (!caseToUpdate) {
      return res.status(404).json({ success: false, message: "Case not found" });
    }

    // Update the case with the lawyer's ID and change status
    const updatedCase = await Case.findByIdAndUpdate(
      caseId,
      { 
        assignedLawyer: req.user._id,
        status: "In Progress"
      },
      { new: true }
    )
      .populate("client", "name email")
      .populate("assignedLawyer", "name email");

    res.status(200).json({ success: true, case: updatedCase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Close a case (Client or Lawyer)
exports.closeCase = async (req, res) => {
  console.log(req.body.id);
  try {
    const caseToUpdate = await Case.findById(req.body.id);
    
    if (!caseToUpdate) {
      //console.log(caseId);
      return res.status(404).json({ success: false, message: "Case not found" });
    }

    if (req.user.id !== String(caseToUpdate.client) && req.user.id !== String(caseToUpdate.lawyer)) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    caseToUpdate.status = "Closed";
    await caseToUpdate.save();

    res.status(200).json({ success: true, message: "Case closed successfully", case: caseToUpdate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single case by ID
exports.getCaseById = async (req, res) => {
  try {
    console.log("getCaseById called with ID:", req.params.id);
    console.log("User making request:", req.user);

    const case_ = await Case.findById(req.params.id)
      .populate("client", "name email")
      .populate("lawyer", "name email");

    console.log("Found case:", case_);

    if (!case_) {
      console.log("Case not found");
      return res.status(404).json({ success: false, message: "Case not found" });
    }

    // Check if user has access to this case
    if (req.user.role === "client" && String(case_.client._id) !== String(req.user._id)) {
      console.log("Unauthorized access attempt");
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    console.log("Returning case data");
    res.status(200).json({ success: true, case: case_ });
  } catch (error) {
    console.error("Error in getCaseById:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadCaseDocument = async (req, res) => {
  try {
    const caseId = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const currentCase = await Case.findById(caseId);
    if (!currentCase) {
      return res.status(404).json({ success: false, message: "Case not found" });
    }

    currentCase.documents.push({
      filename: file.originalname,
      path: file.path,
      uploadedBy: req.user._id,
      role: req.user.role,
    });

    await currentCase.save();

    return res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
      case: currentCase,
    });

  } catch (error) {
    console.error("❌ Upload error:", error);  // Add this line
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message // Add this to see the real reason
    });
  }
};



exports.updateCaseTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, description } = req.body;

    // Validate required field
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required." });
    }

    const case_ = await Case.findById(id);
    if (!case_) {
      return res.status(404).json({ success: false, message: "Case not found" });
    }

    // Authorization: only assigned lawyer can update
    if (req.user.role !== "lawyer" || String(case_.assignedLawyer) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Only assigned lawyer can update timeline",
      });
    }

    // ✅ Push only required fields; Mongoose will auto-set updatedAt
    case_.timeline.push({ status, description });

    await case_.save();

    res.status(200).json({
      success: true,
      message: "Timeline updated",
      case: case_,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getCaseDocuments = async (req, res) => {
  try {
    const caseId = req.params.id;
    const currentCase = await Case.findById(caseId).select("documents");  
    if (!currentCase) {
      return res.status(404).json({ success: false, message: "Case not found" });
    }
    res.status(200).json({ success: true, documents: currentCase.documents });
  } catch (error) {
    console.error("Error fetching case documents:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getTimelineUpdates = async (req, res) => {
  try {
    const caseId = req.params.id;
    const currentCase = await Case.findById(caseId).select("timeline");
    if (!currentCase) {
      return res.status(404).json({ success: false, message: "Case not found" });
    }
    res.status(200).json({ success: true, timeline: currentCase.timeline });
  } catch (error) {
    console.error("Error fetching case timeline updates:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};    
