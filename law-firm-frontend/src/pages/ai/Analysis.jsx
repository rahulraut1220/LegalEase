import React, { useState } from "react";
import AnalysisResult from "../../components/ai/AnalysisResult";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const Analysis = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  const handleAnalysis = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setResults({
          summary:
            "Based on the provided information, we've identified several relevant legal precedents and potential strategies.",
          recommendations: [
            "Consider filing a motion for summary judgment based on Smith v. Jones (2021)",
            "Gather additional evidence to strengthen the contract violation claim",
            "Prepare expert witnesses to testify on industry standards",
          ],
          riskAssessment:
            "Medium risk level with 65% probability of favorable outcome",
          relevantCases: [
            { id: 1, title: "Smith v. Jones (2021)", relevance: "High" },
            {
              id: 2,
              title: "Wilson Corp v. Acme Inc (2019)",
              relevance: "Medium",
            },
          ],
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error performing analysis:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        AI Legal Analysis
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Analyze Your Case</h2>
        <p className="text-gray-600 mb-4">
          Our AI-powered legal analysis tool helps you identify relevant
          precedents, assess risks, and develop strategies for your case.
        </p>

        <div className="mb-4">
          <Input
            label="Describe your legal situation"
            type="textarea"
            rows={5}
            placeholder="Enter details about your case for analysis..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <Button
          onClick={handleAnalysis}
          loading={loading}
          className="w-full sm:w-auto"
        >
          Run Analysis
        </Button>
      </div>

      {results && <AnalysisResult results={results} />}

      {!results && !loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-800 mb-2">
            How Our AI Analysis Works
          </h3>
          <ul className="list-disc pl-5 text-blue-700 space-y-2">
            <li>
              Advanced natural language processing analyzes your case details
            </li>
            <li>
              Machine learning algorithms match against relevant precedents
            </li>
            <li>Risk assessment models evaluate potential outcomes</li>
            <li>Strategy recommendation engine suggests optimal approaches</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Analysis;
