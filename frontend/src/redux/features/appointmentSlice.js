import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentService from "../../services/appointmentAPI";

const initialState = {
  appointments: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};

// Book appointment
export const bookAppointment = createAsyncThunk(
  "appointments/book",
  async (appointmentData, thunkAPI) => {
    try {
      return await appointmentService.bookAppointment(appointmentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Verify payment
export const verifyPayment = createAsyncThunk(
  "appointments/verify",
  async (sessionId, thunkAPI) => {
    try {
      return await appointmentService.verifyPayment(sessionId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Get my appointments
export const getMyAppointments = createAsyncThunk(
  "appointments/my",
  async (_, thunkAPI) => {
    try {
      return await appointmentService.getMyAppointments();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    resetAppointmentState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
      })

      // ✅ Add payment verification cases here:
      .addCase(verifyPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optional: update the specific appointment in state.appointments
        const updated = action.payload;
        state.appointments = state.appointments.map((appt) =>
          appt._id === updated._id ? updated : appt
        );
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAppointmentState } = appointmentSlice.actions;
export default appointmentSlice.reducer;
