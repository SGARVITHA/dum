import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import PatientList from "./pages/PatientList";
import PatientDetail from "./pages/PatientDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient-list" element={<PatientList />} />
        <Route path="/patient-detail/:patientId" element={<PatientDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
