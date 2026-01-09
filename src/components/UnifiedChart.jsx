import React from "react";

const UnifiedChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Unified Vitals Trend
      </h3>

      <div className="relative h-56 border rounded p-4">
        <svg viewBox="0 0 100 40" className="w-full h-full">
          {/* BP Line */}
          <polyline
            fill="none"
            stroke="#0d9488"
            strokeWidth="1.5"
            points="0,25 20,22 40,20 60,18 80,16 100,15"
          />

          {/* RR Line */}
          <polyline
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
            points="0,30 20,28 40,26 60,24 80,22 100,21"
          />

          {/* Mental Status */}
          <polyline
            fill="none"
            stroke="#dc2626"
            strokeWidth="1.5"
            points="0,35 20,34 40,32 60,30 80,28 100,26"
          />
        </svg>

        {/* Legend */}
        <div className="flex gap-6 mt-4 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-teal-600 rounded-full"></span> BP
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span> RR
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-600 rounded-full"></span> Mental Status
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-4">
        This unified chart displays the combined trend of Blood Pressure,
        Respiratory Rate, and Mental Status changes over time. Hover interaction
        highlights variations for early deterioration detection.
      </p>
    </div>
  );
};

export default UnifiedChart;
