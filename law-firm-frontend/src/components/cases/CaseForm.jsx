import React, { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { Card } from "../common/Card";

const CaseForm = ({ initialData = {}, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    caseType: "",
    priority: "medium",
    documents: [],
    ...initialData,
  });

  const [errors, setErrors] = useState({});

  // Update form when initialData changes (for editing cases)
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      documents: [...formData.documents, ...files],
    });
  };

  const removeDocument = (index) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments.splice(index, 1);
    setFormData({
      ...formData,
      documents: updatedDocuments,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Case title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Case description is required";
    }

    if (!formData.caseType) {
      newErrors.caseType = "Case type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  const caseTypes = [
    { value: "family", label: "Family Law" },
    { value: "criminal", label: "Criminal Defense" },
    { value: "corporate", label: "Corporate Law" },
    { value: "realestate", label: "Real Estate Law" },
    { value: "immigration", label: "Immigration Law" },
    { value: "personal-injury", label: "Personal Injury" },
    { value: "intellectual-property", label: "Intellectual Property" },
    { value: "tax", label: "Tax Law" },
    { value: "employment", label: "Employment Law" },
    { value: "other", label: "Other" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <div className="space-y-4">
          <Input
            label="Case Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            required
            placeholder="Enter a descriptive title for your case"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Case Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm py-2 px-4 border ${
                errors.description ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Provide details about your legal matter"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Case Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="caseType"
              value={formData.caseType}
              onChange={handleChange}
              className={`w-full rounded-md shadow-sm py-2 px-4 border ${
                errors.caseType ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            >
              <option value="">Select a case type</option>
              {caseTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.caseType && (
              <p className="mt-1 text-sm text-red-600">{errors.caseType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="flex space-x-4">
              {["low", "medium", "high"].map((priority) => (
                <label key={priority} className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleChange}
                  />
                  <span className="ml-2 capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Documents
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOCX, JPG, PNG up to 10MB each
                </p>
              </div>
            </div>
          </div>

          {formData.documents.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Attached Documents:
              </h4>
              <ul className="space-y-2">
                {formData.documents.map((doc, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span className="text-sm text-gray-600">
                      {doc.name || doc}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : initialData.id
                ? "Update Case"
                : "Create Case"}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default CaseForm;
