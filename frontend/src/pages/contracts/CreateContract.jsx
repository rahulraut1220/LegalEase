import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getContractTypeById,
  fetchLawyersForContract,
} from "../../services/contractAPI";
import ContractForm from "../../components/contracts/ContractForm";

const CreateContract = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState("");

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await getContractTypeById(id);
        const contractType = res.data;

        if (contractType) {
          const updatedTemplate = {
            ...contractType,
            fields: [
              ...(contractType.requiredFields || []),
              ...(contractType.requiredDocuments || []),
            ],
          };
          setTemplate(updatedTemplate);
        }
      } catch (err) {
        console.error("Error fetching contract type:", err);
      }
    };

    fetchTemplate();
  }, [id]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetchLawyersForContract();
        setLawyers(res.data || []);
      } catch (err) {
        console.error("Error fetching lawyers:", err);
      }
    };

    fetchLawyers();
  }, []);

  if (!template) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Contract Header */}
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        {template.name}
      </h1>
      <p className="mb-3 text-gray-600">{template.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-sm text-gray-500">Template</p>
          <p className="font-semibold">{template.template}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border">
          <p className="text-sm text-gray-500">Validity Period</p>
          <p className="font-semibold">{template.validityPeriod} months</p>
        </div>
      </div>

      {/* Lawyer Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">
          Choose Lawyer
        </label>
        <select
          value={selectedLawyer}
          onChange={(e) => setSelectedLawyer(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full focus:ring-2 focus:ring-green-500"
        >
          <option value="">-- Select a Lawyer --</option>
          {lawyers.map((lawyer) => (
            <option key={lawyer._id} value={lawyer._id}>
              {lawyer.name} ({lawyer.specialization})
            </option>
          ))}
        </select>
      </div>

      {/* Contract Form */}
      <div className="border-t pt-4">
        <ContractForm
          fields={template?.fields || []}
          contractTypeId={template._id}
          selectedLawyerId={selectedLawyer}
        />
      </div>
    </div>
  );
};

export default CreateContract;
