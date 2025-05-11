// src/pages/contracts/ClientContracts.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ContractList from "../../components/contracts/ContractList";
import useContracts from "../../hooks/useContracts";
import DashboardLayout from "../../components/layout/DashboardLayout";

const ClientContracts = () => {
  const { contracts, loading, error, fetchClientContracts } = useContracts();

  useEffect(() => {
    fetchClientContracts();
  }, [fetchClientContracts]);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Contracts</h1>
          <Link
            to="/contracts/create"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New Contract
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <ContractList
            contracts={contracts}
            loading={loading}
            error={error}
            emptyMessage="You haven't created any contracts yet. Click 'Create New Contract' to get started."
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientContracts;
