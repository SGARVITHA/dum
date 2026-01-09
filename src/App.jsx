import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import PatientList from "./pages/PatientList";
import PatientDetail from "./pages/PatientDetail";
import ReportPage from "./pages/ReportPage";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Protected */}
        <Route
          path="/patients"
          element={
            <RequireAuth>
              <PatientList />
            </RequireAuth>
          }
        />

        <Route
          path="/patients/:id"
          element={
            <RequireAuth>
              <PatientDetail />
            </RequireAuth>
          }
        />

        <Route
          path="/report/:id"
          element={
            <RequireAuth>
              <ReportPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
