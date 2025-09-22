import React, { useEffect, useState } from "react";
import { getPendingContracts } from "../../services/contractAPI";
import PendingContractCard from "../../components/lawyerContracts/PendingContractCard";

const PendingContracts = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPendingContracts();
        console.log(res.data);
        setContracts(res.data); // ✅ updated line
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Contracts</h2>
      {contracts.length === 0 ? (
        <p>No pending contracts.</p>
      ) : (
        <div className="grid gap-4">
          {contracts.map((c) => (
            <PendingContractCard key={c._id} contract={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingContracts;
