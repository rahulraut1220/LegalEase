import React, { useEffect, useState } from "react";
import {
  getSignedContracts,
  downloadContract,
} from "../../services/contractAPI";

const SignedContracts = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSignedContracts();
      setContracts(res.data.data);
    };
    fetchData();
  }, []);

  const handleDownload = async (id, title) => {
    const res = await downloadContract(id);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.pdf`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Signed Contracts</h2>
      {contracts.length === 0 ? (
        <p>No signed contracts.</p>
      ) : (
        <div className="grid gap-4">
          {contracts.map((c) => (
            <div key={c._id} className="p-4 border rounded bg-white shadow">
              <h3 className="text-lg font-bold">{c.title}</h3>
              <p>Client: {c.client?.name}</p>
              <button
                onClick={() => handleDownload(c._id, c.title)}
                className="mt-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SignedContracts;
