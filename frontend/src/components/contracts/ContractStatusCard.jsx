import React from "react";

const ContractStatusCard = ({ contract }) => {
  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <h2 className="text-lg font-bold mb-2">
        {contract.contractType?.name || "Contract"}
      </h2>

      <p>
        <strong>Contract ID:</strong> {contract._id}
      </p>
      <p>
        <strong>Status:</strong> {contract.status}
      </p>
      <p>
        <strong>Client:</strong> {contract.client}
      </p>
      <p>
        <strong>Lawyer:</strong> {contract.lawyer?.name}
      </p>
      <p>
        <strong>Client Signed:</strong> {contract.clientSigned ? "Yes" : "No"}
      </p>
      <p>
        <strong>Lawyer Signed:</strong> {contract.lawyerSigned ? "Yes" : "No"}
      </p>
      <p>
        <strong>Issue Date:</strong>{" "}
        {contract.issueDate
          ? new Date(contract.issueDate).toLocaleDateString()
          : "Not issued"}
      </p>
      <p>
        <strong>Expiry Date:</strong>{" "}
        {contract.expiryDate
          ? new Date(contract.expiryDate).toLocaleDateString()
          : "Not set"}
      </p>
      {contract.rejectionReason && (
        <p>
          <strong>Rejection Reason:</strong> {contract.rejectionReason}
        </p>
      )}
      {contract.documentUrl && (
        <a
          href={contract.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Download Document
        </a>
      )}
    </div>
  );
};

export default ContractStatusCard;
