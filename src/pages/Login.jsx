import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Doctor"); // default role
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!name) {
      setError("Please enter your name");
      return;
    }

    // Mock authentication
    localStorage.setItem("token", "mock-jwt");
    localStorage.setItem("doctorName", name);
    localStorage.setItem("role", role);

    navigate("/patients");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Clinician Login</h2>

      <div style={{ marginBottom: 12 }}>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Doctor</option>
          <option>Nurse</option>
        </select>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
