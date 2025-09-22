import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "../../redux/features/documentSlice";

const DocumentHistory = () => {
  const dispatch = useDispatch();
  const { docs, loading } = useSelector((state) => state.document);

  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Upload History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : docs.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {docs.map((doc) => (
            <li key={doc._id} className="border p-3 rounded shadow-sm">
              <p>
                <strong>Name:</strong> {doc.filename}
              </p>
              <p>
                <strong>Result:</strong> {doc.analysisResult}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(doc.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentHistory;
