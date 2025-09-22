import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadDocument } from "../../redux/features/documentSlice";

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      dispatch(uploadDocument(file));
      setFile(null);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-2">Upload PDF for Analysis</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;
