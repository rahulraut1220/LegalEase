// src/components/contracts/ContractList.jsx
import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { formatDate } from "../../utils/ContractUtils";

const ContractList = ({ contracts, loading, error, emptyMessage }) => {
  if (loading) {
    return (
      <div className="flex justify-center my-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        Error loading contracts: {error}
      </div>
    );
  }

  if (!contracts || contracts.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg bg-gray-50">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No contracts</h3>
        <p className="mt-1 text-sm text-gray-500">
          {emptyMessage || "You don't have any contracts yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Contract Type</th>
            <th className="py-3 px-6 text-left">Counterparty</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-center">Date</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {contracts.map((contract) => (
            <tr
              key={contract._id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="py-3 px-6 text-left">
                {contract.contractType?.name || "Unknown Type"}
              </td>
              <td className="py-3 px-6 text-left">
                {/* Show client name if user is lawyer, otherwise show lawyer name */}
                {contract.client?.name || contract.lawyer?.name || "Unknown"}
              </td>
              <td className="py-3 px-6 text-center">
                <StatusBadge status={contract.status} />
              </td>
              <td className="py-3 px-6 text-center">
                {formatDate(contract.createdAt)}
              </td>
              <td className="py-3 px-6 text-center">
                <Link
                  to={`/contracts/${contract._id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractList;
