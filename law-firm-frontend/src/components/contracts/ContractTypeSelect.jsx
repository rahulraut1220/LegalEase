// src/components/contracts/ContractTypeSelect.jsx
import React, { useEffect } from "react";
import useContractTypes from "../../hooks/useContractTypes";

const ContractTypeSelect = ({ value, onChange }) => {
  const { contractTypes, loading, error, fetchContractTypes } =
    useContractTypes();

  useEffect(() => {
    fetchContractTypes();
  }, [fetchContractTypes]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm mb-4">
        Error loading contract types. Please try again.
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label
        htmlFor="contractType"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Contract Type
      </label>
      <select
        id="contractType"
        name="contractType"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      >
        <option value="">Select contract type</option>
        {contractTypes.map((type) => (
          <option key={type._id} value={type._id}>
            {type.name} - {type.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContractTypeSelect;
