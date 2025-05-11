import React from "react";
import { formatCurrency, formatDate } from "../../utils/formatters";

const PaymentCard = ({ payment, onViewDetails }) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {payment.reference || "Payment"}
          </h3>
          <p className="text-sm text-gray-600">{formatDate(payment.date)}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[payment.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600 text-sm">
            Invoice #{payment.invoiceNumber}
          </p>
          <p className="text-gray-600 text-sm">
            Case: {payment.caseTitle || "N/A"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(payment.amount)}
          </p>
          <p className="text-sm text-gray-600">{payment.method}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => onViewDetails(payment.id)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
