import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png"; // default user icon

const patientsSample = [
  { id: 1, name: "Nita Magarpatta", bedId: "B101", RR: 20, BP: "110/70", mentalStatus: "Normal", condition: "Stable", lastCheck: "Today, 11:45" },
  { id: 2, name: "Ryan Gray", bedId: "B102", RR: 25, BP: "100/65", mentalStatus: "Altered", condition: "Watch", lastCheck: "Today, 14:29" },
  { id: 3, name: "Olivia Brown", bedId: "B103", RR: 28, BP: "85/60", mentalStatus: "Altered", condition: "Escalating", lastCheck: "Yesterday, 09:45" },
  { id: 4, name: "John Smith", bedId: "B104", RR: 32, BP: "80/55", mentalStatus: "Altered", condition: "Critical", lastCheck: "Today, 10:15" },
  { id: 5, name: "Emma Watson", bedId: "B105", RR: 22, BP: "115/75", mentalStatus: "Normal", condition: "Stable", lastCheck: "Yesterday, 16:20" },
];

const conditionColors = {
  Stable: "bg-green-100 text-green-800",
  Watch: "bg-yellow-100 text-yellow-800",
  Escalating: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
};

const PatientList = () => {
  const navigate = useNavigate();
  const [patients] = useState(patientsSample);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Summary counts
  const totalPatients = patients.length;
  const totalStable = patients.filter((p) => p.condition === "Stable").length;
  const totalCritical = patients.filter((p) => p.condition === "Critical").length;

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.condition === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
        <h1 className="text-3xl font-bold text-teal-600">Patient Dashboard</h1>
        <button
          onClick={() => alert("Add New Patient functionality")}
          className="bg-teal-600 text-white px-5 py-2 rounded shadow hover:bg-teal-700"
        >
          + Add New Patient
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-gray-500">Total Patients</span>
          <span className="text-2xl font-bold text-teal-600">{totalPatients}</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-gray-500">Stable</span>
          <span className="text-2xl font-bold text-green-600">{totalStable}</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex flex-col items-center justify-center">
          <span className="text-gray-500">Critical</span>
          <span className="text-2xl font-bold text-red-600">{totalCritical}</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 shadow-sm focus:ring-2 focus:ring-teal-400 focus:outline-none"
        >
          <option>All</option>
          <option>Stable</option>
          <option>Watch</option>
          <option>Escalating</option>
          <option>Critical</option>
        </select>
      </div>

      {/* Patient Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3">Patient</th>
              <th className="px-6 py-3">Bed ID</th>
              <th className="px-6 py-3">RR</th>
              <th className="px-6 py-3">BP</th>
              <th className="px-6 py-3">Mental Status</th>
              <th className="px-6 py-3">Condition</th>
              <th className="px-6 py-3">Last Check</th>
              <th className="px-6 py-3">Action</th>
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
                <tr key={p.id} className="border-b hover:bg-gray-50 transition duration-150 cursor-pointer">
                  <td
                    className="px-6 py-4 flex items-center gap-3"
                    onClick={() => navigate(`/patient-detail/${p.id}`)}
                  >
                    <img
                      src={userIcon}
                      alt={p.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">{p.name}</span>
                  </td>
                  <td className="px-6 py-4">{p.bedId}</td>
                  <td className="px-6 py-4">{p.RR}</td>
                  <td className="px-6 py-4">{p.BP}</td>
                  <td className="px-6 py-4">{p.mentalStatus}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${conditionColors[p.condition]}`}
                    >
                      {p.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4">{p.lastCheck}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-teal-600 hover:underline"
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
    </div>
  );
};

export default PatientList;
