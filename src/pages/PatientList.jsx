
import React from "react";
import { useNavigate } from "react-router-dom";
import RiskBadge from "../components/RiskBadge";

const patients = [
  { id: 1, name: "John Doe", risk: "Watch" },
  { id: 2, name: "Mary Jane", risk: "Escalating" }
];

const PatientList = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h2>Non-ICU Patients</h2>

      {patients.map(p => (
        <div key={p.id} style={{ marginBottom: 12 }}>
          <strong>{p.name}</strong>{" "}
          <RiskBadge risk={p.risk} />
          <button
            style={{ marginLeft: 10 }}
            onClick={() => navigate(`/patients/${p.id}`)}
          >
            View
          </button>
        </div>
      ))}
    </div>
  );
};

export default PatientList;
