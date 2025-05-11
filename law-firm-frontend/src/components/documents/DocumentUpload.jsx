import React, { useState } from "react";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";

const DocumentUpload = ({
  onUpload,
  caseId,
  allowedTypes = [".pdf", ".doc", ".docx", ".jpg", ".png"],
}) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("documents", file);
      });

      if (caseId) {
        formData.append("caseId", caseId);
      }

      if (tags.trim()) {
        formData.append("tags", tags);
      }

      // Simulating upload - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onUpload(
        files.map((file) => ({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          fileType: file.name.split(".").pop(),
          uploadedAt: new Date().toISOString(),
          url: URL.createObjectURL(file),
          caseId,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }))
      );

      setFiles([]);
      setTags("");
    } catch (error) {
      console.error("Error uploading documents:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Upload Documents
      </h2>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-3" />
        <p className="text-gray-600 mb-2">
          Drag and drop files here, or{" "}
          <label className="text-blue-600 cursor-pointer hover:text-blue-700">
            browse
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept={allowedTypes.join(",")}
            />
          </label>
        </p>
        <p className="text-xs text-gray-500">
          Supported file types: {allowedTypes.join(", ")}
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium text-gray-700 mb-2">
            Selected Files ({files.length})
          </h3>
          <ul className="max-h-40 overflow-y-auto">
            {files.map((file, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 py-1 border-b border-gray-100 last:border-0"
              >
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="contract, agreement, confidential"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || uploading}
          className={`px-4 py-2 rounded-md ${
            files.length === 0
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } flex items-center`}
        >
          {uploading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            "Upload Documents"
          )}
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;
