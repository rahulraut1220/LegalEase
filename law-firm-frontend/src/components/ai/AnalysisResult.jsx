import React from "react";

const AnalysisResult = ({ analysisData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>

          <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5 mb-6"></div>

          <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">No analysis data available.</p>
      </div>
    );
  }

  const renderRiskScore = (score) => {
    let color;
    if (score < 30) color = "text-green-600";
    else if (score < 70) color = "text-yellow-600";
    else color = "text-red-600";

    return <span className={`text-lg font-bold ${color}`}>{score}%</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        AI Analysis Results
      </h2>

      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">Summary</h3>
        <p className="text-gray-600 mb-4">{analysisData.summary}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Risk Assessment</p>
            <div className="flex items-center">
              {renderRiskScore(analysisData.riskScore)}
              <span className="ml-2 text-gray-600 text-sm">Risk Score</span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Case Complexity</p>
            <p className="text-lg font-medium text-gray-800">
              {analysisData.complexity}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Estimated Timeline</p>
            <p className="text-lg font-medium text-gray-800">
              {analysisData.estimatedTimeframe}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">
          Key Legal Issues
        </h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {analysisData.keyIssues?.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-2">
          Relevant Precedents
        </h3>
        <div className="space-y-3">
          {analysisData.relevantPrecedents?.map((precedent, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
            >
              <p className="font-medium text-gray-800">{precedent.title}</p>
              <p className="text-sm text-gray-600">{precedent.description}</p>
              <p className="text-xs text-gray-500 mt-1">{precedent.citation}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium text-gray-700 mb-2">
          Recommended Actions
        </h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          {analysisData.recommendations?.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResult;
