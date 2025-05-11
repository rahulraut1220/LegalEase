import React, { useState } from "react";
import { uploadAndAnalyzeDocument } from "../../services/documentAnalysis";
import Button from "../common/Button";
import Spinner from "../common/Spinner";

const DocumentAnalysis = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a valid PDF file");
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await uploadAndAnalyzeDocument(file);
      if (result.success) {
        setAnalysis(result.data.analysis);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to analyze document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">
        Upload Document for Analysis
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select PDF File
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <Button type="submit" disabled={!file || loading} className="w-full">
          {loading ? <Spinner size="sm" /> : "Analyze Document"}
        </Button>
      </form>

      {/* Analysis Results */}
      {analysis && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
          <div className="prose max-w-none">
            {analysis.split("\n").map((paragraph, index) => {
              // Skip empty paragraphs
              if (!paragraph.trim()) return null;

              // Check if paragraph is a section header
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return (
                  <h4 key={index} className="text-lg font-semibold mt-4 mb-2">
                    {paragraph.replace(/\*\*/g, "")}
                  </h4>
                );
              }

              // Regular paragraph with bold text
              return (
                <p key={index} className="mb-4">
                  {paragraph
                    .split("**")
                    .map((part, i) =>
                      i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                    )}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentAnalysis;
