import React from "react";

const UnifiedChart = ({ vitals = [] }) => {
  if (!Array.isArray(vitals) || vitals.length === 0) {
    return (
      <div className="bg-white p-6 rounded shadow text-gray-500">
        No vitals data available
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="font-semibold text-lg mb-4">Unified Vitals Chart</h3>

      <div className="space-y-3">
        {vitals.map((v, index) => (
          <div
            key={index}
            className="flex justify-between bg-gray-100 px-4 py-2 rounded"
          >
            <span>BP: {v.bp}</span>
            <span>RR: {v.rr}</span>
            <span>{v.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnifiedChart;
