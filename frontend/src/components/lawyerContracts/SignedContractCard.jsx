import React from "react";
import { FaDownload, FaFileSignature } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignedContractCard = ({ contract }) => {
  const navigate = useNavigate();

  const handleDownload = () => {
    if (contract?.signedFileUrl) {
      window.open(contract.signedFileUrl, "_blank");
    }
  };

  const handleViewDetails = () => {
    navigate(`/lawyer/signed-contracts/${contract._id}`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md flex justify-between items-center bg-green-50 hover:shadow-lg transition">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FaFileSignature className="text-green-600" />
          {contract.contractTypeName}
        </h3>
        <p className="text-gray-700">Client: {contract.clientName}</p>
        <p className="text-gray-500 text-sm">
          Signed on: {new Date(contract.signedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
        >
          <FaDownload /> Download
        </button>
        <button
          onClick={handleViewDetails}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default SignedContractCard;
