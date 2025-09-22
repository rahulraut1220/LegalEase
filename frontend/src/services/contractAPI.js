import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const fetchLawyersForContract = async () => {
  const res = await API.get('/contracts/lawyers');
  return res.data;
};


export const getAllContractTypes = async () => {
  const res = await API.get('/contracts/types');
  return res.data;
};

export const getContractById = async (id) => {
  const res = await API.get(`/contracts/${id}`);
  return res.data;
}

export const getContractTypeById = async (id) => {
  const res = await API.get(`/contracts/types/${id}`);
  return res.data;
};

export const submitContract = async (data) => {

  const res = await API.post('/contracts/submit', data);
  return res.data;
};

export const getMyContracts = async () => {
  const res = await API.get('/contracts/my');
  return res.data;
};

export const downloadContract = async (contractId) => {
  const res = await API.get(`/contracts/${contractId}/download`, {
    responseType: 'blob',
  });
  return res.data;
};

// for lawyer
export const getPendingContracts = async () => {
  const res = await API.get('/contracts/lawyer/pending');
  return res.data;
};

export const getContractByIdForLawyer = async (id) => {
  const res = await API.get(`/contracts/${id}`);
  return res.data;
};

export const updateContract = async (id, status) => {
  const res = await API.patch(`/contracts/${id}`, { status });
  return res.data;
};

export const signContract = async (id, signature) => {
  const res = await API.post(`/contracts/${id}/sign`, { signature });
  return res.data;
};

export const downloadSignedContract = async (id) => {
  const res = await API.get(`/contracts/${id}/download`, {
    responseType: 'blob',
  });
  return res.data;
};

export const getSignedContracts = async () => {
  const res = await API.get('/contracts/signed');
  return res.data;
};
