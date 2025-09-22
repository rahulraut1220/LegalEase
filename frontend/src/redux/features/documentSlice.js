import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import documentService from '../../services/documentAPI';
export const uploadDocument = createAsyncThunk(
  'document/upload',
  async (file, thunkAPI) => {
    try {
      return await documentService.uploadDocument(file);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getDocuments = createAsyncThunk(
  'document/getAll',
  async (_, thunkAPI) => {
    try {
      return await documentService.getDocuments();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    docs: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.docs.unshift(action.payload); // latest on top
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.docs = action.payload;
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default documentSlice.reducer;
