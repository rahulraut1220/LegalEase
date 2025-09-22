import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import caseReducer from './features/caseSlice';
import contractReducer from './features/contractsSlice'; // you're using "contract"
import documentReducer from './features/documentSlice'; // <-- this will appear as "state.document" in selectors
import appointmentReducer from './features/appointmentSlice'; // Assuming you have an appointmentSlice
export const store = configureStore({
  reducer: {
    auth: authReducer,
    case: caseReducer,
    contract: contractReducer, 
    document: documentReducer, // <-- this will appear as "state.document" in selectors
    appointment: appointmentReducer, // Assuming you have an appointmentReducer
  },
});
