import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appointmentAPI from "../../services/appointmentAPI";
import authAPI from "../../services/authAPI";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [clientDetails, setClientDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await appointmentAPI.getAppointmentById(id);
        console.log("✅ Appointment Detail Fetched:", res);
        setAppointment(res.appointment);

        // Now fetch client details using client ID
        const clientId = res.appointment?.client;
        if (clientId) {
          const clientRes = await authAPI.getUserDetailsById(clientId);
          console.log("✅ Client Details Fetched:", clientRes);
          setClientDetails(clientRes);
        }
      } catch (err) {
        console.error("❌ Failed to fetch details", err);
      }
    };

    fetchDetails();
  }, [id]);

  if (!appointment) return <p>Loading appointment details...</p>;

  const handleJoinCall = () => {
    navigate("/video-call");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>

      <p>
        <strong>Client:</strong> {clientDetails?.name || "Loading..."}
      </p>
      <p>
        <strong>Client Email:</strong> {clientDetails?.email || "Loading..."}
      </p>

      <p>
        <strong>Lawyer:</strong> {appointment.lawyer?.name}
      </p>
      <p>
        <strong>Lawyer Email:</strong> {appointment.lawyer?.email}
      </p>

      <p>
        <strong>Case Title:</strong> {appointment.case?.title}
      </p>
      <p>
        <strong>Case Description:</strong> {appointment.case?.description}
      </p>

      <p>
        <strong>Appointment Time:</strong>{" "}
        {new Date(appointment.appointmentTime).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {appointment.status}
      </p>
      <p>
        <strong>Mode:</strong> {appointment.mode}
      </p>

      {appointment.meetingLink && (
        <p>
          <strong>Meeting Link:</strong>{" "}
          <a
            href={appointment.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {appointment.meetingLink}
          </a>
        </p>
      )}

      <button
        onClick={handleJoinCall}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Join Video Call
      </button>
    </div>
  );
};

export default AppointmentDetails;
