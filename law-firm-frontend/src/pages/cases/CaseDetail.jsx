import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CaseTimeline from "../../components/cases/CaseTimeline";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import Modal from "../../components/common/Modal";
import { getCaseById, assignLawyer, closeCase } from "../../services/cases";

const CaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [error, setError] = useState(null);
  const [closeReason, setCloseReason] = useState("");

  useEffect(() => {
    const fetchCaseData = async () => {
      if (!id) {
        setError("Invalid case ID");
        setLoading(false);
        return;
      }

      try {
        const response = await getCaseById(id);
        if (response.success) {
          setCaseData(response.data.case);
        } else {
          setError(response.error || "Failed to fetch case details");
        }
      } catch (error) {
        setError("Failed to fetch case details");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseData();
  }, [id]);

  const handleAssignLawyer = async () => {
    try {
      const response = await assignLawyer(id);
      if (response.success) {
        setCaseData(response.data.case);
        setShowAssignModal(false);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to assign lawyer");
    }
  };

  const handleCloseCase = async () => {
    try {
      const response = await closeCase(id);
      if (response.success) {
        setCaseData(response.data.case);
        setShowCloseModal(false);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to close case");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {caseData.title}
                </h1>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      caseData.status === "Open"
                        ? "bg-blue-100 text-blue-800"
                        : caseData.status === "In Progress"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {caseData.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                {caseData.status !== "Closed" && (
                  <>
                    {!caseData.lawyer && (
                      <Button
                        onClick={() => setShowAssignModal(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Assign Lawyer
                      </Button>
                    )}
                    <Button
                      onClick={() => setShowCloseModal(true)}
                      className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      Close Case
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-6">
            <div className="lg:col-span-2 p-6">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Case Details
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{caseData.description}</p>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium">
                        {new Date(caseData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {caseData.lawyer && (
                      <div>
                        <p className="text-sm text-gray-500">Assigned Lawyer</p>
                        <p className="font-medium">{caseData.lawyer.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Case Timeline
                </h2>
                <CaseTimeline events={caseData.timeline || []} />
              </div>
            </div>

            <div className="p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Client Information
              </h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="font-medium">{caseData.client.name}</p>
                <p className="text-gray-600">{caseData.client.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title="Assign Lawyer"
      >
        <div className="p-4">
          <p className="mb-4">
            Are you sure you want to assign yourself to this case?
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => setShowAssignModal(false)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignLawyer}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Assign
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showCloseModal}
        onClose={() => setShowCloseModal(false)}
        title="Close Case"
      >
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Reason for closing
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={closeReason}
              onChange={(e) => setCloseReason(e.target.value)}
              placeholder="Enter the reason for closing the case..."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => setShowCloseModal(false)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCloseCase}
              className="bg-red-600 hover:bg-red-700"
            >
              Close Case
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default CaseDetail;
