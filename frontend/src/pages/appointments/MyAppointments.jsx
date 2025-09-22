import React from "react";
import AppointmentList from "../../components/appointments/AppointmentList";

const MyAppointments = () => {
  const userId = "6866596a1461a96f6ae46fd9";

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">My Appointments</h1>
      <AppointmentList userId={userId} />
    </div>
  );
};

export default MyAppointments;
