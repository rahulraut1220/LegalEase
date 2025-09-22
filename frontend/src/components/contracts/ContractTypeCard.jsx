import React from "react";
import { useNavigate } from "react-router-dom";

const ContractTypeCard = ({ contractType }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/contracts/create/${contractType._id}`);
  };

  return (
    <div className="border p-4 rounded shadow-md hover:shadow-lg cursor-pointer">
      <h2 className="text-xl font-bold">{contractType.name}</h2>
      <p className="text-sm text-gray-600">{contractType.description}</p>
      <button
        onClick={handleSelect}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
      >
        Create Contract
      </button>
    </div>
  );
};

export default ContractTypeCard;
