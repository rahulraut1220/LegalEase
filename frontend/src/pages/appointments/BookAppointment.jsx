import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLawyers } from "../../redux/features/contractsSlice";
import { bookAppointment } from "../../redux/features/appointmentSlice";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BookAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lawyerId: routeLawyerId, caseId } = useParams(); // get from route

  const contractState = useSelector((state) => state.contract || {});
  const lawyers = contractState.lawyers || [];
  const loading = contractState.loading;

  const [lawyerId, setLawyerId] = useState(routeLawyerId || "");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    dispatch(fetchLawyers());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lawyerId || !appointmentTime || !caseId) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const res = await dispatch(
        bookAppointment({ lawyerId, appointmentTime, notes, caseId })
      ).unwrap();

      if (res.sessionUrl) {
        window.location.href = res.sessionUrl;
      } else {
        toast.error("Stripe session not initiated.");
      }
    } catch (err) {
      toast.error("Failed to book appointment: " + err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Selected Lawyer</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={lawyerId}
            onChange={(e) => setLawyerId(e.target.value)}
            required
            disabled // ❌ prevent editing
          >
            <option value="">-- Select --</option>
            {lawyers.map((lawyer) => (
              <option key={lawyer._id} value={lawyer._id}>
                {lawyer.name} ({lawyer.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Appointment Time</label>
          <input
            type="datetime-local"
            className="w-full border rounded px-3 py-2"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Notes (Optional)</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Mention case details or specific questions..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          {loading ? "Processing..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
