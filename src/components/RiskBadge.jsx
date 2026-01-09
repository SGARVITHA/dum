import React from "react";

const RiskBadge = ({ risk }) => {
  const colors = {
    "Stable": "bg-green-500",
    "Watch": "bg-yellow-400",
    "Escalating": "bg-orange-500",
    "Critical": "bg-red-600"
  };
  return <span className={`text-white px-2 py-1 rounded ${colors[risk]}`}>{risk}</span>;
};

export default RiskBadge;
