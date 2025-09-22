import React, { useEffect, useState } from "react";
import { getAllContractTypes } from "../../services/contractAPI";
import ContractTypeCard from "../../components/contracts/ContractTypeCard";

const AvailableContracts = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await getAllContractTypes();
      setTypes(res.data);
    };
    fetchTypes();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {types.map((type) => (
        <ContractTypeCard key={type._id} contractType={type} />
      ))}
    </div>
  );
};

export default AvailableContracts;
