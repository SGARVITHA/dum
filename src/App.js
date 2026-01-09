import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PatientList from "./pages/PatientList";
import PatientDetail from "./pages/PatientDetail";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/patients" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/patients"
          element={user ? <PatientList /> : <Navigate to="/" />}
        />
        <Route
          path="/patient/:id"
          element={user ? <PatientDetail /> : <Navigate to="/" />}
        />
        <Route path="*" element={<div className="p-8">Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
