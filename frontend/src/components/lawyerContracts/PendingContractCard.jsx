import React from "react";
import { useNavigate } from "react-router-dom";

const PendingContractCard = ({ contract }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-lg font-bold">{contract.title}</h3>
      <p>Client: {contract.client?.name}</p>
      <p>Email: {contract.client?.email}</p>
      <p>Status: {contract.status}</p>
      <button
        onClick={() => navigate(`/lawyer/contracts/review/${contract._id}`)}
        className="mt-3 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Review Contract
      </button>
    </div>
  );
};

export default PendingContractCard;
