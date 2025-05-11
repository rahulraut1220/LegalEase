import React, { useState, useEffect } from "react";
import AppointmentForm from "./AppointmentForm";
import { getAllCases } from "../../services/cases";
import { getAllLawyers } from "../../services/lawyers";
import { createAppointment } from "../../services/appointments";

const AppointmentScheduler = () => {
  const [cases, setCases] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [casesResponse, lawyersResponse] = await Promise.all([
          getAllCases(),
          getAllLawyers(),
        ]);

        if (casesResponse.success) {
          setCases(casesResponse.data.cases);
        }

        if (lawyersResponse.success) {
          setLawyers(lawyersResponse.data.lawyers);
        }
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const response = await createAppointment(formData);
      if (response.success) {
        // Show success message or redirect
        alert("Appointment scheduled successfully!");
      } else {
        setError(response.error || "Failed to schedule appointment");
      }
    } catch (err) {
      setError("Failed to schedule appointment. Please try again later.");
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Schedule Appointment</h1>
      <AppointmentForm
        onSubmit={handleSubmit}
        cases={cases}
        lawyers={lawyers}
      />
    </div>
  );
};

export default AppointmentScheduler;
