import html2pdf from "html2pdf.js";

const Report = () => {

  const downloadPDF = () => {
    const element = document.getElementById("report-content");
    html2pdf().from(element).save("Sepsis_Report.pdf");
  };

  return (
    <div>
      <button onClick={downloadPDF}>
        Download PDF
      </button>

      <div id="report-content">
        {/* charts, tables, alerts, notes */}
      </div>
    </div>
  );
};

export default Report;
