import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLawyers } from "../redux/features/userSlice";

const Lawyers = () => {
  const dispatch = useDispatch();
  const lawyers = useSelector((state) => state.user?.lawyers || []);

  useEffect(() => {
    dispatch(fetchLawyers());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Lawyers</h2>
      {lawyers.length === 0 ? (
        <p>No lawyers found.</p>
      ) : (
        lawyers.map((lawyer) => (
          <div key={lawyer._id} className="border p-3 rounded mb-3 shadow">
            <p>
              <strong>Name:</strong> {lawyer.name}
            </p>
            <p>
              <strong>Email:</strong> {lawyer.email}
            </p>
            {lawyer.specialization && (
              <p>
                <strong>Specialization:</strong> {lawyer.specialization}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Lawyers;
