import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

// Public Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import VideoCall from "../components/VideoCall";

// Dashboard Pages
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";

import CreateCase from "../pages/cases/CreateCase";
import MyCases from "../pages/cases/MyCases";
import CaseDetails from "../pages/cases/CaseDetails";

import DocumentsPage from "../pages/documents/DocumentsPage";

import BookAppointment from "../pages/appointments/BookAppointment";
import MyAppointments from "../pages/appointments/MyAppointments";
import AppointmentSuccess from "../pages/appointments/AppointmentSuccess";
import AppointmentDetails from "../components/appointments/AppointmentDetails";

import PdfQA from "../pages/PdfQA";

import CreateContract from "../pages/contracts/CreateContract";
import MyContracts from "../pages/contracts/MyContracts";
import AvailableContracts from "../pages/contracts/AvailableContracts";
import PendingContracts from "../pages/lawyerContracts/PendingContracts";
import ReviewContract from "../pages/lawyerContracts/ReviewContract";
import SignedContracts from "../pages/lawyerContracts/SignedContracts";

const AppRoutes = () => {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/video-call" element={<VideoCall />} />

      {/* --- Dashboard (Protected) Routes --- */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Profile */}
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="change-password" element={<ChangePassword />} />

        {/* Cases */}
        <Route path="cases/create" element={<CreateCase />} />
        <Route path="cases/my" element={<MyCases />} />
        <Route path="cases/:id" element={<CaseDetails />} />

        {/* Contracts */}
        <Route path="/contracts" element={<AvailableContracts />} />
        <Route path="/contracts/create/:id" element={<CreateContract />} />
        <Route path="/contracts/my" element={<MyContracts />} />

        {/* Lawyer Contracts */}
        <Route
          path="/lawyer/contracts/pending"
          element={<PendingContracts />}
        />
        <Route
          path="/lawyer/contracts/review/:id"
          element={<ReviewContract />}
        />
        <Route path="/lawyer/contracts/signed" element={<SignedContracts />} />

        {/* Documents */}
        <Route path="documents" element={<DocumentsPage />} />

        {/* Appointments */}
        <Route
          path="book-appointment/:lawyerId/:caseId"
          element={<BookAppointment />}
        />

        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:id" element={<AppointmentDetails />} />

        <Route path="/appointment-success" element={<AppointmentSuccess />} />

        {/* Utilities */}
        <Route path="/pdf" element={<PdfQA />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
