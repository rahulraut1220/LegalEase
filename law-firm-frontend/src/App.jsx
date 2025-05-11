import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import Spinner from "./components/common/Spinner";

// Import pages directly
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cases from "./pages/cases/Cases";
import CaseDetail from "./pages/cases/CaseDetail";
import Documents from "./pages/documents/Documents";
import Appointments from "./pages/appointments/Appointments";
import Analysis from "./pages/ai/Analysis";

// Import the new pages
import Services from "./pages/Services";
import About from "./pages/About";
import DocumentAnalysisPage from "./pages/DocumentAnalysisPage";

// Import blog components
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import BlogForm from "./components/BlogForm";
import BlogDashboard from "./pages/blogs/BlogDashboard";

// Import contract pages
import ClientContracts from "./pages/contracts/ClientContracts";
import LawyerContracts from "./pages/contracts/LawyerContracts";
import ContractCreation from "./pages/contracts/ContractCreation";
import ContractView from "./pages/contracts/ContractView";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Added new public routes */}
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />

        {/* Blog routes */}
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/blogs/create" element={<BlogForm />} />
        <Route path="/blogs/edit/:id" element={<BlogForm />} />

        {/* Dashboard layout wrapper for protected routes */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          {/* Dashboard home */}
          <Route index element={<Dashboard />} />

          {/* User profile */}
          <Route path="profile" element={<Profile />} />

          {/* Case management routes */}
          <Route path="cases" element={<Cases />} />
          <Route path="cases/:id" element={<CaseDetail />} />

          {/* Document routes */}
          <Route path="documents" element={<Documents />} />
          <Route path="document-analysis" element={<DocumentAnalysisPage />} />

          {/* Appointment routes */}
          <Route path="appointments" element={<Appointments />} />

          {/* AI Analysis route */}
          <Route path="analysis" element={<Analysis />} />

          {/* Resources route */}
          <Route path="resources" element={<BlogDashboard />} />

          {/* Contract routes - All under dashboard layout */}
          <Route path="contracts">
            <Route index element={<ClientContracts />} />
            <Route path="client" element={<ClientContracts />} />
            <Route path="lawyer" element={<LawyerContracts />} />
            <Route path="create" element={<ContractCreation />} />
            <Route path=":id" element={<ContractView />} />
          </Route>
        </Route>

        {/* Fallback routes for direct access */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/cases/:id" element={<CaseDetail />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/document-analysis" element={<DocumentAnalysisPage />} />
        <Route path="/resources" element={<BlogDashboard />} />

        {/* Contract routes outside dashboard for direct access */}

        <Route path="/contracts/client" element={<ClientContracts />} />
        <Route path="/contracts/lawyer" element={<LawyerContracts />} />
        <Route path="/contracts/create" element={<ContractCreation />} />
        <Route path="/contracts/:id" element={<ContractView />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
