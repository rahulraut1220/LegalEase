import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) req.headers.Authorization = `Bearer ${user.token}`;
  return req;
});

const getProfile = async () => (await API.get('/user/profile')).data;
const updateProfile = async (data) => (await API.put('/user/profile', data)).data;
const changePassword = async (data) => (await API.put('/user/change-password', data)).data;
const deleteProfile = async () => (await API.delete('/user/profile')).data;
const getLawyers = async () => (await API.get('/user/lawyers')).data;

export default { getProfile, updateProfile, changePassword, deleteProfile, getLawyers };
