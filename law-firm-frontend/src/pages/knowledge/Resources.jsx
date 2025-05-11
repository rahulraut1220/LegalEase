import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ResourceCard from "../../components/knowledge/ResourceCard";
import Input from "../../components/common/Input";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Simulate fetching resources from API
  useEffect(() => {
    // Mock data
    const mockResources = [
      {
        id: 1,
        title: "Understanding Contract Law",
        description:
          "A comprehensive guide to contract law principles and applications in business contexts.",
        category: "Contract Law",
        type: "guide",
        lastUpdated: "2024-02-15",
      },
      {
        id: 2,
        title: "Intellectual Property Rights",
        description:
          "Detailed overview of patents, trademarks, copyrights, and trade secrets protection.",
        category: "Intellectual Property",
        type: "whitepaper",
        lastUpdated: "2024-03-10",
      },
      {
        id: 3,
        title: "Employment Law Compliance Checklist",
        description:
          "Essential checklist for businesses to ensure compliance with current employment regulations.",
        category: "Employment Law",
        type: "checklist",
        lastUpdated: "2024-01-22",
      },
      {
        id: 4,
        title: "Real Estate Transaction Guide",
        description:
          "Step-by-step guide to navigating commercial and residential real estate transactions.",
        category: "Real Estate",
        type: "guide",
        lastUpdated: "2024-02-28",
      },
      {
        id: 5,
        title: "Litigation Process Explained",
        description:
          "Overview of civil litigation procedures from filing to resolution.",
        category: "Litigation",
        type: "guide",
        lastUpdated: "2024-03-05",
      },
      {
        id: 6,
        title: "Business Formation Documents",
        description:
          "Templates and explanations for LLC, corporation, and partnership formation documents.",
        category: "Business Law",
        type: "templates",
        lastUpdated: "2024-01-30",
      },
    ];

    // Set resources
    setResources(mockResources);
    setFilteredResources(mockResources);

    // Extract unique categories
    const uniqueCategories = [
      ...new Set(mockResources.map((resource) => resource.category)),
    ];
    setCategories(uniqueCategories);
  }, []);

  // Filter resources based on search query and selected category
  useEffect(() => {
    let filtered = resources;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (resource) => resource.category === selectedCategory
      );
    }

    setFilteredResources(filtered);
  }, [searchQuery, selectedCategory, resources]);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Legal Knowledge Base
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="w-full md:w-2/3">
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Category Selector */}
          <div className="w-full md:w-1/3">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display resources or No Results message */}
        {filteredResources.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No resources found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or browse all resources.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}

        {/* Custom Resource Request Section */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Need Specialized Resources?
          </h2>
          <p className="text-blue-700 mb-4">
            Our team can prepare custom legal resources tailored to your
            specific industry or situation.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Request Custom Resources
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Resources;
