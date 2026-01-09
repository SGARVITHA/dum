import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialPatients = [
  { id: 1, name: "Nita Magarpatta", pid: "P-001", age: 34, gender: "Female", status: "Stable", time: "2 mins ago" },
  { id: 2, name: "Anu Sharma", pid: "P-002", age: 45, gender: "Female", status: "Critical", time: "10 mins ago" },
  { id: 3, name: "Ryan Gray", pid: "P-003", age: 52, gender: "Male", status: "High Risk", time: "1 hour ago" },
];

const statusStyle = {
  Critical: "bg-red-100 text-red-700 border-red-500",
  "High Risk": "bg-yellow-100 text-yellow-700 border-yellow-500",
  Stable: "bg-green-100 text-green-700 border-green-500",
};

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", pid: "", age: "", gender: "", status: "Critical" });

  const totalPatients = patients.length;
  const totalCritical = patients.filter(p => p.status === "Critical").length;
  const totalStable = patients.filter(p => p.status === "Stable").length;

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.pid.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.pid || !newPatient.age || !newPatient.gender) {
      alert("Please fill all fields");
      return;
    }
    const nextId = patients.length ? patients[patients.length - 1].id + 1 : 1;
    setPatients([...patients, { id: nextId, ...newPatient, time: "Just now" }]);
    setNewPatient({ name: "", pid: "", age: "", gender: "", status: "Critical" });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-teal-600 text-white p-4 rounded mb-6">
        <h1 className="text-3xl font-bold">Patient Monitoring Dashboard</h1>
        <button className="bg-white text-teal-600 px-4 py-2 rounded font-semibold hover:bg-gray-100" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>

      {/* Totals */}
      <div className="flex gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow flex-1 text-center">
          <p className="text-gray-500">Total Patients</p>
          <p className="text-xl font-bold">{totalPatients}</p>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1 text-center">
          <p className="text-gray-500">Critical</p>
          <p className="text-xl font-bold">{totalCritical}</p>
        </div>
        <div className="bg-white p-4 rounded shadow flex-1 text-center">
          <p className="text-gray-500">Stable</p>
          <p className="text-xl font-bold">{totalStable}</p>
        </div>
      </div>

      {/* Search & Add */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700"
        >
          + Add New Patient
        </button>
      </div>

      {/* Patient Cards */}
      <div className="space-y-4">
        {filteredPatients.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-200 rounded-lg p-5 flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{p.name}</h2>
              <p className="text-sm text-gray-500">
                {p.pid} • {p.age} yrs • {p.gender}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full border ${statusStyle[p.status]}`}
              >
                {p.status}
              </span>
              <span className="text-sm text-gray-500">{p.time}</span>
              <button
                onClick={() => navigate(`/patient/${p.id}`)}
                className="text-teal-600 font-semibold hover:underline"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
            <input
              type="text"
              placeholder="Name"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <input
              type="text"
              placeholder="Patient ID"
              value={newPatient.pid}
              onChange={(e) => setNewPatient({ ...newPatient, pid: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <input
              type="number"
              placeholder="Age"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <input
              type="text"
              placeholder="Gender"
              value={newPatient.gender}
              onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-3"
            />
            <select
              value={newPatient.status}
              onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })}
              className="w-full border px-3 py-2 rounded mb-4"
            >
              <option>Critical</option>
              <option>High Risk</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;
