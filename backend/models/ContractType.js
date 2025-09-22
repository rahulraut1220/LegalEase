const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  label: { type: String, required: true },
  type: { type: String, required: true, enum: ['text', 'number', 'date', 'textarea', 'select', 'file'] },
  options: { type: [String], default: [] } // only used for 'select'
});

const ContractTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide contract type name'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide contract type description']
  },
  requiredFields: {
    type: [FieldSchema],
    required: [true, 'Please provide required fields for this contract type']
  },
  template: {
    type: String,
    required: [true, 'Please provide contract template']
  },
  validityPeriod: {
    type: Number, // In months
    default: 12
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ContractType', ContractTypeSchema);
