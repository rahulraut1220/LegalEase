import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyCases,
  assignToCase,
  closeCaseById,
} from "../../redux/features/caseSlice";

const MyCases = () => {
  const dispatch = useDispatch();
  const { cases, loading } = useSelector((state) => state.case);
  const { user } = useSelector((state) => state.auth); // logged-in user

  useEffect(() => {
    dispatch(fetchMyCases());
  }, [dispatch]);

  const handleAssign = (id) => dispatch(assignToCase(id));
  const handleClose = (id) => dispatch(closeCaseById(id));

  // Filter cases based on user role
  const filteredCases = cases?.cases?.filter((c) => {
    if (user?.role === "client") return c.client?._id === user._id;
    if (user.role === "lawyer") {
      return cases.cases.filter(
        (c) => c.assignedLawyer === null || c.assignedLawyer === user._id
      );
    }
    return false;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Cases</h1>

      {loading ? (
        <p>Loading...</p>
      ) : filteredCases?.length > 0 ? (
        filteredCases.map((c) => (
          <div key={c._id} className="border p-4 rounded mb-4">
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="text-gray-600 mb-2">{c.description}</p>
            <h2 className="text-xl font-semibold">{c._id}</h2>

            <div className="text-sm text-gray-500 mb-2">
              <p>
                <strong>Status:</strong> {c.status}
              </p>
              <p>
                <strong>Client:</strong> {c.client?.name} ({c.client?.email})
              </p>
              {c.caseNumber && (
                <p>
                  <strong>Case Number:</strong> {c.caseNumber}
                </p>
              )}
              <p>
                <strong>Created:</strong>{" "}
                {new Date(c.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2 mt-2">
              {user?.role === "lawyer" && c?.assignedLawyer !== user._id && (
                <button
                  onClick={() => handleAssign(c._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Assign
                </button>
              )}

              <button
                onClick={() => handleClose(c._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No cases found.</p>
      )}
    </div>
  );
};

export default MyCases;
