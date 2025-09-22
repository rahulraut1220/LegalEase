import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach token
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

const register = async (data) => {
  const res = await API.post('/auth/register', data);
  return res.data;
};

const login = async (data) => {
  const res = await API.post('/auth/login', data);
  return res.data;
};

const getProfile = async () => {
  const res = await API.get('/auth/profile');
  return res.data;
};

const getUserDetailsById = async (id) => {
  const res = await API.get(`/auth/user/${id}`);
  console.log(res.data);
  return res.data;
};

export default { register, login, getProfile, getUserDetailsById };
