import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RiskBadge from "../components/RiskBadge";
import AlertBox from "../components/AlertBox";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [risk] = useState("Escalating");

  return (
    <div style={{ padding: 40 }}>
      <h2>Patient #{id}</h2>
      <RiskBadge risk={risk} />

      <h3>Vitals</h3>
      <ul>
        <li>Respiratory Rate: 26</li>
        <li>Systolic BP: 90</li>
        <li>Mental Status: Altered</li>
      </ul>

      <AlertBox />

      <button onClick={() => navigate(`/report/${id}`)}>
        View Report
      </button>
    </div>
  );
};

export default PatientDetail;
