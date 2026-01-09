import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([
    { id: 1, name: "John Doe", condition: "Stable" },
    { id: 2, name: "Jane Smith", condition: "Critical" },
    { id: 3, name: "Alice Johnson", condition: "Watch" }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.condition === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddPatient = () => {
    const newName = prompt("Enter patient name:");
    const newCondition = prompt("Enter condition (Stable / Watch / Escalating / Critical):");
    if (newName && newCondition) {
      const newPatient = {
        id: patients.length + 1,
        name: newName,
        condition: newCondition
      };
      setPatients([...patients, newPatient]);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Side Menu */}
      <aside className="w-56 bg-gray-100 p-6 flex flex-col gap-4">
        <h3 className="text-lg font-semibold mb-4">Menu</h3>
        <button className="py-2 px-4 rounded text-left bg-white hover:bg-blue-100">
          Audit Log
        </button>
        <button className="py-2 px-4 rounded text-left bg-white hover:bg-blue-100">
          Retrospective Replay
        </button>
        <button className="py-2 px-4 rounded text-left bg-white hover:bg-blue-100">
          Report & PDF Download
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Patients ({patients.length})</h2>
          <button
            onClick={handleAddPatient}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Patient
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 flex-1"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option>All</option>
            <option>Stable</option>
            <option>Watch</option>
            <option>Escalating</option>
            <option>Critical</option>
          </select>
        </div>

        {/* Patient List Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2">ID</th>
              <th className="border border-gray-300 px-3 py-2">Name</th>
              <th className="border border-gray-300 px-3 py-2">Condition</th>
              <th className="border border-gray-300 px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2">{p.id}</td>
                <td className="border border-gray-300 px-3 py-2">{p.name}</td>
                <td className="border border-gray-300 px-3 py-2">{p.condition}</td>
                <td className="border border-gray-300 px-3 py-2">
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
      </main>
    </div>
  );
};

export default PatientList;
