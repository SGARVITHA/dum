import html2pdf from "html2pdf.js";

const PDFDownloadButton = () => {
  const downloadPDF = () => {
    const element = document.getElementById("report-content");
    html2pdf().from(element).save("Sepsis_Report.pdf");
  };

  return (
    <button
      onClick={downloadPDF}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Download PDF
    </button>
  );
};

export default PDFDownloadButton;
