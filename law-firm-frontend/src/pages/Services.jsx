// pages/Services.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card } from "../components/common/Card";

const Services = () => {
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // Mock services data
  const mockServices = [
    {
      id: 1,
      title: "Legal Consultation",
      description:
        "Initial legal consultation to assess your case and provide guidance on the best course of action.",
      icon: "⚖️",
      category: "Consultation",
      rate: "$150/hour",
      duration: "1 hour",
      popularity: "High",
    },
    {
      id: 2,
      title: "Contract Review",
      description:
        "Comprehensive review of contracts to identify potential issues and suggest amendments.",
      icon: "📝",
      category: "Document Review",
      rate: "$200/hour",
      duration: "Varies",
      popularity: "High",
    },
    {
      id: 3,
      title: "Court Representation",
      description:
        "Professional representation in court proceedings, including preparation and execution of legal strategy.",
      icon: "👨‍⚖️",
      category: "Litigation",
      rate: "$300/hour",
      duration: "Varies",
      popularity: "Medium",
    },
    {
      id: 4,
      title: "Mediation Services",
      description:
        "Facilitation of mediation to help parties reach a mutually beneficial agreement outside of court.",
      icon: "🤝",
      category: "Alternative Dispute Resolution",
      rate: "$250/hour",
      duration: "3-4 hours",
      popularity: "Medium",
    },
    {
      id: 5,
      title: "Legal Document Drafting",
      description:
        "Drafting of various legal documents including wills, trusts, and business agreements.",
      icon: "📄",
      category: "Document Preparation",
      rate: "$225/hour",
      duration: "Varies",
      popularity: "High",
    },
    {
      id: 6,
      title: "Estate Planning",
      description:
        "Comprehensive estate planning services including wills, trusts, and power of attorney.",
      icon: "🏡",
      category: "Planning",
      rate: "$275/hour",
      duration: "2-3 hours",
      popularity: "Medium",
    },
    {
      id: 7,
      title: "Business Formation",
      description:
        "Assistance with business entity formation, including corporations, LLCs, and partnerships.",
      icon: "🏢",
      category: "Business Law",
      rate: "$350 flat fee",
      duration: "Varies",
      popularity: "Medium",
    },
    {
      id: 8,
      title: "Trademark Registration",
      description:
        "Assistance with trademark search, application, and registration process.",
      icon: "™️",
      category: "Intellectual Property",
      rate: "$500 flat fee",
      duration: "Varies",
      popularity: "Low",
    },
    {
      id: 9,
      title: "Divorce Proceedings",
      description:
        "Legal assistance through divorce proceedings, including asset division and custody arrangements.",
      icon: "💔",
      category: "Family Law",
      rate: "$275/hour",
      duration: "Varies",
      popularity: "High",
    },
    {
      id: 10,
      title: "Real Estate Closings",
      description:
        "Legal representation during real estate transactions to ensure all documentation is properly executed.",
      icon: "🏠",
      category: "Real Estate",
      rate: "$1,200 flat fee",
      duration: "1-2 weeks",
      popularity: "Medium",
    },
    {
      id: 11,
      title: "Immigration Assistance",
      description:
        "Legal guidance throughout the immigration process, including visa applications and citizenship.",
      icon: "🌎",
      category: "Immigration",
      rate: "$225/hour",
      duration: "Varies",
      popularity: "High",
    },
    {
      id: 12,
      title: "Criminal Defense",
      description:
        "Defense representation for individuals facing criminal charges, from misdemeanors to felonies.",
      icon: "⚔️",
      category: "Criminal Law",
      rate: "$350/hour",
      duration: "Varies",
      popularity: "Medium",
    },
  ];

  // Get unique categories for filter
  const categories = [
    "All",
    ...new Set(mockServices.map((service) => service.category)),
  ];

  // Filter services by category
  const filteredServices =
    activeCategory === "All"
      ? mockServices
      : mockServices.filter((service) => service.category === activeCategory);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Our Legal Services
          </h1>
          <p className="text-gray-600 mt-2">
            Explore our comprehensive range of legal services designed to meet
            your needs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 h-64 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">No services found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="h-full flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-100 p-3 rounded-full text-2xl">
                      {service.icon}
                    </div>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="mt-auto">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Rate: {service.rate}</span>
                      <span>Duration: {service.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          service.popularity === "High"
                            ? "bg-green-100 text-green-800"
                            : service.popularity === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {service.popularity} Demand
                      </span>
                      <Link
                        to={`/services/${service.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                  <Link
                    to="/appointments/schedule"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium flex justify-center items-center transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                    Schedule Consultation
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Need a Custom Legal Solution?
            </h2>
            <p className="text-gray-600 mb-6">
              We understand that legal matters can be complex and unique to your
              situation. If you don't see a service that fits your needs,
              contact us for a personalized consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded font-medium transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/appointments/schedule"
                className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 py-2 px-6 rounded font-medium transition-colors"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Services;
