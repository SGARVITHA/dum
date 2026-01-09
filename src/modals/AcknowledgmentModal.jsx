import React, { useState } from "react";

const AcknowledgmentModal = ({ alert, onClose }) => {
  const [notes, setNotes] = useState("");
  const user = JSON.parse(atob(localStorage.getItem("token"))) || { name: "Dr. X" };

  const handleSubmit = () => {
    alert(`Acknowledged by ${user.name}: ${notes}`);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Acknowledge Alert</h2>
      <p>{alert.message}</p>
      <textarea placeholder="Enter notes" value={notes} onChange={e => setNotes(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AcknowledgmentModal;
