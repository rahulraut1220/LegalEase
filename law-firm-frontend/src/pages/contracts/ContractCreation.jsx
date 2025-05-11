// src/pages/contracts/ContractCreation.jsx
import React from "react";
import ContractForm from "../../components/contracts/ContractForm";
import DashboardLayout from "../../components/layout/DashboardLayout";

const ContractCreation = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create New Contract</h1>
          <p className="text-gray-600 mt-1">
            Fill out the form below to create a new legal contract
          </p>
        </div>

        <ContractForm />
      </div>
    </DashboardLayout>
  );
};

export default ContractCreation;
