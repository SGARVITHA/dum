import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RiskBadge from "../components/RiskBadge";
import AlertBox from "../components/AlertBox";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock patient data
  const patient = {
    id,
    name: id === "1" ? "John Doe" : "Mary Jane",
    vitals: {
      respiratoryRate: 26,
      systolicBP: 90,
      mentalStatus: "Altered"
    },
    risk: "Escalating"
  };

  // Get logged-in clinician info
  const doctorName = localStorage.getItem("doctorName") || "Unknown";
  const role = localStorage.getItem("role") || "Unknown";

  return (
    <div style={{ padding: 40 }}>
      <h2>Patient Detail - {patient.name}</h2>
      <p>
        Clinician: <strong>{doctorName}</strong> ({role})
      </p>

      <RiskBadge risk={patient.risk} />

      <h3>Vitals</h3>
      <ul>
        <li>Respiratory Rate: {patient.vitals.respiratoryRate}</li>
        <li>Systolic BP: {patient.vitals.systolicBP}</li>
        <li>Mental Status: {patient.vitals.mentalStatus}</li>
      </ul>

      <AlertBox patientId={patient.id} />

      <button
        style={{ marginTop: 20 }}
        onClick={() => navigate(`/report/${patient.id}`)}
      >
        View Report
      </button>
    </div>
  );
};

export default PatientDetail;
