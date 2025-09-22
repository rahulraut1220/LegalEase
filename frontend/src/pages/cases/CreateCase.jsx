import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewCase } from "../../redux/features/caseSlice";

const CreateCase = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ title: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewCase(formData));
    setFormData({ title: "", description: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create New Case</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Case Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border p-2 rounded"
          rows="5"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCase;
