import React from "react";
import { Card } from "../common/Card";

const DocumentCard = ({ document, onView, onDelete }) => {
  if (!document) {
    return null;
  }

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return (
          <svg
            className="h-8 w-8 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "docx":
      case "doc":
        return (
          <svg
            className="h-8 w-8 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "jpg":
      case "jpeg":
      case "png":
        return (
          <svg
            className="h-8 w-8 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="h-8 w-8 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "Unknown size";
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = document.fileName
    ? document.fileName.split(".").pop().toLowerCase()
    : "unknown";

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-3">{getFileIcon(fileType)}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {document.fileName || "Untitled Document"}
          </h4>
          <p className="text-xs text-gray-500">
            {formatFileSize(document.fileSize)} • Uploaded on{" "}
            {formatDate(document.uploadedAt)}
          </p>
          {document.uploadedBy && (
            <p className="text-xs text-gray-500">
              By: {document.uploadedBy.name}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {onView && (
            <button
              onClick={() => onView(document)}
              className="text-blue-600 hover:text-blue-800"
            >
              View
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(document._id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DocumentCard;
