import React, { useState } from "react";
import { vitals } from "../mock/patientVitals";
import { alerts } from "../mock/alerts";
import { auditLogs } from "../mock/auditLogs";
import VitalChart from "../charts/VitalChart";
import RiskBadge from "../components/RiskBadge";
import AcknowledgmentModal from "../modals/AcknowledgmentModal";

const PatientDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const handleAcknowledge = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <h2>John Doe</h2>
        <RiskBadge risk="Escalating" />
      </div>

      <div className="charts flex gap-6">
        <VitalChart data={vitals} parameter="RR" color="#f59e0b" />
        <VitalChart data={vitals} parameter="SBP" color="#ef4444" />
        <VitalChart data={vitals} parameter="GCS" color="#10b981" />
      </div>

      <div className="alerts mt-6">
        <h3>Alerts</h3>
        {alerts.map(alert => (
          <div key={alert.id} className="alert-card p-2 border my-2">
            <p><strong>{alert.stage}</strong>: {alert.message} at {alert.time}</p>
            <button onClick={() => handleAcknowledge(alert)}>Acknowledge</button>
          </div>
        ))}
      </div>

      <div className="audit mt-6">
        <h3>Audit Log</h3>
        <ul>
          {auditLogs.map((log, idx) => (
            <li key={idx}>{log.time} — {log.user} ({log.role}) — {log.action}</li>
          ))}
        </ul>
      </div>

      {showModal && <AcknowledgmentModal alert={selectedAlert} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default PatientDetail;
