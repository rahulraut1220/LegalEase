// src/services/caseAPI.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // if using cookies
});

// ✅ Automatically attach token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user")); // or wherever your token is stored
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// ✅ Existing API calls
export const getMyCases = () => API.get("/cases/my-cases");
export const createCase = (data) => API.post("/cases/create", data);
export const assignCase = (id) => API.put("/cases/assign", { id });
export const closeCase = (id) => API.put("/cases/close", { id });
export const getCaseById = (id) => API.get(`/cases/${id}`);

// ✅ New APIs
export const uploadCaseDocument = (caseId, formData) =>
  API.post(`/cases/${caseId}/upload-document`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateCaseTimeline = (caseId, update) => {
  console.log(caseId, update);
  return API.post(`/cases/${caseId}/update-timeline`, update); // ✅ no { update }
};


export const getCaseDocuments = (caseId) =>
  API.get(`/cases/${caseId}/documents`);

export const getTimelineUpdates = (caseId) =>
  API.get(`/cases/${caseId}/timeline`);
  
