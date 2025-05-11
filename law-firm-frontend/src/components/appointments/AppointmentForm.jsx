import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAvailableLawyers } from "../../services/appointments";
import { getAllCases } from "../../services/cases";
import Button from "../common/Button";
import Spinner from "../common/Spinner";

const AppointmentForm = ({ onSubmit }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cases, setCases] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [selectedCase, setSelectedCase] = useState("");
  const [formData, setFormData] = useState({
    caseId: "",
    lawyerId: "",
    date: "",
    timeSlot: "",
    location: "",
    agenda: "",
    duration: 60,
    notes: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user's cases
        const casesResponse = await getAllCases();
        if (casesResponse.success) {
          setCases(casesResponse.data.cases);
        } else {
          setError(casesResponse.error);
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLawyers = async () => {
      if (selectedCase) {
        try {
          setLoading(true);
          const response = await getAvailableLawyers(selectedCase);
          if (response.success) {
            setLawyers(response.data);
            setError(null);
          } else {
            setError(response.error);
          }
        } catch (err) {
          setError("Failed to fetch lawyers");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLawyers();
  }, [selectedCase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Case</label>
        <select
          name="caseId"
          value={selectedCase}
          onChange={(e) => {
            setSelectedCase(e.target.value);
            handleChange(e);
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a case</option>
          {cases.map((case_) => (
            <option key={case_._id} value={case_._id}>
              {case_.title} (Case #{case_.caseNumber})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Lawyer
        </label>
        <select
          name="lawyerId"
          value={formData.lawyerId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          disabled={!selectedCase}
        >
          <option value="">Select a lawyer</option>
          {lawyers.map((lawyer) => (
            <option key={lawyer._id} value={lawyer._id}>
              {lawyer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Time Slot
        </label>
        <input
          type="time"
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Office Room 305 or Virtual Meeting"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Agenda
        </label>
        <textarea
          name="agenda"
          value={formData.agenda}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Duration (minutes)
        </label>
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
          <option value={90}>1.5 hours</option>
          <option value={120}>2 hours</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          onClick={() => onSubmit(null)}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Schedule Appointment
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
