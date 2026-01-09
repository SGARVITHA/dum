import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VitalChart = ({ vitals }) => {
  // Safe defaults
  const RR = vitals?.RR || 20;
  const BP = vitals?.BP ? parseInt(vitals.BP.split("/")[0]) : 110;

  const labels = ["BP Systolic", "RR"];
  const data = {
    labels,
    datasets: [
      {
        label: "Current Reading",
        data: [BP, RR],
        backgroundColor: ["rgba(34,197,94,0.7)", "rgba(239,68,68,0.7)"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Latest Vitals" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar options={options} data={data} />;
};

export default VitalChart;
