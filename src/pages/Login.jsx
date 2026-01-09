import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("Doctor"); // default occupation

  const handleLogin = () => {
    if (!name || !password) {
      return alert("Please fill all fields");
    }
    // save user info if needed
    // Example: localStorage.setItem("user", JSON.stringify({ name, occupation }));
    navigate("/patients");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Vitalyn Login</h2>

        <div className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Occupation */}
          <select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Doctor</option>
            <option>Nurse</option>
            <option>Technician</option>
          </select>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>

        {/* Optional Signup link */}
        <p className="mt-4 text-center text-gray-500 text-sm">
          Don't have an account? <span className="text-blue-600 cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
