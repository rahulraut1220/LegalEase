import React, { useEffect, useState } from "react";
import appointmentAPI from "../../services/appointmentAPI";
import { useNavigate } from "react-router-dom";

const AppointmentList = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await appointmentAPI.getMyAppointments();
        console.log("✅ Appointments Fetched:", res.data);
        setAppointments(res.data.appointments || []);
      } catch (err) {
        console.error("❌ Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  const filtered = appointments.filter((appt) => {
    if (filter === "paid") return appt.paymentStatus === "paid";
    if (filter === "unpaid") return appt.paymentStatus !== "paid";
    return true;
  });

  const handleNavigate = (id) => {
    navigate(`/appointment/${id}`);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 rounded border"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((appt) => (
            <div
              key={appt._id}
              onClick={() => handleNavigate(appt._id)}
              className="cursor-pointer p-4 bg-white rounded shadow hover:shadow-md transition"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleNavigate(appt._id);
                }
              }}
            >
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">
                  Appointment with:{" "}
                  {typeof appt.lawyer === "object"
                    ? appt.lawyer.name || appt.lawyer.email || appt.lawyer._id
                    : appt.lawyer}
                </h2>
                <span
                  className={`text-sm font-medium ${
                    appt.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {appt.paymentStatus}
                </span>
              </div>
              <p className="text-gray-600 mt-1">
                {new Date(appt.appointmentTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
