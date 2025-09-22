import React, { useState } from "react";
import axios from "axios";

const PdfQA = () => {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAsk = async () => {
    if (!file || !question) {
      setError("Please select a PDF and enter your question.");
      return;
    }

    setLoading(true);
    setAnswer("");
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("question", question);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/upload-and-ask/",
        formData
      );
      const data = res.data;

      if (data.answer?.content) {
        setAnswer(data.answer.content);
      } else {
        setAnswer(JSON.stringify(data.answer)); // fallback if structure is unexpected
      }
    } catch (err) {
      setError("Something went wrong: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Ask PDF with GenAI</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleAsk}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Processing..." : "Ask"}
      </button>

      {answer && (
        <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <strong>Answer:</strong> {answer}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}
    </div>
  );
};

export default PdfQA;
