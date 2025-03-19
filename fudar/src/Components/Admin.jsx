import { faker } from "@faker-js/faker";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const Name = "Satish";
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Expense of ${Name}`,
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: `${Name}`,
        data: labels.map(() => faker.number.int({ min: 1000, max: 20000 })),
        borderColor: "#3b82f6",
        backgroundColor: "#78a9f8",
      },
    ],
  };

  return (
  <>
    <div className="md:absolute md:top-[190px] md:left-[270px]">
      
      <div className="md:w-[1200px] md:h-[600px] w-[400px] h-[200px] bg-black text-white">
        <Line options={options} data={data} />
      </div>
    </div>
    </>
  );
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
export default Admin;