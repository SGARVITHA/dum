import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientList from "./pages/PatientList";
import PatientDetail from "./pages/PatientDetail";
import ReportPage from "./pages/ReportPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
        <Route path="/patient/:id/report" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
