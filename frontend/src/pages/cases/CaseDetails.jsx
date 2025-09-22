import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCaseById, updateCaseTimeline } from "../../services/caseAPI";
import authAPI from "../../services/authAPI";
import { useSelector } from "react-redux";

const CaseDetails = () => {
  const { id } = useParams(); // case ID
  const [caseData, setCaseData] = useState(null);
  const [lawyerDetails, setLawyerDetails] = useState(null);
  const [timelineUpdate, setTimelineUpdate] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const res = await getCaseById(id);
        const caseObj = res.data.case;
        console.log("✅ Case Data Fetched:", caseObj);
        setCaseData(caseObj);

        const clientId = caseObj?.client?._id;
        const lawyerId = caseObj?.assignedLawyer;

        if (lawyerId) {
          const lawyerRes = await authAPI.getUserDetailsById(lawyerId);
          console.log("✅ Lawyer Details:", lawyerRes);
          setLawyerDetails(lawyerRes);
        }

        if (clientId) {
          const userRes = await authAPI.getUserDetailsById(clientId);
          console.log("✅ Client/User Details:", userRes);
          setUserDetails(userRes);
        }
      } catch (error) {
        console.error("❌ Error fetching case details:", error);
      }
    };

    fetchCaseDetails();
  }, [id]);

  const handleTimelineUpdate = async () => {
    try {
      const res = await updateCaseTimeline(id, timelineUpdate);
      setCaseData(res.data.updatedCase);
      setTimelineUpdate("");
    } catch (error) {
      console.error("Error updating timeline:", error);
    }
  };

  if (!caseData || !userDetails) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Case Details</h1>
      <p>
        <strong>Title:</strong> {caseData.title}
      </p>
      <p>
        <strong>Description:</strong> {caseData.description}
      </p>
      <p>
        <strong>Status:</strong> {caseData.status}
      </p>
      <p>
        <strong>User:</strong> {userDetails.name}
      </p>

      {lawyerDetails && (
        <p>
          <strong>Assigned Lawyer:</strong> {lawyerDetails.name}
        </p>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">Timeline</h2>
      <ul className="list-disc pl-5">
        {caseData.timeline.map((event, index) => (
          <li key={index}>
            <p>
              <strong>Status:</strong> {event.status}
            </p>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(event.updatedAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      {user.role === "lawyer" && user._id === caseData.assignedLawyer && (
        <div className="mt-4">
          <textarea
            value={timelineUpdate}
            onChange={(e) => setTimelineUpdate(e.target.value)}
            placeholder="Add timeline update..."
            className="w-full border border-gray-300 p-2 rounded mb-2"
          />
          <button
            onClick={handleTimelineUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Timeline
          </button>
        </div>
      )}

      <div className="mt-6 flex gap-4">
        {user.role !== "lawyer" && (
          <a
            href={`/book-appointment/${caseData.assignedLawyer}/${caseData._id}`}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            📅 Book Appointment
          </a>
        )}

        <a
          href="/appointments"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          📁 Go to Appointments
        </a>
      </div>
    </div>
  );
};

export default CaseDetails;
