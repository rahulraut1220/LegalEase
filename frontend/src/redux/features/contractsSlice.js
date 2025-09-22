import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllContractTypes,
  getContractById,
  submitContract,
  getMyContracts,
  downloadContract,
  fetchLawyersForContract, // ✅ NEW
} from '../../services/contractAPI';

// ✅ Async Thunks
export const fetchClientContracts = createAsyncThunk(
  'contracts/fetchClientContracts',
  getMyContracts
);

export const fetchContractById = createAsyncThunk(
  'contracts/fetchById',
  getContractById
);

export const fetchContractTypes = createAsyncThunk(
  'contracts/fetchContractTypes',
  getAllContractTypes
);

export const createContract = createAsyncThunk(
  'contracts/createContract',
  submitContract
);

export const downloadContractFile = createAsyncThunk(
  'contracts/download',
  downloadContract
);

export const fetchLawyers = createAsyncThunk(
  'contracts/fetchLawyers',
  fetchLawyersForContract
);

// ✅ Initial State
const initialState = {
  clientContracts: [],
  selectedContract: null,
  types: [],
  lawyers: [], // ✅ NEW
  loading: false,
  error: null,
};

// ✅ Slice
const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientContracts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientContracts.fulfilled, (state, action) => {
        state.loading = false;
        state.clientContracts = action.payload.data;
      })
      .addCase(fetchClientContracts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchContractById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContractById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedContract = action.payload.data;
      })
      .addCase(fetchContractById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchContractTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContractTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload.data;
      })
      .addCase(fetchContractTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("❌ Error fetching contract types:", action.error);
      })

      .addCase(createContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.loading = false;
        state.clientContracts.push(action.payload.data);
      })
      .addCase(createContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchLawyers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLawyers.fulfilled, (state, action) => {
        state.loading = false;
        state.lawyers = action.payload.data;
      })
      .addCase(fetchLawyers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("❌ Error fetching lawyers:", action.error);
      })

      .addCase(downloadContractFile.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default contractsSlice.reducer;
