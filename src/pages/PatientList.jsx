import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PatientList() {
  const navigate = useNavigate();

  /* ---------------- Dummy Patient Data ---------------- */
  const [patients, setPatients] = useState([
   
     { id: 1, name: "Michael Brown", pid: "P-1006", room: "306B", age: 67, rr: 24, sbp: 96, mental: "Altered", risk: "Critical", lastUpdated: "22:05" },
  { id: 2, name: "Margaret Thompson", pid: "P-1001", room: "301A", age: 72, rr: 23, sbp: 98, mental: "Normal", risk: "Escalating", lastUpdated: "22:05" },
  { id: 3, name: "James Anderson", pid: "P-1004", room: "304B", age: 81, rr: 22, sbp: 99, mental: "Normal", risk: "Escalating", lastUpdated: "22:05" },
  { id: 4, name: "Linda Williams", pid: "P-1003", room: "303A", age: 65, rr: 20, sbp: 110, mental: "Normal", risk: "Watch", lastUpdated: "22:05" },
  { id: 5, name: "Robert Garcia", pid: "P-1002", room: "302B", age: 58, rr: 17, sbp: 113, mental: "Normal", risk: "Stable", lastUpdated: "22:05" },
  { id: 6, name: "Patricia Martinez", pid: "P-1005", room: "305A", age: 45, rr: 17, sbp: 114, mental: "Normal", risk: "Stable", lastUpdated: "22:05" },
  { id: 7, name: "Elizabeth Davis", pid: "P-1007", room: "307A", age: 54, rr: 16, sbp: 114, mental: "Normal", risk: "Stable", lastUpdated: "22:05" },
  { id: 8, name: "William Johnson", pid: "P-1008", room: "308B", age: 78, rr: 19, sbp: 111, mental: "Normal", risk: "Stable", lastUpdated: "22:05" },
  { id: 9, name: "Barbara Wilson", pid: "P-1009", room: "309A", age: 69, rr: 25, sbp: 95, mental: "Altered", risk: "Critical", lastUpdated: "22:05" },
  { id: 10, name: "Thomas Lee", pid: "P-1010", room: "310B", age: 63, rr: 21, sbp: 102, mental: "Normal", risk: "Escalating", lastUpdated: "22:05" },
  { id: 11, name: "Susan Taylor", pid: "P-1011", room: "311A", age: 74, rr: 22, sbp: 97, mental: "Altered", risk: "Critical", lastUpdated: "22:05" },
  { id: 12, name: "Daniel Harris", pid: "P-1012", room: "312B", age: 56, rr: 18, sbp: 115, mental: "Normal", risk: "Stable", lastUpdated: "22:05" }
    
    // ...other patients
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    pid: "",
    room: "",
    age: "",
    rr: "",
    sbp: "",
    mental: "OK",
    risk: "Critical"
  });

  /* ---------------- Handlers ---------------- */
  const handleAddPatientChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAddPatientSubmit = (e) => {
    e.preventDefault();
    const id = patients.length + 1;
    const lastUpdated = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setPatients([...patients, { ...newPatient, id, lastUpdated }]);
    setNewPatient({ name: "", pid: "", room: "", age: "", rr: "", sbp: "", mental: "OK", risk: "Critical" });
    setShowAddModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Patient Dashboard</h1>
          <p className="text-sm text-gray-500">
            Monitoring {patients.length} patients
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Add Patient
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SummaryCard title="Total Patients" value={patients.length} />
        <SummaryCard title="High Risk" value={patients.filter(p => p.risk === "Critical").length} highlight="red" />
        <SummaryCard title="Watch Status" value={patients.filter(p => p.risk === "Watch").length} highlight="yellow" />
        <SummaryCard title="Pending Alerts" value={2} highlight="teal" />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or ID..."
          className="flex-1 bg-white border rounded-lg px-4 py-2 w-full"
        />

        <select className="bg-white border rounded-lg px-4 py-2 w-full md:w-1/5">
          <option>All Risk Levels</option>
          <option>Critical</option>
          <option>Escalating</option>
          <option>Watch</option>
          <option>Stable</option>
        </select>
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onClick={() => navigate(`/patient/${patient.id}`)}
          />
        ))}
      </div>

      {/* ---------------- Add Patient Modal ---------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>
            <form onSubmit={handleAddPatientSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Patient Name"
                value={newPatient.name}
                onChange={handleAddPatientChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="pid"
                placeholder="Patient ID"
                value={newPatient.pid}
                onChange={handleAddPatientChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="text"
                name="room"
                placeholder="Ward / Room ID"
                value={newPatient.room}
                onChange={handleAddPatientChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={newPatient.age}
                onChange={handleAddPatientChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                name="rr"
                placeholder="RR"
                value={newPatient.rr}
                onChange={handleAddPatientChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                name="sbp"
                placeholder="SBP"
                value={newPatient.sbp}
                onChange={handleAddPatientChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
              <select
                name="mental"
                value={newPatient.mental}
                onChange={handleAddPatientChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>Normal</option>
                <option>Altered</option>
              </select>
              <select
                name="risk"
                value={newPatient.risk}
                onChange={handleAddPatientChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>Critical</option>
                <option>Escalating</option>
                <option>Watch</option>
                <option>Stable</option>
              </select>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white"
                >
                  Add Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Components ---------------- */

function SummaryCard({ title, value, highlight }) {
  const styles = {
    red: "border-red-400 text-red-600",
    yellow: "border-yellow-400 text-yellow-600",
    teal: "border-teal-400 text-teal-600"
  };

  return (
    <div
      className={`bg-white border rounded-xl p-4 ${highlight ? styles[highlight] : ""}`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function PatientCard({ patient, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow hover:shadow-md cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold">{patient.name}</h3>
          <p className="text-sm text-gray-500">
            {patient.pid} • Room {patient.room} • {patient.age}y
          </p>
        </div>

        <RiskBadge level={patient.risk} />
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <Vital value={patient.rr} label="RR /min" />
        <Vital value={patient.sbp} label="SBP mmHg" />
        <Vital value={patient.mental} label="Mental" />
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Last updated {patient.lastUpdated}
      </p>
    </div>
  );
}

function Vital({ value, label }) {
  return (
    <div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function RiskBadge({ level }) {
  const colors = {
    Critical: "bg-red-100 text-red-600",
    Escalating: "bg-orange-100 text-orange-600",
    Watch: "bg-yellow-100 text-yellow-600",
    Stable: "bg-green-100 text-green-600"
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colors[level]}`}
    >
      {level}
    </span>
  );
}
