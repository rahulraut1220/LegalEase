import DocumentUpload from "../../components/documents/DocumentUpload";
import DocumentHistory from "../../components/documents/DocumentHistory";

const DocumentsPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <DocumentUpload />
      <DocumentHistory />
    </div>
  );
};

export default DocumentsPage;
