import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientList from "./pages/PatientList";
import PatientDetail from "./pages/PatientDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* Patient dashboard / list */}
        <Route path="/patients" element={<PatientList />} />

        {/* Patient detail page */}
        <Route path="/patient/:id" element={<PatientDetail />} />

        {/* Optional: fallback to login for unknown paths */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
