import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../common/Card";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

const CaseCard = ({ caseData, onAssign }) => {
  const { user } = useAuth();
  const statusColors = {
    open: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    closed: "bg-gray-100 text-gray-800",
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="h-full transition-shadow hover:shadow-lg">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {caseData.title}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            statusColors[caseData.status.toLowerCase()] || "bg-gray-100"
          }`}
        >
          {caseData.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3">Case #{caseData.caseNumber}</p>

      <div className="mb-3">
        <p className="text-sm text-gray-700 line-clamp-2">
          {caseData.description}
        </p>
      </div>

      <div className="border-t pt-3 mt-auto">
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-gray-500">Created:</span>
            <span className="ml-1 text-gray-700">
              {formatDate(caseData.createdAt)}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Updated:</span>
            <span className="ml-1 text-gray-700">
              {formatDate(caseData.updatedAt)}
            </span>
          </div>
        </div>
      </div>

      {caseData.assignedLawyer && (
        <div className="mt-3 flex items-center">
          <div className="flex-shrink-0">
            {caseData.assignedLawyer.avatar ? (
              <img
                className="h-8 w-8 rounded-full"
                src={caseData.assignedLawyer.avatar}
                alt={caseData.assignedLawyer.name}
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {caseData.assignedLawyer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            )}
          </div>
          <div className="ml-2">
            <p className="text-xs text-gray-500">Assigned to</p>
            <p className="text-sm font-medium text-gray-800">
              {caseData.assignedLawyer.name}
            </p>
          </div>
        </div>
      )}

      {user?.role === "lawyer" &&
        !caseData.assignedLawyer &&
        caseData.status === "Open" && (
          <div className="mt-4">
            <Button
              onClick={() => onAssign(caseData._id)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Assign to Me
            </Button>
          </div>
        )}

      <div className="mt-4">
        <Link
          to={`/cases/${caseData._id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
};

export default CaseCard;
