// src/utils/contractUtils.js

// Format contract status with appropriate color
export const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'verified':
      return 'bg-blue-100 text-blue-800';
    case 'signed':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'expired':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Format status label with first letter capitalized
export const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// Format date to readable format
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Check if a contract is editable
export const isContractEditable = (contract) => {
  return contract && contract.status === 'pending';
};

// Check if a contract is downloadable
export const isContractDownloadable = (contract) => {
  return contract && contract.status === 'signed' && contract.documentUrl;
};

// Generate dynamic form fields based on contract type
export const generateFormFields = (contractType) => {
  if (!contractType || !contractType.requiredFields) return [];
  
  return contractType.requiredFields.map(field => {
    // Convert camelCase or snake_case to readable label
    const label = field
      .replace(/([A-Z])/g, ' $1') // Insert a space before all capital letters
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
      
    return {
      name: field,
      label,
      type: getFieldType(field),
      required: true
    };
  });
};

// Helper to determine field type based on field name
const getFieldType = (fieldName) => {
  const lowerField = fieldName.toLowerCase();
  
  if (lowerField.includes('date')) return 'date';
  if (lowerField.includes('email')) return 'email';
  if (lowerField.includes('phone')) return 'tel';
  if (lowerField.includes('amount') || lowerField.includes('price') || lowerField.includes('cost')) return 'number';
  if (lowerField.includes('description') || lowerField.includes('notes')) return 'textarea';
  
  return 'text';
};