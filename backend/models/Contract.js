const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  contractType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ContractType',
    required: [true, 'Contract type is required']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Client is required']
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Lawyer is required']
  },
  contractData: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Contract data is required']
  },
  signature: {
  type: String, // Can be base64 image, signature ID, or URL
  default: null
},

  status: {
    type: String,
    enum: ['pending', 'verified', 'signed', 'rejected', 'expired'],
    default: 'pending'
  },
  documentUrl: {
    type: String,
    default: null
  },
  clientSigned: {
    type: Boolean,
  },
  lawyerSigned: {
    type: Boolean,
    default: false
  },
  issueDate: {
    type: Date,
    default: null
  },
  expiryDate: {
    type: Date,
    default: null
  },
  rejectionReason: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contract', ContractSchema);