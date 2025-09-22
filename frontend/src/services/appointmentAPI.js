// src/services/appointmentAPI.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

// ✅ Automatically attach token to every request (same as caseAPI.js)
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Appointment API functions
const bookAppointment = async (data) => {
  const res = await API.post('/appointments/book', data);
  return res.data; // ✅ return only serializable payload
};
const getMyAppointments = () =>
  API.get('/appointments/my'); // token already handled

const getMyAppointmentsByCaseId = async (caseId) => {
  const res = await API.get(`/appointments/case/${caseId}`);
  return res.data;
};

const getAppointmentById = async (id) => {
  const res = await API.get(`/appointments/${id}`); 
  return res.data; // ✅ return only serializable payload
};

const verifyPayment = (sessionId) =>
  API.post('/appointments/verify', { sessionId }); // token already handled

// ✅ Exporting as default object
export default {
  bookAppointment,
  getMyAppointments,
  verifyPayment,
  getMyAppointmentsByCaseId,
  getAppointmentById,
};
