// services/appointments.js
import api from './api';

// Dummy data for features not available in backend
const DUMMY_APPOINTMENTS = [
  {
    id: 1,
    date: '2024-03-20',
    time: '10:00',
    lawyer: 'John Doe',
    status: 'scheduled'
  },
  {
    id: 2,
    date: '2024-03-21',
    time: '14:00',
    lawyer: 'Jane Smith',
    status: 'completed'
  }
];

const DUMMY_AVAILABLE_SLOTS = [
  { time: '09:00', available: true },
  { time: '10:00', available: false },
  { time: '11:00', available: true },
  { time: '14:00', available: true },
  { time: '15:00', available: true }
];

// Real backend endpoint
export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments', appointmentData);
    if (response.data.success) {
      return { success: true, data: response.data.appointment };
    }
    return { success: false, error: response.data.message };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to create appointment' 
    };
  }
};

// Dummy implementations for missing backend features
export const getAllAppointments = async () => {
  try {
    const response = await api.get('/appointments');
    if (response.data.success) {
      return { success: true, data: response.data.appointments };
    }
    return { success: false, error: response.data.message };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch appointments' 
    };
  }
};

export const getAppointmentById = async (appointmentId) => {
  try {
    const response = await api.get(`/appointments/${appointmentId}`);
    if (response.data.success) {
      return { success: true, data: response.data.appointment };
    }
    return { success: false, error: response.data.message };
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch appointment' 
    };
  }
};

export const updateAppointment = async (appointmentId, appointmentData) => {
  const appointmentIndex = DUMMY_APPOINTMENTS.findIndex(a => a.id === appointmentId);
  if (appointmentIndex !== -1) {
    DUMMY_APPOINTMENTS[appointmentIndex] = {
      ...DUMMY_APPOINTMENTS[appointmentIndex],
      ...appointmentData
    };
  }
  return { 
    success: true, 
    data: DUMMY_APPOINTMENTS[appointmentIndex]
  };
};

export const cancelAppointment = async (appointmentId) => {
  const appointmentIndex = DUMMY_APPOINTMENTS.findIndex(a => a.id === appointmentId);
  if (appointmentIndex !== -1) {
    DUMMY_APPOINTMENTS[appointmentIndex].status = 'cancelled';
  }
  return { 
    success: true, 
    data: { message: 'Appointment cancelled successfully' }
  };
};

export const getAvailableSlots = async () => {
  return { 
    success: true, 
    data: DUMMY_AVAILABLE_SLOTS
  };
};

export const rescheduleAppointment = async (appointmentId, newDateTime) => {
  const appointmentIndex = DUMMY_APPOINTMENTS.findIndex(a => a.id === appointmentId);
  if (appointmentIndex !== -1) {
    const [date, time] = newDateTime.split('T');
    DUMMY_APPOINTMENTS[appointmentIndex].date = date;
    DUMMY_APPOINTMENTS[appointmentIndex].time = time;
  }
  return { 
    success: true, 
    data: DUMMY_APPOINTMENTS[appointmentIndex]
  };
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await api.put(`/appointments/${appointmentId}/status`, { status });
    if (response.data.success) {
      return { success: true, data: response.data.appointment };
    }
    return { success: false, error: response.data.message };
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to update appointment status' 
    };
  }
};

export const getAvailableLawyers = async (caseId) => {
  try {
    const response = await api.get(`/appointments/case/${caseId}/lawyers`);
    if (response.data.success) {
      return { success: true, data: response.data.lawyers };
    }
    return { success: false, error: response.data.message };
  } catch (error) {
    console.error('Error fetching available lawyers:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to fetch available lawyers' 
    };
  }
};