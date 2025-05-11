import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CaseCard from "../../components/cases/CaseCard";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import Modal from "../../components/common/Modal";
import CaseForm from "../../components/cases/CaseForm";
import { getAllCases, createCase, assignLawyer } from "../../services/cases";

const Cases = () => {
  const { user, loading: authLoading } = useAuth();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState("all"); // all, active, closed
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        // Wait for auth to be loaded
        if (authLoading) {
          console.log("Auth still loading...");
          return;
        }

        // Check if user is authenticated
        if (!user) {
          console.log("No authenticated user found");
          setError("Please login to view cases");
          setLoading(false);
          return;
        }

        console.log("Fetching cases for user:", JSON.stringify(user));
        const response = await getAllCases();
        console.log("API Response:", JSON.stringify(response));

        if (response.success) {
          const casesData = response.data?.cases || [];
          console.log("Cases data:", JSON.stringify(casesData));
          setCases(casesData);
        } else {
          console.error("Error in response:", response.error);
          setError(response.error);
        }
      } catch (err) {
        console.error("Exception while fetching cases:", err);
        setError("Failed to fetch cases");
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [user, authLoading]);

  const handleCreateCase = async (newCase) => {
    try {
      console.log("Creating new case:", newCase);
      const response = await createCase(newCase);
      console.log("Create case response:", response);

      if (response.success) {
        const newCaseData = response.data?.case;
        console.log("New case data:", newCaseData);
        setCases([newCaseData, ...cases]);
        setShowCreateModal(false);
      } else {
        console.error("Error creating case:", response.error);
        setError(response.error);
      }
    } catch (err) {
      console.error("Exception while creating case:", err);
      setError("Failed to create case");
    }
  };

  const handleAssignCase = async (caseId) => {
    try {
      const response = await assignLawyer(caseId);
      if (response.success) {
        // Update the cases list with the assigned case
        setCases(cases.map((c) => (c._id === caseId ? response.data.case : c)));
      } else {
        setError(response.error);
      }
    } catch (err) {
      console.error("Error assigning case:", err);
      setError("Failed to assign case");
    }
  };

  const filteredCases = cases.filter((c) => {
    if (filter === "all") return true;
    if (filter === "active")
      return c.status === "Open" || c.status === "In Progress";
    return c.status.toLowerCase() === filter.toLowerCase();
  });

  // Show loading spinner while auth is loading
  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Cases</h1>
          {user?.role === "client" && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create New Case
            </Button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex space-x-2 mb-4 sm:mb-0">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md ${
                  filter === "all"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Cases
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-4 py-2 rounded-md ${
                  filter === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("closed")}
                className={`px-4 py-2 rounded-md ${
                  filter === "closed"
                    ? "bg-gray-300 text-gray-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Closed
              </button>
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search cases..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCases.map((caseItem) => (
                <CaseCard
                  key={caseItem._id}
                  caseData={caseItem}
                  onAssign={handleAssignCase}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {user?.role === "lawyer"
                  ? "No cases available at the moment. Check back later for new cases."
                  : "No cases found. Create a new case to get started."}
              </p>
              {user?.role === "client" && (
                <div className="mt-4">
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Create New Case
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Case"
      >
        <CaseForm onSubmit={handleCreateCase} />
      </Modal>
    </DashboardLayout>
  );
};

export default Cases;
