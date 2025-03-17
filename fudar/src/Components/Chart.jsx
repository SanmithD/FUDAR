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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function App({ options, data }) {
  return (
    <div className="md:absolute md:top-[190px] md:left-[270px]">
      <div className="md:w-[1200px] md:h-[600px] w-[400px] h-[200px] bg-black text-white">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}