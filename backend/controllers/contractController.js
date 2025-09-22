const Contract = require('../models/Contract');
const ContractType = require('../models/ContractType');
const User = require('../models/User');
const mongoose = require('mongoose');

const path = require('path');
const fs = require('fs');

// @desc    Get all contract types
// @route   GET /api/contracts/types
// @access  Public
exports.getContractTypes = async (req, res) => {
  try {
    const contractTypes = await ContractType.find();
    res.status(200).json({
      success: true,
      count: contractTypes.length,
      data: contractTypes
    });
  } catch (error) {
    console.error('Error fetching contract types:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single contract
// @route   GET /api/contracts/:id
// @access  Private
exports.getContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('contractType')
      .populate('client', 'name email')
      .populate('lawyer', 'name email specialization');
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    if (
      contract.client._id.toString() !== req.user.id && 
      contract.lawyer._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this contract'
      });
    }

    res.status(200).json({
      success: true,
      data: contract
    });
  } catch (error) {
    console.error('Error fetching contract:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.createContract = async (req, res) => {
  try {
    let { contractTypeId, lawyerId, contractData } = req.body;

    if (!mongoose.Types.ObjectId.isValid(contractTypeId))
      return res.status(400).json({ success: false, message: 'Invalid or missing contractTypeId' });

    if (!mongoose.Types.ObjectId.isValid(lawyerId))
      return res.status(400).json({ success: false, message: 'Invalid or missing lawyerId' });

    if (typeof contractData === 'string') {
      try { contractData = JSON.parse(contractData); }
      catch { return res.status(400).json({ success: false, message: 'Invalid contractData format' }); }
    }

    const contractType = await ContractType.findById(contractTypeId);
    if (!contractType)
      return res.status(404).json({ success: false, message: 'Contract type not found' });

    const lawyer = await User.findOne({ _id: lawyerId, role: 'lawyer' });
    if (!lawyer)
      return res.status(404).json({ success: false, message: 'Lawyer not found' });

    const missingFields = contractType.requiredFields
      .filter(f => f.type !== 'file' && !contractData[f.name]);
    if (missingFields.length)
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.map(f => f.name).join(', ')}` 
      });

    const newContract = await Contract.create({
      contractType: contractTypeId,
      client: req.user.id,
      lawyer: lawyerId,
      clientSigned: true,
      contractData
    });

    res.status(201).json({
      success: true,
      message: 'Contract created successfully',
      contract: newContract
    });
  } catch (error) {
    console.error("Error creating contract:", error);
    res.status(500).json({ success: false, message: error.message || 'Server error while creating contract' });
  }
};


// @desc    Get client's contracts
// @route   GET /api/contracts/my
// @access  Private (Client Only)
exports.getClientContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({ client: req.user.id })
      .populate('contractType', 'name')
      .populate('lawyer', 'name email')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: contracts.length,
      data: contracts
    });
  } catch (error) {
    console.error('Error fetching client contracts:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get all lawyers
// @route   GET /api/contracts/lawyers
// @access  Private (Client Only)
exports.getLawyers = async (req, res) => {
  try {
    const lawyers = await User.find({ role: 'lawyer' }).select('name email specialization');
    
    res.status(200).json({
      success: true,
      count: lawyers.length,
      data: lawyers
    });
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Download contract document
// @route   GET /api/contracts/:id/download
// @access  Private
exports.downloadContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    if (
      contract.client.toString() !== req.user.id && 
      contract.lawyer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to download this contract'
      });
    }

    if (contract.status !== 'signed') {
      return res.status(400).json({
        success: false,
        message: 'Contract document is not available for download'
      });
    }

    if (!contract.documentUrl) {
      return res.status(404).json({
        success: false,
        message: 'Contract document not found'
      });
    }

    res.status(200).json({
      success: true,
      documentUrl: contract.documentUrl
    });
  } catch (error) {
    console.error('Error downloading contract:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get contract type by ID
// @route   GET /api/contracts/types/:id  
// @access  Public
exports.getContractTypeById = async (req, res) => {
  try {
    // Use lean() to get plain object directly from MongoDB
    const contractType = await ContractType.findById(req.params.id).lean();

    if (!contractType) {
      return res.status(404).json({
        success: false,
        message: 'Contract type not found'
      });
    }

    console.log('Fetched contractType:', contractType); // Debug output

    res.status(200).json({
      success: true,
      data: contractType
    });
  } catch (error) {
    console.error('Error fetching contract type:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};



// 1. Get all pending contracts for a lawyer
exports.getPendingContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({ lawyer: req.user.id, status: 'pending' })
      .populate('client', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: contracts.length,
      data: contracts
    });
  } catch (error) {
    console.error('Error fetching pending contracts:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// 2. Get contract by ID for lawyer
exports.getContractByIdForLawyer = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('client', 'name email')
      .populate('lawyer', 'name email')
      .lean();

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    if (contract.lawyer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this contract'
      });
    }

    res.status(200).json({
      success: true,
      data: contract
    });
  } catch (error) {
    console.error('Error fetching contract by ID for lawyer:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// 3. Update contract status (verified, rejected, etc.)
exports.updateContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    if (contract.lawyer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this contract'
      });
    }

    const { status, rejectionReason } = req.body;

    const validStatuses = ['pending', 'verified', 'signed', 'rejected', 'expired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    contract.status = status;

    if (status === 'rejected' && rejectionReason) {
      contract.rejectionReason = rejectionReason;
    }

    await contract.save();

    res.status(200).json({
      success: true,
      data: contract
    });
  } catch (error) {
    console.error('Error updating contract:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// 4. Lawyer signs the contract
exports.signContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    if (contract.lawyer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to sign this contract'
      });
    }

    const { signature } = req.body;

    if (!signature) {
      return res.status(400).json({
        success: false,
        message: 'Signature is required'
      });
    }

    contract.status = 'signed';
    contract.lawyerSigned = true;
    contract.signature = signature;
    contract.issueDate = new Date();

    await contract.save();

    res.status(200).json({
      success: true,
      data: contract
    });
  } catch (error) {
    console.error('Error signing contract:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// 5. Download signed contract PDF
exports.downloadSignedContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    if (contract.lawyer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to download this contract'
      });
    }

    if (!contract.documentUrl) {
      return res.status(400).json({
        success: false,
        message: 'Signed contract file not available'
      });
    }

    const filePath = path.join(__dirname, '../uploads', contract.documentUrl);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Signed file not found on server'
      });
    }

    res.download(filePath, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({
          success: false,
          message: 'Failed to download contract'
        });
      }
    });
  } catch (error) {
    console.error('Error downloading signed contract:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

exports.getSignedContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({ lawyer: req.user.id, status: 'signed' });

    res.status(200).json({
      success: true,
      data: contracts
    });
  } catch (error) {
    console.error('Error fetching signed contracts:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};