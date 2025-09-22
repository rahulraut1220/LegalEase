import React, { useState } from "react";

const ContractReviewDetails = ({ contract, onVerify, onReject, onSign }) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [signature, setSignature] = useState("");

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">{contract.title}</h2>
      <p>Client: {contract.client?.name}</p>
      <p>Email: {contract.client?.email}</p>
      <p>Status: {contract.status}</p>
      <div className="my-4">
        <h4 className="font-bold">Details:</h4>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(contract.fields, null, 2)}
        </pre>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onVerify}
          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Verify
        </button>

        <div>
          <input
            placeholder="Rejection reason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="border p-2 mr-2 rounded"
          />
          <button
            onClick={() => onReject(rejectionReason)}
            className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>

        <div>
          <input
            placeholder="Signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="border p-2 mr-2 rounded"
          />
          <button
            onClick={() => onSign(signature)}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractReviewDetails;
