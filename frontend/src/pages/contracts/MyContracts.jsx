import React from "react";
import ContractStatusList from "../../components/contracts/ContractStatusList";

const MyContracts = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Contracts</h1>
      <ContractStatusList />
    </div>
  );
};

export default MyContracts;
