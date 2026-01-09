import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const UnifiedChart = ({ data }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance) {
      chartInstance.destroy();
    }

    const labels = data.map(d => d.timestamp || "");
    const rrData = data.map(d => d.respiratoryRate);
    const sbpData = data.map(d => d.systolicBP);
    const mentalData = data.map(d => (d.mentalStatus === "Altered" ? 2 : 0));

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Respiratory Rate",
            data: rrData,
            borderColor: "rgb(34,197,94)",
            backgroundColor: "rgba(34,197,94,0.2)",
            tension: 0.3,
            yAxisID: "y1",
          },
          {
            label: "Systolic BP",
            data: sbpData,
            borderColor: "rgb(59,130,246)",
            backgroundColor: "rgba(59,130,246,0.2)",
            tension: 0.3,
            yAxisID: "y2",
          },
          {
            label: "Mental Status",
            data: mentalData,
            borderColor: "rgb(234,88,12)",
            backgroundColor: "rgba(234,88,12,0.2)",
            tension: 0.1,
            yAxisID: "y3",
            stepped: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // important for custom height
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Unified Vitals Timeline" },
        },
        scales: {
          y1: {
            type: "linear",
            position: "left",
            title: { display: true, text: "Respiratory Rate" },
            beginAtZero: true,
          },
          y2: {
            type: "linear",
            position: "right",
            title: { display: true, text: "Systolic BP" },
            beginAtZero: true,
            grid: { drawOnChartArea: false }
          },
          y3: {
            type: "linear",
            position: "right",
            title: { display: true, text: "Mental Status" },
            beginAtZero: true,
            min: 0,
            max: 2,
            grid: { drawOnChartArea: false }
          }
        }
      }
    });

    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, [data]);

  return (
    <div className="w-full max-w-3xl mx-auto border border-gray-300 rounded p-2">
      <canvas ref={chartRef} style={{ height: "300px" }} />
    </div>
  );
};

export default UnifiedChart;
