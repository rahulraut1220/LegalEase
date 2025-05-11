import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import DashboardLayout from "../../components/layout/DashboardLayout";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import AppointmentForm from "../../components/appointments/AppointmentForm";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import Modal from "../../components/common/Modal";
import {
  getAllAppointments,
  updateAppointmentStatus,
  createAppointment,
} from "../../services/appointments";

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState("upcoming"); // upcoming, past, all
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getAllAppointments();
      if (response.success) {
        setAppointments(response.data);
        setError(null);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const response = await updateAppointmentStatus(appointmentId, newStatus);
      if (response.success) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId ? response.data : appointment
          )
        );
        setError(null);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to update appointment status");
    }
  };

  const handleCreateAppointment = async (formData) => {
    try {
      const response = await createAppointment(formData);
      if (response.success) {
        setAppointments((prevAppointments) => [
          response.data,
          ...prevAppointments,
        ]);
        setShowCreateModal(false);
        setError(null);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("Failed to create appointment");
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (filter === "upcoming") {
      return appointmentDate >= today && appointment.status !== "cancelled";
    } else if (filter === "past") {
      return appointmentDate < today || appointment.status === "completed";
    }
    return true;
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
          {user?.role === "client" && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Schedule Appointment
            </Button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex space-x-2 mb-4 sm:mb-0">
              <button
                onClick={() => setFilter("upcoming")}
                className={`px-4 py-2 rounded-md ${
                  filter === "upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter("past")}
                className={`px-4 py-2 rounded-md ${
                  filter === "past"
                    ? "bg-gray-300 text-gray-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Past
              </button>
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md ${
                  filter === "all"
                    ? "bg-gray-300 text-gray-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
            </div>
          </div>

          {filteredAppointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No appointments found.{" "}
                {user?.role === "client" &&
                  "Schedule a new appointment to get started."}
              </p>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Schedule New Appointment"
      >
        <AppointmentForm onSubmit={handleCreateAppointment} />
      </Modal>
    </DashboardLayout>
  );
};

export default Appointments;
