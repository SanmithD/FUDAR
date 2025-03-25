import axios from "axios";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router-dom";
import UpdateSalary from "./UpdateSalary";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function DriverDetails() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [salary, setSalary] = useState([]);
  const [error, setError] = useState(null);
  const [refreshChart, setRefreshChart] = useState(false);
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [role, setRole] = useState("staff");
  const [isPromoting, setIsPromoting] = useState(false);
  const [promotionError, setPromotionError] = useState(null);
  const [promotionSuccess, setPromotionSuccess] = useState(false);

  const handleSalaryUpdate = () => setRefreshChart((prev) => !prev);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(
          `https://fudar-dqqd.onrender.com/api/driver/getInfoById/${id}`
        );
        console.log(response.data.details)
        if (response.data.success) {
          setDriver(response.data.details);
          setSalary(response.data.salary || []);
        } else {
          setError("Failed to fetch driver details");
        }
      } catch (error) {
        setError("Failed to fetch driver details");
        console.error(error);
      }
    };

    fetchDriver();
  }, [id, refreshChart]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []); 

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Salary History" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Amount (₹)" } },
      x: { title: { display: true, text: "Month" } },
    },
  };

  const handlePromote = async (userId) => {
    setIsPromoting(true);
    setPromotionError(null);
    setPromotionSuccess(false);
  
    try {
      const response = await axios.put(
        `https://fudar-dqqd.onrender.com/api/user/update/${userId}`,
        { role }
      );
      if (response.data.success) {
        setPromotionSuccess(true);
        // await fetchDriver();
      } else {
        throw new Error(response.data.message || "Failed to update role");
      }
    } catch (error) {
      setPromotionError(
        error.response?.data?.message || "Failed to update role. Please try again."
      );
      console.error("Promotion error:", error);
    } finally {
      setIsPromoting(false);
    }
  };

  const handleDelete = async() =>{
    try {
      await axios.delete(`https://fudar-dqqd.onrender.com/api/driver/deleteDriverById/${id}`);
      navigate('/allDrivers')
    } catch (error) {
      console.log(error);
    }
  }

  const data = {
    labels: salary.map((item) => item.month),
    datasets: [
      {
        label: "Salary Amount",
        data: salary.map((item) => item.amount),
        borderColor: "black",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        fill: true, // Works now with Filler plugin
        tension: 0.4,
      },
    ],
  };

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-red-500">
        {error}
      </div>
    );
  if (!driver)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-white absolute md:top-[50px] md:w-[70%] md:left-[260px] md:p-[20px] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-xl shadow-lg  ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Driver Details</h2>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              Back
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              Delete
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="md:w-1/4 text-center md:text-left mb-6 md:mb-0">
              <a
                href={driver.driverImage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={driver.driverImage}
                  alt={driver.driverName}
                  className="w-32 h-32 rounded-full mx-auto md:mx-0 object-cover"
                />
              </a>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold text-black mb-2">
                {driver.driverName}
              </h3>
              <p className="text-gray-600 mb-4">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    driver.status === "assigned"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {driver.status}
                </span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Primary Number</p>
                  <p className="text-gray-800">
                    {driver.driverNumber[0]?.primaryNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Secondary Number</p>
                  <p className="text-gray-800">
                    {driver.driverNumber[0]?.secondaryNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Bank Number</p>
                  <p className="text-gray-800">
                    {driver.driverBankNumber || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">IFSC</p>
                  <p className="text-gray-800">{driver.driverIFSC || "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Bank Address</p>
                  <p className="text-gray-800">
                    {driver.driverBankAddress || "N/A"}
                  </p>
                </div>
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full md:w-auto p-2 border border-gray-300 rounded-md"
              >
                <option value="staff">Staff</option>
                <option value="driver">Driver</option>
                <option value="admin">Admin</option>
              </select>
              <button onClick={()=> handlePromote(driver.userId)} className="border-2 border-black rounded cursor-pointer " >Promote</button>
              <div className="mt-6">
                <h4 className="text-lg font-medium text-black mb-3">
                  Salary History
                </h4>
                <div className="space-y-2 h-[150px] overflow-scroll overflow-x-hidden">
                  {salary.length > 0 ? (
                    salary.map((item) => (
                      <div
                        key={item.month}
                        className="flex justify-between items-center text-sm text-gray-600"
                      >
                        <span>{item.month}</span>
                        <span>₹{item.amount}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No salary history available
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-md p-2">
                  <p className="text-xs text-gray-500 mb-1">Aadhaar</p>
                  <a
                    href={driver.driverAdhaar}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={driver.driverAdhaar}
                      alt="Aadhaar"
                      className="w-full h-24 object-contain"
                    />
                  </a>
                </div>
                <div className="border border-gray-200 rounded-md p-2">
                  <p className="text-xs text-gray-500 mb-1">PAN</p>
                  <a
                    href={driver.driverPan}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={driver.driverPan}
                      alt="PAN"
                      className="w-full h-24 object-contain"
                    />
                  </a>
                </div>
                <div className="border border-gray-200 rounded-md p-2">
                  <p className="text-xs text-gray-500 mb-1">Driving Licence</p>
                  <a
                    href={driver.drivingLicence}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={driver.drivingLicence}
                      alt="Driving Licence"
                      className="w-full h-24 object-contain"
                    />
                  </a>
                </div>
              </div>

              <div className="mt-8 text-sm text-gray-500 space-y-2">
                <p>Created At: {new Date(driver.createdAt).toLocaleString()}</p>
                <p>Updated At: {new Date(driver.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-medium text-black mb-3">
              Salary Trend
            </h4>
            {salary.length > 0 ? (
              <div className="w-full h-[400px]">
                <Line ref={chartRef} options={options} data={data} />
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No salary data available for chart
              </p>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <UpdateSalary driver={id} onUpdate={handleSalaryUpdate} />
          </div>
        </div>

        {/* Promotion Feedback */}
        {promotionSuccess && (
          <div className="bg-green-100 text-green-800 p-4 text-center mt-4">
            Role updated successfully!
          </div>
        )}
        {promotionError && (
          <div className="bg-red-100 text-red-800 p-4 text-center mt-4">
            {promotionError}
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverDetails;
