import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import DocumentAnalysis from "../../components/document/DocumentAnalysis";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DocumentCard from "../../components/documents/DocumentCard";
import DocumentUpload from "../../components/documents/DocumentUpload";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import Modal from "../../components/common/Modal";
import { Card } from "../../components/common/Card";
import { getDocumentHistory } from "../../services/documentAnalysis";

const Documents = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [filter, setFilter] = useState("all"); // all, mine, shared
  const [error, setError] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const result = await getDocumentHistory();
        if (result.success) {
          setDocuments(result.data);
        } else {
          setError(result.error);
        }
      } catch (error) {
        setError("Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleUploadDocument = (newDocument) => {
    const mockNewDoc = {
      id: Date.now().toString(),
      ...newDocument,
      uploadDate: new Date().toISOString().split("T")[0],
      uploadedBy: "Current User",
    };
    setDocuments([mockNewDoc, ...documents]);
    setShowUploadModal(false);
  };

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const filteredDocuments = documents.filter((doc) => {
    if (filter === "all") return true;
    if (filter === "mine") return doc.uploadedBy === "Current User";
    if (filter === "shared") return doc.isShared;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewAnalysis = (doc) => {
    setSelectedDoc(doc);
  };

  const handleCloseAnalysis = () => {
    setSelectedDoc(null);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            AI Document Analysis
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <DocumentAnalysis />
          </Card>

          {/* Previously Analyzed Documents */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Analysis History</h2>
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <div
                    key={doc._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-blue-500">
                          <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 truncate">
                            {doc.originalName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(doc.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleViewAnalysis(doc)}
                        variant="outline"
                        size="sm"
                      >
                        View Analysis
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No analyzed documents available
              </p>
            )}
          </div>

          {/* Analysis Modal */}
          {selectedDoc && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedDoc.originalName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Analyzed on {formatDate(selectedDoc.createdAt)}
                      </p>
                    </div>
                    <Button
                      onClick={handleCloseAnalysis}
                      variant="outline"
                      size="sm"
                    >
                      Close
                    </Button>
                  </div>
                  <div className="prose max-w-none">
                    {selectedDoc.analysisResult
                      .split("\n")
                      .map((paragraph, index) => {
                        if (!paragraph.trim()) return null;

                        if (
                          paragraph.startsWith("**") &&
                          paragraph.endsWith("**")
                        ) {
                          return (
                            <h4
                              key={index}
                              className="text-lg font-semibold mt-4 mb-2"
                            >
                              {paragraph.replace(/\*\*/g, "")}
                            </h4>
                          );
                        }

                        return (
                          <p key={index} className="mb-4">
                            {paragraph
                              .split("**")
                              .map((part, i) =>
                                i % 2 === 0 ? (
                                  part
                                ) : (
                                  <strong key={i}>{part}</strong>
                                )
                              )}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Document"
      >
        <DocumentUpload onSubmit={handleUploadDocument} />
      </Modal>
    </DashboardLayout>
  );
};

export default Documents;
