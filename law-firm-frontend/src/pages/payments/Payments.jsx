import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PaymentCard from "../../components/payments/PaymentCard";
import PaymentForm from "../../components/payments/PaymentForm";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import Modal from "../../components/common/Modal";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [filter, setFilter] = useState("all"); // all, pending, completed

  useEffect(() => {
    // Simulate fetching payments from API
    setTimeout(() => {
      // This would be replaced with your actual API call
      const mockPayments = [
        {
          id: "1",
          amount: 1500.0,
          currency: "USD",
          status: "completed",
          date: "2025-03-10",
          dueDate: "2025-03-05",
          method: "Credit Card",
          description: "Initial consultation fee",
          caseId: "1",
          caseName: "Smith vs. Johnson",
          client: "John Smith",
        },
        {
          id: "2",
          amount: 3200.0,
          currency: "USD",
          status: "pending",
          date: null,
          dueDate: "2025-04-15",
          method: null,
          description: "Case preparation - March 2025",
          caseId: "1",
          caseName: "Smith vs. Johnson",
          client: "John Smith",
        },
        {
          id: "3",
          amount: 2500.0,
          currency: "USD",
          status: "completed",
          date: "2025-02-20",
          dueDate: "2025-02-28",
          method: "Bank Transfer",
          description: "Estate planning services",
          caseId: "2",
          caseName: "Estate Planning - Williams Family",
          client: "Sarah Williams",
        },
        {
          id: "4",
          amount: 1800.0,
          currency: "USD",
          status: "completed",
          date: "2025-03-01",
          dueDate: "2025-03-01",
          method: "Credit Card",
          description: "Settlement finalization",
          caseId: "3",
          caseName: "Green Divorce Settlement",
          client: "Robert Green",
        },
      ];
      setPayments(mockPayments);
      setLoading(false);
    }, 1000);
  }, []);

  const handleMakePayment = (paymentDetails) => {
    // This would be replaced with your actual API call
    const updatedPayments = payments.map((payment) => {
      if (payment.id === paymentDetails.paymentId) {
        return {
          ...payment,
          status: "completed",
          date: new Date().toISOString().split("T")[0],
          method: paymentDetails.method,
        };
      }
      return payment;
    });
    setPayments(updatedPayments);
    setShowPaymentModal(false);
  };

  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true;
    return payment.status === filter;
  });

  const getTotalPending = () => {
    return payments
      .filter((payment) => payment.status === "pending")
      .reduce((total, payment) => total + payment.amount, 0)
      .toFixed(2);
  };

  const getTotalPaid = () => {
    return payments
      .filter((payment) => payment.status === "completed")
      .reduce((total, payment) => total + payment.amount, 0)
      .toFixed(2);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Payments</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Pending Payments
            </h2>
            <p className="text-3xl font-bold text-red-600">
              ${getTotalPending()}
            </p>
            <p className="text-gray-500 mt-1">Due within 30 days</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Total Paid
            </h2>
            <p className="text-3xl font-bold text-green-600">
              ${getTotalPaid()}
            </p>
            <p className="text-gray-500 mt-1">All time</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="flex space-x-2 mb-4 sm:mb-0">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-md ${
                  filter === "all"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All Payments
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-md ${
                  filter === "pending"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-md ${
                  filter === "completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : filteredPayments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Due Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Case
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${payment.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {payment.status.charAt(0).toUpperCase() +
                            payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {payment.caseName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {payment.client}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {payment.status === "pending" ? (
                          <Button
                            onClick={() => setShowPaymentModal(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Pay Now
                          </Button>
                        ) : (
                          <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                            Receipt
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No payments found.</p>
              {filter !== "all" && (
                <p className="text-gray-500 mt-2">
                  Try changing your filter to see all payments.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Make Payment"
      >
        <PaymentForm
          onSubmit={handleMakePayment}
          pendingPayments={payments.filter((p) => p.status === "pending")}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Payments;
