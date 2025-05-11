/**
 * Utility functions for validating data before submission
 */

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validation (at least 8 chars, with numbers and special chars)
export const isStrongPassword = (password) => {
  if (!password || password.length < 8) return false;
  
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasNumber && hasSpecialChar;
};

// Phone number validation (US format)
export const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phoneNumber);
};

// Date validation (checks if date is valid and not in the past if required)
export const isValidDate = (dateString, allowPast = true) => {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const isValid = !isNaN(date.getTime());
  
  if (!isValid) return false;
  if (!allowPast && date < new Date()) return false;
  
  return true;
};

// Required field validation
export const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false;
  return value.toString().trim() !== '';
};

// Number validation (checks if value is a valid number and within range if specified)
export const isValidNumber = (value, min = null, max = null) => {
  if (value === null || value === undefined || value === '') return false;
  
  const number = parseFloat(value);
  if (isNaN(number)) return false;
  
  if (min !== null && number < min) return false;
  if (max !== null && number > max) return false;
  
  return true;
};

// URL validation
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// File type validation
export const isValidFileType = (filename, allowedTypes = []) => {
  if (!filename) return false;
  if (!allowedTypes.length) return true; // If no types specified, accept all
  
  const extension = filename.split('.').pop().toLowerCase();
  return allowedTypes.includes(extension);
};

// File size validation (size in bytes)
export const isValidFileSize = (size, maxSize) => {
  return size > 0 && size <= maxSize;
};

// State validation (US states)
export const isValidUSState = (state) => {
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    'DC', 'PR', 'VI', 'AS', 'GU', 'MP'
  ];
  
  return states.includes(state.toUpperCase());
};

// ZIP code validation
export const isValidZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

// Form validation helper that takes an object of values and validation rules
export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = values[field];
    const fieldRules = rules[field];
    
    if (fieldRules.required && !isNotEmpty(value)) {
      errors[field] = 'This field is required';
    } else if (fieldRules.email && value && !isValidEmail(value)) {
      errors[field] = 'Please enter a valid email address';
    } else if (fieldRules.password && value && !isStrongPassword(value)) {
      errors[field] = 'Password must be at least 8 characters with numbers and special characters';
    } else if (fieldRules.phone && value && !isValidPhoneNumber(value)) {
      errors[field] = 'Please enter a valid phone number';
    } else if (fieldRules.date && value && !isValidDate(value, fieldRules.allowPastDates)) {
      errors[field] = fieldRules.allowPastDates 
        ? 'Please enter a valid date' 
        : 'Please enter a valid date in the future';
    } else if (fieldRules.number && !isValidNumber(value, fieldRules.min, fieldRules.max)) {
      let errorMsg = 'Please enter a valid number';
      if (fieldRules.min !== null && fieldRules.max !== null) {
        errorMsg = `Please enter a number between ${fieldRules.min} and ${fieldRules.max}`;
      } else if (fieldRules.min !== null) {
        errorMsg = `Please enter a number greater than or equal to ${fieldRules.min}`;
      } else if (fieldRules.max !== null) {
        errorMsg = `Please enter a number less than or equal to ${fieldRules.max}`;
      }
      errors[field] = errorMsg;
    } else if (fieldRules.url && value && !isValidURL(value)) {
      errors[field] = 'Please enter a valid URL';
    } else if (fieldRules.match && values[fieldRules.match] !== value) {
      errors[field] = `This field must match ${fieldRules.matchLabel || fieldRules.match}`;
    } else if (fieldRules.custom && !fieldRules.custom.validator(value)) {
      errors[field] = fieldRules.custom.message;
    }
  });
  
  return errors;
};