import React, { useEffect, useState } from "react";
import { getMyContracts } from "../../services/contractAPI";
import ContractStatusCard from "./ContractStatusCard";

const ContractStatusList = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyContracts();
        // Check if your backend returns { success, data }
        if (res?.data?.data) {
          setContracts(res.data.data);
        } else if (Array.isArray(res?.data)) {
          setContracts(res.data);
        } else {
          setContracts([]);
        }
      } catch (err) {
        console.error("Failed to fetch contracts:", err);
        setContracts([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {contracts.length > 0 ? (
        contracts.map((c) =>
          c ? <ContractStatusCard key={c._id} contract={c} /> : null
        )
      ) : (
        <p>No contracts found.</p>
      )}
    </div>
  );
};

export default ContractStatusList;
