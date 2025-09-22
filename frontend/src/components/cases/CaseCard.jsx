// src/components/cases/CaseCard.jsx
import { Link } from "react-router-dom";

const CaseCard = ({ caseData }) => (
  <div className="border rounded-xl shadow-md p-4">
    <h2 className="text-xl font-semibold">{caseData.title}</h2>
    <p>{caseData.description}</p>
    <Link to={`/cases/${caseData._id}`} className="text-blue-600 mt-2 block">
      View Details
    </Link>
  </div>
);

export default CaseCard;
