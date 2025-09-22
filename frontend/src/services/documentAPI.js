import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// Upload a PDF
const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("pdf", file); // 👈 must be "pdf" (not "file")

  const res = await API.post('/pdf/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

// Get all uploaded documents
const getDocuments = async () => {
  const res = await API.get('/pdf/history');
  return res.data;
};

export default {
  uploadDocument,
  getDocuments,
};
