import React from "react";
import { useParams } from "react-router-dom";
import RiskBadge from "../components/RiskBadge";
import html2pdf from "html2pdf.js";

const ReportPage = () => {
  const { id } = useParams();

  // Mock patient data (same as PatientDetail)
  const patient = {
    id,
    name: id === "1" ? "John Doe" : "Mary Jane",
    vitals: {
      respiratoryRate: 26,
      systolicBP: 90,
      mentalStatus: "Altered"
    },
    risk: "Escalating",
    alertReview: "Kidney deterioration noted", // Example review
    acknowledgedBy: localStorage.getItem("doctorName") || "Unknown",
    role: localStorage.getItem("role") || "Unknown"
  };

  const downloadPDF = () => {
    const element = document.getElementById("report-content");
    html2pdf().from(element).save(`Sepsis_Report_${patient.id}.pdf`);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Patient Report - {patient.name}</h2>
      <div id="report-content" style={{ border: "1px solid #ccc", padding: 20 }}>
        <p>
          Clinician: <strong>{patient.acknowledgedBy}</strong> ({patient.role})
        </p>

        <RiskBadge risk={patient.risk} />

        <h3>Vitals</h3>
        <ul>
          <li>Respiratory Rate: {patient.vitals.respiratoryRate}</li>
          <li>Systolic BP: {patient.vitals.systolicBP}</li>
          <li>Mental Status: {patient.vitals.mentalStatus}</li>
        </ul>

        <h3>Alert & Review</h3>
        <p>
          Alert: <strong>{patient.risk}</strong>
        </p>
        <p>
          Review by {patient.acknowledgedBy} ({patient.role}): {patient.alertReview}
        </p>
      </div>

      <button style={{ marginTop: 20 }} onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default ReportPage;
