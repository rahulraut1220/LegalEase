import React, { useState, useEffect } from 'react';
import { getAllCases } from '../services/cases';
import { useNavigate } from 'react-router-dom';

const CasesList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCases = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllCases();
      console.log("Cases response:", response);
      
      if (response.success) {
        setCases(response.data.cases);
      } else {
        if (response.error.includes('Authentication required')) {
          // Redirect to login if authentication is required
          navigate('/login');
          return;
        }
        setError(response.error);
      }
    } catch (err) {
      console.error("Error in fetchCases:", err);
      setError('Failed to fetch cases. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleRetry = () => {
    fetchCases();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading cases...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button 
          onClick={handleRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">No cases found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Cases</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((caseItem) => (
          <div key={caseItem._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{caseItem.title}</h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Status:</span> {caseItem.status}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Description:</span> {caseItem.description}
            </p>
            {caseItem.assignedTo && (
              <p className="text-gray-600">
                <span className="font-medium">Assigned to:</span> {caseItem.assignedTo.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasesList; 