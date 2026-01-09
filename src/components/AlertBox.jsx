import React, { useState } from "react";

const AlertBox = () => {
  const [ack, setAck] = useState(false);
  const [note, setNote] = useState("");

  return (
    <div style={{ border: "1px solid red", padding: 10 }}>
      <h4>Escalation Alert</h4>

      {!ack ? (
        <button onClick={() => setAck(true)}>Acknowledge</button>
      ) : (
        <>
          <textarea
            placeholder="Doctor review"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <p>Review saved</p>
        </>
      )}
    </div>
  );
};

export default AlertBox;
