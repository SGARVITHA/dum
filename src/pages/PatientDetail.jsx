import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RiskBadge from "../components/RiskBadge";
import html2pdf from "html2pdf.js";

const PatientDetail = () => {
  const { patientId } = useParams();

  const [patient, setPatient] = useState({
    id: patientId,
    name: "John Doe",
    vitals: [],
    alerts: [],
    history: []
  });

  const [newVital, setNewVital] = useState({
    respiratoryRate: "",
    systolicBP: "",
    mentalStatus: "Normal"
  });

  const [ackNotes, setAckNotes] = useState("");
  const [activeMenu, setActiveMenu] = useState("Vitals"); // "Vitals" / "Audit" / "Replay" / "Report"

  // Add a new vital entry
  const handleSubmitVital = () => {
    const timestamp = new Date().toLocaleString();
    const stage = calculateStage(newVital);

    const entry = { ...newVital, timestamp, stage };

    setPatient((prev) => ({
      ...prev,
      vitals: [...prev.vitals, entry],
      alerts:
        stage !== "Stable"
          ? [...prev.alerts, { stage, timestamp, acknowledged: false }]
          : prev.alerts,
      history: [...prev.history, entry]
    }));

    setNewVital({ respiratoryRate: "", systolicBP: "", mentalStatus: "Normal" });
  };

  const calculateStage = ({ respiratoryRate, systolicBP, mentalStatus }) => {
    if (respiratoryRate >= 30 || systolicBP < 90 || mentalStatus === "Altered") return "Critical";
    if (respiratoryRate >= 25 || systolicBP < 100) return "Escalating";
    if (respiratoryRate >= 22 || systolicBP < 110) return "Watch";
    return "Stable";
  };

  const handleAcknowledge = (index) => {
    const updatedAlerts = [...patient.alerts];
    updatedAlerts[index].acknowledged = true;
    updatedAlerts[index].notes = ackNotes || "No notes";
    setPatient({ ...patient, alerts: updatedAlerts });
    setAckNotes("");
  };

  const downloadPDF = () => {
    const element = document.getElementById("report-content");
    html2pdf().from(element).save(`Sepsis_Report_${patient.name}.pdf`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Side Menu */}
      <aside className="w-56 bg-gray-100 p-6 flex flex-col gap-4">
        <h3 className="text-lg font-semibold mb-4">Menu</h3>
        <button
          className={`py-2 px-4 rounded text-left ${activeMenu === "Audit" ? "bg-blue-500 text-white" : "bg-white"}`}
          onClick={() => setActiveMenu("Audit")}
        >
          Audit Log
        </button>
        <button
          className={`py-2 px-4 rounded text-left ${activeMenu === "Replay" ? "bg-blue-500 text-white" : "bg-white"}`}
          onClick={() => setActiveMenu("Replay")}
        >
          Retrospective Replay
        </button>
        <button
          className={`py-2 px-4 rounded text-left ${activeMenu === "Report" ? "bg-blue-500 text-white" : "bg-white"}`}
          onClick={() => setActiveMenu("Report")}
        >
          Report & PDF Download
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        <h2 className="text-2xl font-bold mb-6">{patient.name} - Patient Detail</h2>

        {/* Patient Data Entry */}
        {activeMenu === "Vitals" && (
          <div className="flex gap-3 mb-6">
            <input
              type="number"
              placeholder="Respiratory Rate"
              value={newVital.respiratoryRate}
              onChange={(e) => setNewVital({ ...newVital, respiratoryRate: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 w-36"
            />
            <input
              type="number"
              placeholder="Systolic BP"
              value={newVital.systolicBP}
              onChange={(e) => setNewVital({ ...newVital, systolicBP: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 w-36"
            />
            <select
              value={newVital.mentalStatus}
              onChange={(e) => setNewVital({ ...newVital, mentalStatus: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 w-36"
            >
              <option>Normal</option>
              <option>Altered</option>
            </select>
            <button
              onClick={handleSubmitVital}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        )}

        {/* Vitals Timeline */}
        {activeMenu === "Vitals" && (
          <div id="report-content" className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Vitals Timeline</h3>
            {patient.vitals.length === 0 ? (
              <p className="text-gray-500">No vitals entered yet.</p>
            ) : (
              <div className="space-y-2">
                {patient.vitals.map((v, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 border border-gray-200 rounded"
                  >
                    <div className="w-36">{v.timestamp}</div>
                    <div className="w-64">
                      RR: {v.respiratoryRate}, BP: {v.systolicBP}, Status: {v.mentalStatus}
                    </div>
                    <RiskBadge risk={v.stage} />
                    <div className="text-gray-600 text-sm">{`Summary: Patient ${v.stage} at ${v.timestamp}`}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Alerts Panel */}
        {activeMenu === "Vitals" && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Alerts & Escalation</h3>
            {patient.alerts.length === 0 ? (
              <p className="text-gray-500">No active alerts</p>
            ) : (
              <div className="space-y-2">
                {patient.alerts.map((a, idx) => (
                  <div
                    key={idx}
                    className="flex gap-2 items-center p-2 border border-gray-200 rounded"
                  >
                    <RiskBadge risk={a.stage} />
                    <div className="w-36">{a.timestamp}</div>
                    <input
                      type="text"
                      placeholder="Technical Notes"
                      value={ackNotes}
                      onChange={(e) => setAckNotes(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 flex-1"
                    />
                    {!a.acknowledged && (
                      <button
                        onClick={() => handleAcknowledge(idx)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Acknowledge
                      </button>
                    )}
                    {a.acknowledged && <span className="text-green-600 font-semibold">Acknowledged</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Audit Log */}
        {activeMenu === "Audit" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Audit / Entry History</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-2 py-1">Timestamp</th>
                  <th className="border border-gray-300 px-2 py-1">RR</th>
                  <th className="border border-gray-300 px-2 py-1">SBP</th>
                  <th className="border border-gray-300 px-2 py-1">Mental Status</th>
                  <th className="border border-gray-300 px-2 py-1">Stage</th>
                </tr>
              </thead>
              <tbody>
                {patient.history.map((h, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-300 px-2 py-1">{h.timestamp}</td>
                    <td className="border border-gray-300 px-2 py-1">{h.respiratoryRate}</td>
                    <td className="border border-gray-300 px-2 py-1">{h.systolicBP}</td>
                    <td className="border border-gray-300 px-2 py-1">{h.mentalStatus}</td>
                    <td className="border border-gray-300 px-2 py-1">{h.stage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Retrospective Replay */}
        {activeMenu === "Replay" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Retrospective Replay</h3>
            <p className="text-gray-500">Timeline animation of patient vitals will be displayed here (future integration).</p>
          </div>
        )}

        {/* Report & PDF */}
        {activeMenu === "Report" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Report & PDF Download</h3>
            <button
              onClick={downloadPDF}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Download PDF Report
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientDetail;
