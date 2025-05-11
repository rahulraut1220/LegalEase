import React, { useState, useEffect } from "react";
import ContractList from "../../components/contracts/ContractList";
import useContracts from "../../hooks/useContracts";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatusBadge from "../../components/contracts/StatusBadge";
import { formatDate } from "../../utils/ContractUtils";

const LawyerContracts = () => {
  const {
    contracts,
    pendingContracts,
    loading,
    loadingPending,
    error,
    errorPending,
    fetchLawyerContracts,
    fetchLawyerPendingContracts,
    signContract,
    rejectContract,
  } = useContracts();

  const [activeTab, setActiveTab] = useState("pending");
  const [selectedContract, setSelectedContract] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [signingInProgress, setSigningInProgress] = useState(false);
  const [rejectingInProgress, setRejectingInProgress] = useState(false);

  useEffect(() => {
    fetchLawyerPendingContracts();

    if (activeTab === "all") {
      fetchLawyerContracts();
    }

    setSelectedContract(null);
    setShowReviewModal(false);
    setShowRejectModal(false);
    setRejectionReason("");
  }, [activeTab, fetchLawyerPendingContracts, fetchLawyerContracts]);

  const handleReviewContract = (contract) => {
    setSelectedContract(contract);
    setShowReviewModal(true);
  };

  const handleSignContract = async () => {
    if (!selectedContract || !selectedContract._id) {
      alert("Invalid contract. Please try again.");
      return;
    }

    try {
      setSigningInProgress(true);
      await signContract(selectedContract._id);
      setShowReviewModal(false);
      setSelectedContract(null);

      activeTab === "pending"
        ? fetchLawyerPendingContracts()
        : fetchLawyerContracts();

      alert("Contract signed successfully!");
    } catch (err) {
      console.error("Error signing contract:", err);
      alert("Failed to sign contract.");
    } finally {
      setSigningInProgress(false);
    }
  };

  const openRejectModal = () => setShowRejectModal(true);

  const handleRejectContract = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    if (!selectedContract || !selectedContract._id) {
      alert("Invalid contract. Please try again.");
      return;
    }

    try {
      setRejectingInProgress(true);
      await rejectContract(selectedContract._id, rejectionReason);
      setShowRejectModal(false);
      setShowReviewModal(false);
      setSelectedContract(null);
      setRejectionReason("");

      activeTab === "pending"
        ? fetchLawyerPendingContracts()
        : fetchLawyerContracts();

      alert("Contract rejected successfully");
    } catch (err) {
      console.error("Error rejecting contract:", err);
      alert("Failed to reject contract.");
    } finally {
      setRejectingInProgress(false);
    }
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedContract(null);
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setRejectionReason("");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Contracts Dashboard</h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "pending"
                  ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending Approval
              {pendingContracts && pendingContracts.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {pendingContracts.length}
                </span>
              )}
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "all"
                  ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Contracts
            </button>
          </div>
          <div className="p-6">
            {activeTab === "pending" ? (
              <ContractList
                contracts={pendingContracts}
                loading={loadingPending}
                error={errorPending}
                emptyMessage="You don't have any pending contracts to review."
                onReviewContract={handleReviewContract}
              />
            ) : (
              <ContractList
                contracts={contracts}
                loading={loading}
                error={error}
                emptyMessage="You don't have any contracts assigned to you yet."
                onReviewContract={handleReviewContract}
              />
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Review Contract</h2>
              <button
                onClick={closeReviewModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Contract Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Contract Details</h3>
                <div className="space-y-2">
                  <div>
                    <strong>Contract Type:</strong>{" "}
                    {selectedContract.contractType?.name || "Unknown"}
                  </div>
                  <div>
                    <strong>Client:</strong>{" "}
                    {selectedContract.client?.name || "Unknown"}
                  </div>
                  <div>
                    <strong>Created Date:</strong>{" "}
                    {formatDate(selectedContract.createdAt)}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    <StatusBadge status={selectedContract.status} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Client Info</h3>
                <div className="space-y-2">
                  <div>
                    <strong>Name:</strong>{" "}
                    {selectedContract.client?.name || "Unknown"}
                  </div>
                  <div>
                    <strong>Email:</strong>{" "}
                    {selectedContract.client?.email || "Unknown"}
                  </div>
                  <div>
                    <strong>Phone:</strong>{" "}
                    {selectedContract.client?.phone || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Contract Terms</h3>
              <div className="border p-4 rounded bg-gray-50 whitespace-pre-wrap">
                {selectedContract.terms || "No terms provided."}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                Additional Information
              </h3>
              <div className="border p-4 rounded bg-gray-50 whitespace-pre-wrap">
                {selectedContract.additionalInfo || "None provided."}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Documents</h3>
              {selectedContract.documents?.length > 0 ? (
                <ul className="border rounded divide-y">
                  {selectedContract.documents.map((doc, index) => (
                    <li key={index} className="p-3 flex justify-between">
                      <span>{doc.name || `Document ${index + 1}`}</span>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No documents uploaded.</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={openRejectModal}
                className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200"
              >
                Reject
              </button>
              <button
                onClick={handleSignContract}
                disabled={signingInProgress}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {signingInProgress ? "Signing..." : "Sign Contract"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Reject Contract</h2>
            <textarea
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason for rejection..."
              className="w-full p-3 border rounded mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={closeRejectModal}
                className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectContract}
                disabled={rejectingInProgress}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                {rejectingInProgress ? "Rejecting..." : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default LawyerContracts;
