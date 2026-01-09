import React, { useState } from "react";
import Login from "./auth/Login"; // Make sure this folder/file exists: src/auth/Login.jsx
import Dashboard from "./pages/Dashboard"; // Must match file name exactly
import PatientDetail from "./pages/PatientDetail"; // Exact casing

function App() {
  const token = localStorage.getItem("token");
  const userRole = token ? JSON.parse(atob(token)).role : null;

  const [currentView, setCurrentView] = useState(token ? "dashboard" : "login");
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Called from Login page after successful login
  const handleLogin = (role) => {
    setCurrentView("dashboard");
  };

  // Called from Dashboard when a patient row is clicked
  const openPatientDetail = (patientId) => {
    setSelectedPatientId(patientId);
    setCurrentView("patient");
  };

  // Called from PatientDetail "Back" button
  const goBackDashboard = () => setCurrentView("dashboard");

  return (
    <div>
      {currentView === "login" && <Login onLogin={handleLogin} />}
      {currentView === "dashboard" && <Dashboard onSelectPatient={openPatientDetail} role={userRole} />}
      {currentView === "patient" && (
        <PatientDetail patientId={selectedPatientId} onBack={goBackDashboard} />
      )}
    </div>
  );
}

export default App;
