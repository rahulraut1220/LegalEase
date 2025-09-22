import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../../services/userAPI';

export const fetchProfile = createAsyncThunk('user/get', userAPI.getProfile);
export const updateUser = createAsyncThunk('user/update', userAPI.updateProfile);
export const changeUserPassword = createAsyncThunk('user/password', userAPI.changePassword);
export const deleteUser = createAsyncThunk('user/delete', userAPI.deleteProfile);
export const fetchLawyers = createAsyncThunk('user/lawyers', userAPI.getLawyers);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    lawyers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchLawyers.fulfilled, (state, action) => {
        state.lawyers = action.payload;
      });
  },
});

export default userSlice.reducer;
