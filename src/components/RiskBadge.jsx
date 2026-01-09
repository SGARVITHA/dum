import React from "react";

const RiskBadge = ({ risk }) => {
  const colors = {
    Stable: "green",
    Watch: "goldenrod",
    Escalating: "orange",
    Critical: "red"
  };

  return (
    <span
      style={{
        background: colors[risk],
        color: "white",
        padding: "4px 8px",
        borderRadius: 4,
        marginLeft: 8
      }}
    >
      {risk}
    </span>
  );
};

export default RiskBadge;
