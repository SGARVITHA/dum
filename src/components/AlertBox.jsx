import React, { useState } from "react";

const AlertBox = ({ patientId }) => {
  const [ack, setAck] = useState(false);
  const [note, setNote] = useState("");

  const doctorName = localStorage.getItem("doctorName") || "Unknown";
  const role = localStorage.getItem("role") || "Unknown";

  const handleAcknowledge = () => {
    setAck(true);
    // You can also save review to localStorage or mock DB here
    console.log({
      patientId,
      acknowledgedBy: doctorName,
      role,
      note: note || "No review entered"
    });
  };

  return (
    <div style={{ border: "1px solid red", padding: 10, marginTop: 20 }}>
      <h4>Escalation Alert</h4>
      {!ack ? (
        <button onClick={handleAcknowledge}>Acknowledge</button>
      ) : (
        <div>
          <textarea
            placeholder="Enter review (e.g., kidney deterioration)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ width: "100%", height: 60, marginTop: 10 }}
          />
          <p style={{ marginTop: 10 }}>Acknowledged by {doctorName} ({role})</p>
        </div>
      )}
    </div>
  );
};

export default AlertBox;
