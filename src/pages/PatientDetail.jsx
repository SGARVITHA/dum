import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, Bell } from "lucide-react";
import html2pdf from "html2pdf.js";

const initialVitals = [
  { timestamp: "08:00", type: "Respiratory Rate", value: 18, enteredBy: "Dr. Smith", confidence: "Recent" },
  { timestamp: "10:00", type: "Systolic BP", value: 120, enteredBy: "Dr. Smith", confidence: "Recent" },
];

const initialAlerts = [
  { id: 1, text: "Respiratory Rate Elevated", reviewed: false, note: "" },
  { id: 2, text: "Systolic BP Drop", reviewed: false, note: "" },
];

const vitalsData = [
  { time: "08:00", rr: 18, sbp: 120 },
  { time: "10:00", rr: 20, sbp: 118 },
  { time: "12:00", rr: 22, sbp: 115 },
  { time: "14:00", rr: 24, sbp: 108 },
  { time: "16:00", rr: 26, sbp: 95 },
  { time: "18:00", rr: 28, sbp: 90 },
  { time: "20:00", rr: 25, sbp: 95 },
  { time: "22:00", rr: 23, sbp: 100 },
];

const PatientDetail = () => {
  const { id } = useParams();
  const reportRef = useRef();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [vitals, setVitals] = useState(initialVitals);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [newVital, setNewVital] = useState({ type: "", value: "" });

  const handleAddVital = () => {
    if (!newVital.type || !newVital.value) return;
    setVitals([
      ...vitals,
      {
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: newVital.type,
        value: newVital.value,
        enteredBy: "Dr. Smith",
        confidence: "Recent",
      },
    ]);
    setNewVital({ type: "", value: "" });
  };

  const handleAcknowledge = (alertId) => {
    const note = prompt("Enter review / note for this alert:");
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, reviewed: true, note: note || "-" } : a));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="bg-teal-600 text-white rounded-xl p-6 mb-6 shadow-lg">
        <div className="flex items-center gap-4">
          <ArrowLeft className="cursor-pointer" />
          <div>
            <h2 className="text-2xl font-bold">John Smith</h2>
            <p className="text-sm">P-001 · 67 yrs · Male · ICU Bed 12</p>
            <p className="text-sm">Attending: Dr. Smith / Nursing Team</p>
          </div>
          <span className="ml-auto bg-red-500 text-white px-3 py-1 text-sm rounded-full">
            Critical
          </span>
        </div>
      </div>

      {/* Menu Tabs */}
      <div className="flex gap-6 border-b mb-6 text-sm font-semibold">
        {["dashboard", "audit", "report", "replay"].map((tab) => (
          <span
            key={tab}
            className={`pb-2 cursor-pointer ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </span>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="col-span-2 space-y-6">
            {/* Add New Vitals */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold text-lg mb-4">Add New Vital</h3>
              <div className="flex gap-3 mb-3">
                <select
                  className="border rounded-lg p-2 w-1/2"
                  value={newVital.type}
                  onChange={(e) => setNewVital({ ...newVital, type: e.target.value })}
                >
                  <option value="">Select Vital</option>
                  <option value="Respiratory Rate">Respiratory Rate</option>
                  <option value="Systolic BP">Systolic BP</option>
                  <option value="Mental Status">Mental Status</option>
                </select>
                <input
                  className="border rounded-lg p-2 w-1/2"
                  placeholder="Value"
                  value={newVital.value}
                  onChange={(e) => setNewVital({ ...newVital, value: e.target.value })}
                />
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={handleAddVital}
              >
                Submit
              </button>
            </div>

            {/* Previously Entered Vitals */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold text-lg mb-4">Previously Entered Vitals</h3>
              <table className="w-full border-collapse border border-gray-300 text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">Time</th>
                    <th className="border px-2 py-1">Type</th>
                    <th className="border px-2 py-1">Value</th>
                    <th className="border px-2 py-1">Entered By</th>
                    <th className="border px-2 py-1">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {vitals.map((v, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border px-2 py-1">{v.timestamp}</td>
                      <td className="border px-2 py-1">{v.type}</td>
                      <td className="border px-2 py-1">{v.value}</td>
                      <td className="border px-2 py-1">{v.enteredBy}</td>
                      <td className="border px-2 py-1">{v.confidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chart Section */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold text-lg mb-4">Vital Signs Trend</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={vitalsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" label={{ value: "RR", angle: -90, position: "insideLeft" }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: "SBP", angle: 90, position: "insideRight" }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="rr"
                    stroke="#2563eb"
                    name="Respiratory Rate"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="sbp"
                    stroke="#dc2626"
                    name="Systolic BP"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 text-gray-700 bg-gray-100 p-3 rounded">
                <strong>Clinical Summary:</strong> RR increased 14:00–18:00, SBP dropped post-intervention, stabilized at 20:00.
              </div>
            </div>
          </div>

          {/* Right Section: Alerts */}
          <div className="bg-white rounded-xl shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Bell className="text-orange-500" /> Active Alerts
              </h3>
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                {alerts.filter(a => !a.reviewed).length} Active
              </span>
            </div>
            {alerts.map((alert) => (
              <div key={alert.id} className="border border-red-200 bg-red-50 p-3 rounded-lg mb-3">
                <p className="font-medium">{alert.text}</p>
                <p className="text-xs text-gray-500">2024-01-10 16:00</p>
                <button
                  className="mt-2 text-sm text-green-600 border border-green-600 px-3 py-1 rounded-lg hover:bg-green-50"
                  onClick={() => handleAcknowledge(alert.id)}
                >
                  Acknowledge
                </button>
                {alert.reviewed && (
                  <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                    <strong>Review:</strong> {alert.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Log */}
      {activeTab === "audit" && (
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold text-lg mb-4">Audit Log</h3>
          <ul className="list-disc pl-5">
            {vitals.map((v, idx) => (
              <li key={idx}>
                {v.timestamp}: {v.type} = {v.value} ({v.enteredBy})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Report Tab */}
      {activeTab === "report" && (
        <div ref={reportRef} className="bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-xl mb-4">Patient Report - John Smith</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p><strong>Patient ID:</strong> P-001</p>
              <p><strong>Age/Gender:</strong> 67 yrs / Male</p>
              <p><strong>Ward / Bed:</strong> ICU – Bed 12</p>
              <p><strong>Attending Physician:</strong> Dr. Smith</p>
            </div>
            <div>
              <p><strong>Generated on:</strong> {new Date().toLocaleString()}</p>
              <p><strong>Generated by:</strong> Dr. Smith (Doctor)</p>
              <p><strong>Purpose:</strong> Monitoring & Audit</p>
            </div>
          </div>
          <h3 className="font-semibold mb-2">Vitals History</h3>
          <table className="w-full border-collapse border border-gray-300 text-left mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Time</th>
                <th className="border px-2 py-1">Type</th>
                <th className="border px-2 py-1">Value</th>
                <th className="border px-2 py-1">Entered By</th>
                <th className="border px-2 py-1">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {vitals.map((v, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{v.timestamp}</td>
                  <td className="border px-2 py-1">{v.type}</td>
                  <td className="border px-2 py-1">{v.value}</td>
                  <td className="border px-2 py-1">{v.enteredBy}</td>
                  <td className="border px-2 py-1">{v.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="font-semibold mb-2">Alerts & Acknowledgment</h3>
          <table className="w-full border-collapse border border-gray-300 text-left mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Alert</th>
                <th className="border px-2 py-1">Acknowledged</th>
                <th className="border px-2 py-1">Notes</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => (
                <tr key={a.id}>
                  <td className="border px-2 py-1">{a.text}</td>
                  <td className="border px-2 py-1">{a.reviewed ? "Yes" : "No"}</td>
                  <td className="border px-2 py-1">{a.note || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => html2pdf().from(reportRef.current).save(`Patient_Report.pdf`)}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientDetail;
