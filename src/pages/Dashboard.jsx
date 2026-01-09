// src/pages/Dashboard.jsx
import React, { useState } from "react";
import PatientDetail from "./PatientDetail"; // Make sure this file exists

function Dashboard() {
  // Mock patient data
  const patients = [
    { id: 1, name: "John Doe", age: 45, ward: "General" },
    { id: 2, name: "Jane Smith", age: 60, ward: "ICU" },
    { id: 3, name: "Alice Johnson", age: 30, ward: "Non-ICU" },
  ];

  // Selected patient state
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Function called when a patient is clicked
  const onSelectPatient = (patient) => {
    setSelectedPatient(patient);
    console.log("Selected patient:", patient);
  };

  return (
    <div className="flex flex-col p-6 space-y-6">
      <h1 className="text-2xl font-bold">Patient Dashboard</h1>

      {/* Patient List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="border rounded-lg p-4 shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectPatient(patient)}
          >
            <h2 className="text-lg font-semibold">{patient.name}</h2>
            <p>Age: {patient.age}</p>
            <p>Ward: {patient.ward}</p>
          </div>
        ))}
      </div>

      {/* Patient Detail */}
      {selectedPatient && (
        <PatientDetail
          patient={selectedPatient}
          onSelectPatient={onSelectPatient} // pass if needed
        />
      )}
    </div>
  );
}

export default Dashboard;
