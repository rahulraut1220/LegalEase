import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../services/caseAPI";
import toast from "react-hot-toast";

export const fetchMyCases = createAsyncThunk("cases/myCases", async () => {
  const res = await api.getMyCases();
  return res.data;
});

export const createNewCase = createAsyncThunk("cases/create", async (payload) => {
  const res = await api.createCase(payload);
  toast.success("Case created!");
  return res.data;
});

export const assignToCase = createAsyncThunk("cases/assign", async (id) => {
  const res = await api.assignCase(id);
  toast.success("Case assigned!");
  return res.data;
});

export const closeCaseById = createAsyncThunk("cases/close", async (id) => {
  const res = await api.closeCase(id);
  toast.success("Case closed!");
  return res.data;
});

const caseSlice = createSlice({
  name: "case",
  initialState: { cases: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyCases.pending, (state) => { state.loading = true; })
      .addCase(fetchMyCases.fulfilled, (state, action) => {
        state.cases = action.payload;
        state.loading = false;
      });
  }
});

export default caseSlice.reducer;
