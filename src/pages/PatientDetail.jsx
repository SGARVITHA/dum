import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UnifiedChart from "../components/UnifiedChart";

const patientsSample = [
  {
    id: 1,
    name: "Nita Magarpatta",
    bedId: "B101",
    mentalStatus: "Normal",
    condition: "Stable",
    lastCheck: "Today, 11:45",
    vitalsHistory: [
      { time: "10:00", systolic: 110, diastolic: 70, RR: 20 },
      { time: "12:00", systolic: 115, diastolic: 75, RR: 22 },
      { time: "14:00", systolic: 112, diastolic: 72, RR: 21 },
    ],
  },
];

const PatientDetail = () => {
  const { id } = useParams();
  const patient = patientsSample.find((p) => p.id === parseInt(id));

  const [vitalsHistory, setVitalsHistory] = useState(
    patient?.vitalsHistory || []
  );

  const [showForm, setShowForm] = useState(false);
  const [newVitals, setNewVitals] = useState({
    systolic: "",
    diastolic: "",
    RR: "",
  });

  const [alerts, setAlerts] = useState([
    { id: 1, message: "High BP detected", acknowledged: false },
    { id: 2, message: "RR above normal", acknowledged: false },
  ]);

  if (!patient) {
    return (
      <div className="text-center mt-20 text-red-500">
        Patient not found
      </div>
    );
  }

  const handleAddVitals = () => {
    if (!newVitals.systolic || !newVitals.diastolic || !newVitals.RR) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setVitalsHistory([
      ...vitalsHistory,
      {
        time,
        systolic: Number(newVitals.systolic),
        diastolic: Number(newVitals.diastolic),
        RR: Number(newVitals.RR),
      },
    ]);

    setNewVitals({ systolic: "", diastolic: "", RR: "" });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-600">
          {patient.name}
        </h1>
        <div className="flex gap-3">
          <button className="btn">Dashboard</button>
          <button className="btn">Audit Log</button>
          <button className="btn">Reports</button>
          <button className="btn">Replay</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT — Patient Info */}
        <div className="lg:w-1/4 bg-white p-6 rounded shadow">
          <h2 className="font-semibold text-lg mb-4">Patient Details</h2>
          <p><strong>Bed ID:</strong> {patient.bedId}</p>
          <p><strong>Mental Status:</strong> {patient.mentalStatus}</p>
          <p><strong>Condition:</strong> {patient.condition}</p>
          <p><strong>Last Check:</strong> {patient.lastCheck}</p>

          <button
            className="mt-4 w-full bg-teal-600 text-white py-2 rounded"
            onClick={() => setShowForm(!showForm)}
          >
            + Add New Vitals
          </button>

          {/* Add Vitals Form */}
          {showForm && (
            <div className="mt-4 space-y-2">
              <input
                type="number"
                placeholder="Systolic BP"
                className="w-full border p-2 rounded"
                value={newVitals.systolic}
                onChange={(e) =>
                  setNewVitals({ ...newVitals, systolic: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Diastolic BP"
                className="w-full border p-2 rounded"
                value={newVitals.diastolic}
                onChange={(e) =>
                  setNewVitals({ ...newVitals, diastolic: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Respiratory Rate (RR)"
                className="w-full border p-2 rounded"
                value={newVitals.RR}
                onChange={(e) =>
                  setNewVitals({ ...newVitals, RR: e.target.value })
                }
              />
              <button
                className="w-full bg-green-600 text-white py-2 rounded"
                onClick={handleAddVitals}
              >
                Save Vitals
              </button>
            </div>
          )}

          {/* Previous Vitals */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Previous Vitals</h3>
            <ul className="text-sm space-y-1">
              {vitalsHistory.map((v, i) => (
                <li key={i}>
                  {v.time} — BP: {v.systolic}/{v.diastolic}, RR: {v.RR}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CENTER — Unified Chart */}
        <div className="lg:w-2/4 bg-white p-6 rounded shadow">
          <UnifiedChart vitalsHistory={vitalsHistory} />
          <p className="text-sm text-gray-600 mt-2">
            Unified trend of Blood Pressure & Respiratory Rate
          </p>
        </div>

        {/* RIGHT — Alerts */}
        <div className="lg:w-1/4 bg-white p-6 rounded shadow">
          <h2 className="font-semibold text-lg mb-4">Alerts</h2>
          {alerts.map((a) => (
            <div
              key={a.id}
              className="mb-3 p-3 bg-red-100 border-l-4 border-red-600 rounded"
            >
              <p>{a.message}</p>
              {!a.acknowledged && (
                <button
                  className="mt-2 w-full bg-red-600 text-white py-1 rounded"
                  onClick={() =>
                    setAlerts(alerts.map(al =>
                      al.id === a.id ? { ...al, acknowledged: true } : al
                    ))
                  }
                >
                  Acknowledge
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
