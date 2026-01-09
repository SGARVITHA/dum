import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";

const patientsSample = [
  { id: 1, name: "Nita Magarpatta", bedId: "B101", bp: 120, rr: 18, mentalStatus: "Normal", condition: "Stable", lastCheck: "Today, 11:45" },
  { id: 2, name: "Ryan Gray", bedId: "B102", bp: 105, rr: 22, mentalStatus: "Altered", condition: "Watch", lastCheck: "Today, 14:29" },
  { id: 3, name: "Olivia Brown", bedId: "B103", bp: 95, rr: 26, mentalStatus: "Altered", condition: "Escalating", lastCheck: "Yesterday, 09:45" },
  { id: 4, name: "Liam Smith", bedId: "B104", bp: 85, rr: 32, mentalStatus: "Altered", condition: "Critical", lastCheck: "Today, 10:15" },
  { id: 5, name: "Emma Johnson", bedId: "B105", bp: 118, rr: 16, mentalStatus: "Normal", condition: "Stable", lastCheck: "Yesterday, 15:30" },
  { id: 6, name: "Noah Williams", bedId: "B106", bp: 102, rr: 24, mentalStatus: "Normal", condition: "Watch", lastCheck: "Today, 12:50" },
];

const conditionColors = {
  Stable: "bg-green-100 text-green-800",
  Watch: "bg-yellow-100 text-yellow-800",
  Escalating: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
};

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(patientsSample);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", bedId: "", bp: "", rr: "", mentalStatus: "Normal", condition: "Stable" });

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.condition === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddPatient = () => {
    const nextId = patients.length ? patients[patients.length - 1].id + 1 : 1;
    setPatients([
      ...patients,
      { id: nextId, lastCheck: "Just now", ...newPatient },
    ]);
    setNewPatient({ name: "", bedId: "", bp: "", rr: "", mentalStatus: "Normal", condition: "Stable" });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-teal-600">Patient Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 text-white px-5 py-2 rounded-lg shadow hover:bg-teal-700 transition-all"
        >
          + Add New Patient
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-teal-300"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 shadow-sm focus:ring-2 focus:ring-teal-300"
        >
          <option>All</option>
          <option>Stable</option>
          <option>Watch</option>
          <option>Escalating</option>
          <option>Critical</option>
        </select>
      </div>

      {/* Patient Table Card */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Bed ID</th>
              <th className="px-4 py-3">BP</th>
              <th className="px-4 py-3">RR</th>
              <th className="px-4 py-3">Mental Status</th>
              <th className="px-4 py-3">Condition</th>
              <th className="px-4 py-3">Last Check</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            ) : (
              filteredPatients.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 cursor-pointer transition-all duration-150"
                >
                  <td
                    className="px-4 py-3 flex items-center gap-3"
                    onClick={() => navigate(`/patient-detail/${p.id}`)}
                  >
                    <img src={userIcon} alt="User Icon" className="w-10 h-10 rounded-full" />
                    <span className="font-medium">{p.name}</span>
                  </td>
                  <td className="px-4 py-3">{p.bedId}</td>
                  <td className="px-4 py-3">{p.bp}</td>
                  <td className="px-4 py-3">{p.rr}</td>
                  <td className="px-4 py-3">{p.mentalStatus}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${conditionColors[p.condition]}`}
                    >
                      {p.condition}
                    </span>
                  </td>
                  <td className="px-4 py-3">{p.lastCheck}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-teal-600 hover:underline font-semibold"
                      onClick={() => navigate(`/patient-detail/${p.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
            <input
              type="text"
              placeholder="Patient Name"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <input
              type="text"
              placeholder="Bed ID / Patient ID"
              value={newPatient.bedId}
              onChange={(e) => setNewPatient({ ...newPatient, bedId: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <input
              type="number"
              placeholder="BP (Systolic)"
              value={newPatient.bp}
              onChange={(e) => setNewPatient({ ...newPatient, bp: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <input
              type="number"
              placeholder="Respiratory Rate (RR)"
              value={newPatient.rr}
              onChange={(e) => setNewPatient({ ...newPatient, rr: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            />
            <select
              value={newPatient.mentalStatus}
              onChange={(e) => setNewPatient({ ...newPatient, mentalStatus: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            >
              <option>Normal</option>
              <option>Altered</option>
            </select>
            <select
              value={newPatient.condition}
              onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            >
              <option>Stable</option>
              <option>Watch</option>
              <option>Escalating</option>
              <option>Critical</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
                onClick={handleAddPatient}
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
