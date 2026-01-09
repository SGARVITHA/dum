import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Doctor"); // default role
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    // Save mock token & clinician info for audit
    localStorage.setItem("token", "mock-jwt");
    localStorage.setItem("doctorName", name);
    localStorage.setItem("role", role);

    navigate("/patients");
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Clinician Login</h2>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="Enter your name"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option>Doctor</option>
            <option>Nurse</option>
          </select>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5"
  },
  box: {
    background: "#fff",
    padding: 40,
    borderRadius: 10,
    boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
    minWidth: 320
  },
  title: {
    marginBottom: 20,
    textAlign: "center"
  },
  inputGroup: {
    marginBottom: 15
  },
  label: {
    display: "block",
    marginBottom: 5,
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    border: "1px solid #ccc"
  },
  select: {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    border: "none",
    background: "#4caf50",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center"
  }
};

export default Login;
