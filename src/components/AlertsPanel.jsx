import React from "react";

const alerts = [
  {
    id: 1,
    title: "Respiratory Rate Elevated",
    time: "10 mins ago",
  },
  {
    id: 2,
    title: "Systolic BP Dropped",
    time: "30 mins ago",
  },
  {
    id: 3,
    title: "Sepsis Risk – Stage 2",
    time: "1 hr ago",
  },
];

const AlertsPanel = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">
        Active Alerts <span className="text-red-500">({alerts.length})</span>
      </h3>

      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="border rounded p-2 mb-2 text-sm"
        >
          <p className="font-medium">{alert.title}</p>
          <p className="text-gray-500">{alert.time}</p>
          <button className="mt-2 text-xs text-teal-600">
            Acknowledge
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertsPanel;
