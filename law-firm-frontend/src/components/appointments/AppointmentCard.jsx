import React from "react";
import { format } from "date-fns";
import Button from "../common/Button";

const AppointmentCard = ({ appointment, onStatusUpdate }) => {
  const {
    _id,
    case: case_,
    lawyer,
    date,
    timeSlot,
    location,
    agenda,
    duration,
    status,
    notes,
  } = appointment;

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return format(new Date().setHours(hours, minutes), "h:mm a");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusUpdate = (newStatus) => {
    onStatusUpdate(_id, newStatus);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {case_?.title || "General Consultation"}
          </h3>
          <p className="text-sm text-gray-600">
            Case #{case_?.caseNumber || "N/A"}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            status
          )}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Date</p>
          <p className="font-medium">
            {format(new Date(date), "MMMM d, yyyy")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Time</p>
          <p className="font-medium">{formatTime(timeSlot)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Duration</p>
          <p className="font-medium">{duration} minutes</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Location</p>
          <p className="font-medium">{location}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Lawyer</p>
        <p className="font-medium">{lawyer?.name || "Not assigned"}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">Agenda</p>
        <p className="font-medium">{agenda}</p>
      </div>

      {notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">Notes</p>
          <p className="font-medium">{notes}</p>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        {status === "scheduled" && (
          <>
            <Button
              onClick={() => handleStatusUpdate("confirmed")}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirm
            </Button>
            <Button
              onClick={() => handleStatusUpdate("cancelled")}
              className="bg-red-600 hover:bg-red-700"
            >
              Cancel
            </Button>
          </>
        )}
        {status === "confirmed" && (
          <Button
            onClick={() => handleStatusUpdate("completed")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Mark as Completed
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
