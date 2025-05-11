// src/components/contracts/ContractDetail.jsx
import React from "react";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../../utils/ContractUtils";

const ContractDetail = ({
  contract,
  userRole,
  onSign,
  onReject,
  onDownload,
  loading,
}) => {
  if (!contract) {
    return (
      <div className="flex justify-center my-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const isLawyer = userRole === "lawyer";
  const canSign = isLawyer && contract.status === "pending";
  const canReject = isLawyer && contract.status === "pending";
  const canDownload = contract.status === "signed" && contract.documentUrl;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {contract.contractType?.name || "Contract Details"}
        </h2>
        <StatusBadge status={contract.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Client Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p>
              <span className="font-medium">Name:</span> {contract.client?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {contract.client?.email}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Lawyer Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p>
              <span className="font-medium">Name:</span> {contract.lawyer?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {contract.lawyer?.email}
            </p>
            {contract.lawyer?.specialization && (
              <p>
                <span className="font-medium">Specialization:</span>{" "}
                {contract.lawyer.specialization}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Contract Information</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p>
            <span className="font-medium">Created:</span>{" "}
            {formatDate(contract.createdAt)}
          </p>
          {contract.issueDate && (
            <p>
              <span className="font-medium">Issue Date:</span>{" "}
              {formatDate(contract.issueDate)}
            </p>
          )}
          {contract.expiryDate && (
            <p>
              <span className="font-medium">Expiry Date:</span>{" "}
              {formatDate(contract.expiryDate)}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Contract Details</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          {contract.contractData &&
            Object.entries(contract.contractData).map(([key, value]) => (
              <p key={key}>
                <span className="font-medium">
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                  :
                </span>{" "}
                {value}
              </p>
            ))}
        </div>
      </div>

      {contract.status === "rejected" && contract.rejectionReason && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Rejection Reason</h3>
          <div className="bg-red-50 p-4 rounded-md text-red-700">
            {contract.rejectionReason}
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-end gap-2 mt-6">
        {canDownload && (
          <button
            onClick={onDownload}
            disabled={loading}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Download Contract
          </button>
        )}

        {canSign && (
          <button
            onClick={onSign}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {loading ? "Processing..." : "Sign Contract"}
          </button>
        )}

        {canReject && (
          <button
            onClick={onReject}
            disabled={loading}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reject Contract
          </button>
        )}
      </div>
    </div>
  );
};

export default ContractDetail;
