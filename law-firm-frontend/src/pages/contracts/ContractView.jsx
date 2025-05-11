// src/pages/contracts/ContractView.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContractDetail from "../../components/contracts/ContractDetail";
import useContracts from "../../hooks/useContracts";
import DashboardLayout from "../../components/layout/DashboardLayout";

const ContractView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentContract,
    userRole,
    loading,
    actionLoading,
    error,
    fetchContract,
    signContract,
    rejectContract,
    downloadContract,
  } = useContracts();

  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchContract(id);
    }
  }, [id, fetchContract]);

  const handleSignContract = async () => {
    try {
      await signContract(id);
    } catch (error) {
      console.error("Error signing contract:", error);
    }
  };

  const handleShowRejectModal = () => {
    setShowRejectModal(true);
  };

  const handleRejectContract = async () => {
    if (!rejectionReason.trim()) {
      return;
    }

    try {
      await rejectContract(id, rejectionReason);
      setShowRejectModal(false);
    } catch (error) {
      console.error("Error rejecting contract:", error);
    }
  };

  const handleDownloadContract = async () => {
    try {
      await downloadContract(id);
    } catch (error) {
      console.error("Error downloading contract:", error);
    }
  };

  if (loading && !currentContract) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !currentContract) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to contracts
          </button>
        </div>

        <ContractDetail
          contract={currentContract}
          userRole={userRole}
          onSign={handleSignContract}
          onReject={handleShowRejectModal}
          onDownload={handleDownloadContract}
          loading={actionLoading}
        />

        {/* Rejection Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Reject Contract</h3>
              <p className="mb-4 text-gray-600">
                Please provide a reason for rejecting this contract. This will
                be shared with the client.
              </p>

              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full border rounded p-2 mb-4 h-32"
                placeholder="Enter rejection reason..."
              ></textarea>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectContract}
                  disabled={!rejectionReason.trim() || actionLoading}
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                    !rejectionReason.trim() || actionLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {actionLoading ? "Rejecting..." : "Submit Rejection"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ContractView;
