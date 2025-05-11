// src/components/contracts/StatusBadge.jsx
import React from "react";
import { getStatusColor, formatStatus } from "../../utils/ContractUtils";

const StatusBadge = ({ status }) => {
  const colorClass = getStatusColor(status);

  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {formatStatus(status)}
    </span>
  );
};

export default StatusBadge;
