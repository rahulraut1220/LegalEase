// src/components/contracts/ContractForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContractTypeSelect from "./ContractTypeSelect";
import LawyerSelect from "./LawyerSelect";
import useContractTypes from "../../hooks/useContractTypes";
import useContracts from "../../hooks/useContracts";

const ContractForm = () => {
  const navigate = useNavigate();
  const {
    contractTypes,
    loading: typesLoading,
    error: typesError,
    fetchContractType,
  } = useContractTypes();
  const { createContract, loading, error } = useContracts();

  const [selectedType, setSelectedType] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [formData, setFormData] = useState({});
  const [requiredFields, setRequiredFields] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  // Fetch contract type details when type is selected
  useEffect(() => {
    if (selectedType) {
      fetchContractType(selectedType).then((contractType) => {
        if (contractType && contractType.requiredFields) {
          setRequiredFields(contractType.requiredFields);

          // Initialize form data with empty values for required fields
          const initialData = {};
          contractType.requiredFields.forEach((field) => {
            initialData[field] = "";
          });
          setFormData(initialData);
        }
      });
    }
  }, [selectedType, fetchContractType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!selectedType) {
      errors.contractType = "Please select a contract type";
    }

    if (!selectedLawyer) {
      errors.lawyer = "Please select a lawyer";
    }

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        errors[field] = `${
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/([A-Z])/g, " $1")
        } is required`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await createContract({
          contractTypeId: selectedType,
          lawyerId: selectedLawyer,
          contractData: formData,
        });

        navigate("/contracts/client");
      } catch (error) {
        console.error("Error creating contract:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Create New Contract</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contract Type*
          </label>
          <ContractTypeSelect
            value={selectedType}
            onChange={(id) => {
              setSelectedType(id);
              setFormData({});
              setFormErrors({});
            }}
          />
          {formErrors.contractType && (
            <p className="text-red-600 text-xs mt-1">
              {formErrors.contractType}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Lawyer*
          </label>
          <LawyerSelect
            value={selectedLawyer}
            onChange={(id) => setSelectedLawyer(id)}
          />
          {formErrors.lawyer && (
            <p className="text-red-600 text-xs mt-1">{formErrors.lawyer}</p>
          )}
        </div>

        {typesLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {requiredFields.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-3 mt-6">
                  Contract Details
                </h3>

                {requiredFields.map((field) => (
                  <div className="mb-4" key={field}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/([A-Z])/g, " $1")}
                      *
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formErrors[field] && (
                      <p className="text-red-600 text-xs mt-1">
                        {formErrors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        )}

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || typesLoading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              loading || typesLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create Contract"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContractForm;
