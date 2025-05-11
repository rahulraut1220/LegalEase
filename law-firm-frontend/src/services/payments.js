// services/payments.js
import api from './api';

// Dummy data for features not available in backend
const DUMMY_PAYMENTS = [
  {
    id: 1,
    amount: 500,
    status: 'completed',
    date: '2024-03-20',
    description: 'Initial consultation'
  },
  {
    id: 2,
    amount: 1500,
    status: 'pending',
    date: '2024-03-21',
    description: 'Case filing fee'
  }
];

const DUMMY_PAYMENT_METHODS = [
  {
    id: 1,
    type: 'card',
    last4: '4242',
    brand: 'visa',
    expMonth: 12,
    expYear: 2025
  }
];

// Real backend endpoint
export const createPayment = async (paymentData) => {
  try {
    const response = await api.post('/payments', {
      email: paymentData.email,
      amount: paymentData.amount,
      paymentMethodId: paymentData.paymentMethodId
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to create payment' 
    };
  }
};

// Dummy implementations for missing backend features
export const getAllPayments = async () => {
  return { 
    success: true, 
    data: DUMMY_PAYMENTS 
  };
};

export const getPaymentById = async (paymentId) => {
  const payment = DUMMY_PAYMENTS.find(p => p.id === paymentId);
  return { 
    success: true, 
    data: payment || null
  };
};

export const refundPayment = async (paymentId) => {
  const paymentIndex = DUMMY_PAYMENTS.findIndex(p => p.id === paymentId);
  if (paymentIndex !== -1) {
    DUMMY_PAYMENTS[paymentIndex].status = 'refunded';
  }
  return { 
    success: true, 
    data: { message: 'Payment refunded successfully' }
  };
};

export const getCasePayments = async (caseId) => {
  return { 
    success: true, 
    data: DUMMY_PAYMENTS.filter(p => p.caseId === caseId)
  };
};

export const generateInvoice = async (paymentId) => {
  const payment = DUMMY_PAYMENTS.find(p => p.id === paymentId);
  return { 
    success: true, 
    data: {
      invoiceNumber: `INV-${paymentId}`,
      payment,
      generatedDate: new Date().toISOString()
    }
  };
};

export const addPaymentMethod = async (paymentMethodData) => {
  const newPaymentMethod = {
    id: DUMMY_PAYMENT_METHODS.length + 1,
    ...paymentMethodData
  };
  DUMMY_PAYMENT_METHODS.push(newPaymentMethod);
  return { 
    success: true, 
    data: newPaymentMethod
  };
};

export const getAllPaymentMethods = async () => {
  return { 
    success: true, 
    data: DUMMY_PAYMENT_METHODS
  };
};