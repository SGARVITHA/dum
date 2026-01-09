import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const samplePatients = [
  { id: 1, name: "John Doe", stage: "Stable" },
  { id: 2, name: "Jane Smith", stage: "Watch" },
  { id: 3, name: "Alice Brown", stage: "Critical" },
];

const PatientList = () => {
  const [patients, setPatients] = useState(samplePatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("All");

  const navigate = useNavigate();

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStage === "All" || p.stage === filterStage;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Patients ({patients.length})</h2>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        />
        <select
          value={filterStage}
          onChange={(e) => setFilterStage(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="All">All Stages</option>
          <option value="Stable">Stable</option>
          <option value="Watch">Watch</option>
          <option value="Escalating">Escalating</option>
          <option value="Critical">Critical</option>
        </select>
        <button
          onClick={() => navigate("/add-patient")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Patient
        </button>
      </div>

      {/* Patient List */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-2 py-1">ID</th>
            <th className="border border-gray-300 px-2 py-1">Name</th>
            <th className="border border-gray-300 px-2 py-1">Stage</th>
            <th className="border border-gray-300 px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((p) => (
            <tr key={p.id}>
              <td className="border border-gray-300 px-2 py-1">{p.id}</td>
              <td className="border border-gray-300 px-2 py-1">{p.name}</td>
              <td className="border border-gray-300 px-2 py-1">{p.stage}</td>
              <td className="border border-gray-300 px-2 py-1">
                <button
                  onClick={() => navigate(`/patient/${p.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {filteredPatients.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
