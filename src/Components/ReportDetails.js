import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReportDetails = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const req = await fetch(`http://localhost:8080/api/v1/report/${id}`);
      const data = await req.json();
      if (data.status === "Success") {
        setReportData(data.data);
      } else {
        setReportData(null);
      }
    } catch (error) {
      console.error("Error fetching report:", error);
      setReportData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Report Details</h2>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">Loading report...</p>
        ) : reportData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(reportData).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-100 rounded-lg shadow-md">
                <span className="font-semibold text-gray-700">{key.replace(/_/g, " ")}:</span>
                <span className={`ml-2 font-bold ${value ? "text-green-600" : "text-red-500"}`}>
                  {value ? "✔ Yes" : "❌ No"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500">Report not found.</p>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;
