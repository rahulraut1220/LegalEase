// src/components/contracts/LawyerSelect.jsx
import React, { useEffect } from "react";
import useContracts from "../../hooks/useContracts";

const LawyerSelect = ({ value, onChange }) => {
  const { lawyers, loading, error, fetchLawyers } = useContracts();

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

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
        Error loading lawyers. Please try again.
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label
        htmlFor="lawyer"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select Lawyer
      </label>
      <select
        id="lawyer"
        name="lawyer"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      >
        <option value="">Select a lawyer</option>
        {lawyers.map((lawyer) => (
          <option key={lawyer._id} value={lawyer._id}>
            {lawyer.name}{" "}
            {lawyer.specialization ? `- ${lawyer.specialization}` : ""}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LawyerSelect;
