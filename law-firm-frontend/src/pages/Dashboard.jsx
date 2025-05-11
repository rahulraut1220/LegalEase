import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/common/Card";
import useAuth from "../hooks/useAuth";
import useNotifications from "../hooks/useContractTypes";
import { getCaseById } from "../services/cases";
import { getAllAppointments } from "../services/appointments";
import { getAllPayments } from "../services/payments";

const Dashboard = () => {
  const { user } = useAuth();
  const { notifications } = useNotifications();

  const [stats, setStats] = useState({
    activeCases: 0,
    pendingAppointments: 0,
    unreadDocuments: 0,
    recentPayments: 0,
  });

  const [recentCases, setRecentCases] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch cases
        const casesResult = await Promise.all(
          [1, 2, 3].map((id) => getCaseById(id))
        );
        const validCases = casesResult
          .filter((result) => result.success)
          .map((result) => result.data);
        setRecentCases(validCases);

        // Fetch appointments
        const appointmentsResult = await getAllAppointments({
          limit: 5,
          sort: "date:asc",
        });
        if (appointmentsResult.success) {
          setUpcomingAppointments(appointmentsResult.data);
        }

        // Fetch payments
        const paymentsResult = await getAllPayments({
          limit: 5,
          sort: "date:desc",
        });

        // Update stats
        setStats({
          activeCases: validCases.filter((c) => c.status === "Active").length,
          pendingAppointments: appointmentsResult.success
            ? appointmentsResult.data.filter((a) => a.status === "Pending")
                .length
            : 0,
          unreadDocuments: notifications.filter(
            (n) => n.type === "document" && !n.read
          ).length,
          recentPayments: paymentsResult.success
            ? paymentsResult.data.length
            : 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [notifications]);

  // Mock data for statistics
  const statisticsData = [
    {
      name: "Cases Won",
      value: "92%",
      icon: "🏆",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Client Satisfaction",
      value: "4.8/5",
      icon: "⭐",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Response Time",
      value: "< 24h",
      icon: "⏱️",
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Years Experience",
      value: "15+",
      icon: "📚",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name || "User"}
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your legal practice and upcoming activities.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-blue-700">Active Cases</p>
              <h3 className="text-2xl font-bold text-blue-900">
                {loading ? "..." : stats.activeCases}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <Link to="/cases" className="text-sm text-blue-700 hover:underline">
              View all cases
            </Link>
          </div>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-green-700">
                Pending Appointments
              </p>
              <h3 className="text-2xl font-bold text-green-900">
                {loading ? "..." : stats.pendingAppointments}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <Link
              to="/appointments"
              className="text-sm text-green-700 hover:underline"
            >
              Manage appointments
            </Link>
          </div>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-amber-700">
                Unread Documents
              </p>
              <h3 className="text-2xl font-bold text-amber-900">
                {loading ? "..." : stats.unreadDocuments}
              </h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-amber-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <Link
              to="/documents"
              className="text-sm text-amber-700 hover:underline"
            >
              View documents
            </Link>
          </div>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-purple-700">
                Recent Payments
              </p>
              <h3 className="text-2xl font-bold text-purple-900">
                {loading ? "..." : stats.recentPayments}
              </h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-purple-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2">
            <Link
              to="/payments"
              className="text-sm text-purple-700 hover:underline"
            >
              View all payments
            </Link>
          </div>
        </Card>
      </div>

      {/* Performance Statistics */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Firm Performance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statisticsData.map((stat, index) => (
            <div key={index} className={`${stat.color} rounded-lg p-4`}>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{stat.icon}</span>
                <h3 className="font-medium">{stat.name}</h3>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Cases</h2>
            <Link to="/cases" className="text-sm text-blue-600 hover:underline">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 h-24 rounded-lg"></div>
              ))}
            </div>
          ) : recentCases.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-500">No recent cases found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentCases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  to={`/cases/${caseItem.id}`}
                  className="block bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {caseItem.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {caseItem.clientName}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        caseItem.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : caseItem.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {caseItem.status}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>Case #{caseItem.id}</span>
                    <span>
                      Updated{" "}
                      {new Date(caseItem.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Appointments */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Upcoming Appointments
            </h2>
            <Link
              to="/appointments"
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 h-24 rounded-lg"></div>
              ))}
            </div>
          ) : upcomingAppointments.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-500">No upcoming appointments found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-white rounded-lg shadow border border-gray-200 p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {appointment.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.date).toLocaleDateString()} at{" "}
                        {new Date(appointment.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {appointment.clientName}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Link
                      to={`/appointments/${appointment.id}`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      View details
                    </Link>
                    {appointment.status === "Pending" && (
                      <button className="text-xs text-green-600 hover:underline">
                        Confirm
                      </button>
                    )}
                    <button className="text-xs text-red-600 hover:underline">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/cases/new"
            className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="bg-blue-100 p-3 rounded-full inline-flex justify-center mb-2">
              <svg
                className="w-6 h-6 text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <p className="font-medium text-gray-800">New Case</p>
          </Link>

          <Link
            to="/appointments/schedule"
            className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="bg-green-100 p-3 rounded-full inline-flex justify-center mb-2">
              <svg
                className="w-6 h-6 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="font-medium text-gray-800">Schedule Appointment</p>
          </Link>

          <Link
            to="/clients/new"
            className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="bg-purple-100 p-3 rounded-full inline-flex justify-center mb-2">
              <svg
                className="w-6 h-6 text-purple-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <p className="font-medium text-gray-800">Add Client</p>
          </Link>

          <Link
            to="/documents/upload"
            className="bg-white rounded-lg shadow border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="bg-amber-100 p-3 rounded-full inline-flex justify-center mb-2">
              <svg
                className="w-6 h-6 text-amber-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
            <p className="font-medium text-gray-800">Upload Document</p>
          </Link>
        </div>
      </section>

      {/* Recent Activity/Notifications */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
          <Link
            to="/notifications"
            className="text-sm text-blue-600 hover:underline"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 h-16 rounded-lg"></div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-500">No recent activity.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow border border-gray-200 divide-y">
            {notifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="p-4 flex items-start">
                <div
                  className={`p-2 rounded-full mr-3 ${
                    notification.type === "document"
                      ? "bg-amber-100"
                      : notification.type === "appointment"
                      ? "bg-green-100"
                      : notification.type === "case"
                      ? "bg-blue-100"
                      : notification.type === "payment"
                      ? "bg-purple-100"
                      : "bg-gray-100"
                  }`}
                >
                  {notification.type === "document" && (
                    <svg
                      className="w-5 h-5 text-amber-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  )}
                  {notification.type === "appointment" && (
                    <svg
                      className="w-5 h-5 text-green-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  {notification.type === "case" && (
                    <svg
                      className="w-5 h-5 text-blue-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                      />
                    </svg>
                  )}
                  {notification.type === "payment" && (
                    <svg
                      className="w-5 h-5 text-purple-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleDateString()} at{" "}
                    {new Date(notification.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {!notification.read && (
                  <span className="bg-blue-500 h-2 w-2 rounded-full"></span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
