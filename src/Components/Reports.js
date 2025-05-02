import { useEffect, useState } from "react";
import Report from "../utils/Report";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  const onReportClickHandler=(path)=>{
    navigate(`${path}`)
  }
  const fetchData = async () => {
    try {
      const req = await fetch("http://127.0.0.1:8080/api/v1/report", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const data = await req.json();
      console.log(data);
      setReportData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Reports</h2>

      <div className="bg-white shadow-lg rounded-xl p-6">
        {loading ? (
          <p className="text-center text-gray-600 animate-pulse">Loading reports...</p>
        ) : (
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportData.length ? (
              reportData.map((el, idx) => (
                <div
                  
                  key={idx}
                  className="p-4 bg-gray-100 rounded-lg shadow-md transition-transform hover:scale-105"
                >
                  <Report idx={idx} onClick={onReportClickHandler} path={el}/>
                </div>
              ))
            ) : (
              <h1 className="text-center text-xl font-semibold text-gray-700 col-span-full">
                There are no reports
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
