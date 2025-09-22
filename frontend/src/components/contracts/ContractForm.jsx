import React, { useState } from "react";
import { submitContract } from "../../services/contractAPI";

const ContractForm = ({ fields = [], contractTypeId, selectedLawyerId }) => {
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("=== DEBUG: handleSubmit START ===");
    console.log(
      "contractTypeId (prop):",
      contractTypeId,
      typeof contractTypeId
    );
    console.log(
      "selectedLawyerId (prop):",
      selectedLawyerId,
      typeof selectedLawyerId
    );
    console.log("formData state:", formData);
    console.log("fileData state:", fileData);

    if (!contractTypeId) {
      alert("Contract Type ID is missing — cannot submit.");
      return;
    }

    if (!selectedLawyerId) {
      alert("Please select a lawyer before submitting.");
      return;
    }

    const payload = new FormData();
    payload.append("contractTypeId", contractTypeId);
    payload.append("lawyerId", selectedLawyerId);

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(`contractData[${key}]`, value);
    });

    Object.entries(fileData).forEach(([key, file]) => {
      payload.append(`files[${key}]`, file);
    });

    // Debug log: view the FormData entries before sending
    console.log("=== DEBUG: FormData payload ===");
    for (let [key, value] of payload.entries()) {
      console.log(key, value);
    }

    try {
      const response = await submitContract(payload);
      console.log("=== DEBUG: Backend Response ===", response);
      alert("Contract submitted successfully for review.");
    } catch (err) {
      console.error("Error submitting contract:", err);
      alert("Failed to submit contract.");
    }
  };

  const renderField = (field) => {
    if (field.type === "textarea") {
      return (
        <textarea
          name={field.name}
          required
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      );
    }
    if (field.type === "select") {
      return (
        <select
          name={field.name}
          required
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="">Select</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }
    if (field.type === "file") {
      return (
        <input
          type="file"
          name={field.name}
          required
          onChange={handleFileChange}
          className="w-full border px-2 py-1 rounded"
        />
      );
    }
    return (
      <input
        type={field.type || "text"}
        name={field.name}
        required
        onChange={handleChange}
        className="w-full border px-2 py-1 rounded"
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.length === 0 ? (
        <p className="text-gray-500">No fields found for this contract type.</p>
      ) : (
        fields.map((field, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium">{field.label}</label>
            {renderField(field)}
          </div>
        ))
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit for Review
      </button>
    </form>
  );
};

export default ContractForm;
