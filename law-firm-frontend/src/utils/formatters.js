/**
 * Utility functions for formatting data across the application
 */

// Format date to a readable string
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Format date with time
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Format currency (USD by default)
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === undefined || amount === null) return '';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Format phone number to (XXX) XXX-XXXX
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Strip all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Check if the number has 10 digits (US phone number)
  if (cleaned.length === 10) {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
  }
  
  // Return original if not 10 digits
  return phoneNumber;
};

// Format file size (converts bytes to KB, MB, etc.)
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

// Truncate long text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return `${text.slice(0, maxLength)}...`;
};

// Format case status with consistent capitalization and phrasing
export const formatCaseStatus = (status) => {
  if (!status) return '';
  
  const statusMap = {
    'open': 'Open',
    'in_progress': 'In Progress',
    'pending': 'Pending',
    'closed': 'Closed',
    'won': 'Won',
    'lost': 'Lost',
    'settled': 'Settled',
    'on_hold': 'On Hold'
  };
  
  return statusMap[status.toLowerCase()] || status;
};

// Format legal document type to readable text
export const formatDocumentType = (type) => {
  if (!type) return '';
  
  const typeMap = {
    'contract': 'Contract',
    'pleading': 'Pleading',
    'motion': 'Motion',
    'brief': 'Legal Brief',
    'transcript': 'Transcript',
    'evidence': 'Evidence',
    'correspondence': 'Correspondence',
    'affidavit': 'Affidavit',
    'memo': 'Memorandum',
    'other': 'Other Document'
  };
  
  return typeMap[type.toLowerCase()] || type;
};

// Generate a readable case reference number
export const formatCaseReference = (caseId, clientLastName, year) => {
  if (!caseId) return '';
  
  // If we have all parts, format a readable reference
  if (clientLastName && year) {
    return `${clientLastName.toUpperCase().substring(0, 3)}-${year}-${caseId.toString().padStart(4, '0')}`;
  }
  
  // Fallback to just the ID with padding
  return `CASE-${caseId.toString().padStart(4, '0')}`;
};