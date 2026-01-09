import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("token", "mock-jwt");
    localStorage.setItem("doctorName", "Dr. Smith");
    navigate("/patients");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Doctor / Nurse Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
