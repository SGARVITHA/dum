import React from "react";
import html2pdf from "html2pdf.js";

const ReportPage = () => {
  const downloadPDF = () => {
    const element = document.getElementById("report-content");
    html2pdf().from(element).save("Sepsis_Report.pdf");
  };

  return (
    <div style={{ padding: 40 }}>
      <div id="report-content">
        <h2>Sepsis Monitoring Report</h2>
        <p>Respiratory Rate: 26</p>
        <p>Systolic BP: 90</p>
        <p>Mental Status: Altered</p>
        <p>Risk: Escalating</p>
        <p>Doctor Review: Possible renal deterioration</p>
      </div>

      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default ReportPage;
