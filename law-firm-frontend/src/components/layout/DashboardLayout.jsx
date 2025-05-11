import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
const DashboardLayout = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login", { state: { from: window.location.pathname } });
    }
  }, [isAuthenticated, loading, navigate]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>{" "}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {" "}
      <Navbar />{" "}
      <div className="flex">
        {" "}
        <Sidebar />{" "}
        <main className="flex-1 p-6">
          {" "}
          <div className="max-w-7xl mx-auto">{children}</div>{" "}
        </main>{" "}
      </div>{" "}
      <Footer />{" "}
    </div>
  );
};
export default DashboardLayout;
