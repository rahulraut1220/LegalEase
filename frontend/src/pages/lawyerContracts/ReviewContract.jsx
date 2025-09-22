import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getContractById,
  updateContract,
  signContract,
} from "../../services/contractAPI";
import ContractReviewDetails from "../../components/lawyerContracts/ContractReviewDetails";

const ReviewContract = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getContractById(id);
      setContract(res.data.data);
    };
    fetchData();
  }, [id]);

  const handleVerify = async () => {
    await updateContract(id, { status: "verified" });
    navigate("/lawyer/contracts/pending");
  };

  const handleReject = async (reason) => {
    await updateContract(id, {
      status: "rejected",
      rejectionReason: reason,
    });
    navigate("/lawyer/contracts/pending");
  };

  const handleSign = async (signature) => {
    await signContract(id, signature);
    navigate("/lawyer/contracts/signed");
  };

  if (!contract) return <p>Loading...</p>;

  return (
    <ContractReviewDetails
      contract={contract}
      onVerify={handleVerify}
      onReject={handleReject}
      onSign={handleSign}
    />
  );
};

export default ReviewContract;
