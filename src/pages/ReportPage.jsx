<div id="report-content">
import RiskBadge from "../components/RiskBadge";
import VitalsTable from "../components/VitalsTable";
import AlertList from "../components/AlertList";
import PDFDownloadButton from "../components/PDFDownloadButton";

const ReportPage = () => {
  return (
    <div className="p-6">
      
      <div id="report-content">
        <h2>Patient Report</h2>

        <p>Name: John Doe</p>
        <p>Patient ID: P1023</p>

        <RiskBadge risk="Escalating" />

        <VitalsTable />
        <AlertList />

        <p>
          <strong>Doctor Note:</strong> Monitoring required.
        </p>
      </div>

      {/* OUTSIDE report-content */}
      <PDFDownloadButton />
    </div>
  );
};

export default ReportPage;
