import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hospitalImage from "../assets/hospital.png"; // doctor icon

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false); // toggle login/signup
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    occupation: "Doctor",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      // Signup logic (validation, backend API call)
      if (form.password !== form.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Signed up as ${form.occupation}: ${form.username}`);
    } else {
      // Login logic (authentication, JWT, etc.)
      navigate("/patient-list");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-teal-600 flex justify-center items-center">
        <div className="bg-white p-16 rounded shadow-lg w-3/4 ml-8">
          <h1 className="text-4xl font-bold mb-6 text-center text-teal-600">
            {isSignup ? "SIGN UP" : "HOSPITAL LOGIN"}
          </h1>
          <form className="w-full" onSubmit={handleSubmit}>
            <label className="block mb-2 font-semibold">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              required
            />

            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              required
            />

            {isSignup && (
              <>
                <label className="block mb-2 font-semibold">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                  required
                />
              </>
            )}

            <label className="block mb-2 font-semibold">Occupation</label>
            <select
              value={form.occupation}
              onChange={(e) => setForm({ ...form, occupation: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
            >
              <option>Doctor</option>
              <option>Nurse</option>
              <option>Admin</option>
            </select>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 mb-4"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="text-center text-sm text-teal-600">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  className="underline"
                  onClick={() => setIsSignup(false)}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  className="underline"
                  onClick={() => setIsSignup(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {!isSignup && (
            <div className="text-center mt-2 text-sm">
              <button className="underline text-teal-600">Forgot Password?</button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex justify-center items-center">
        <img
          src={hospitalImage}
          alt="Doctor Illustration"
          className="w-200 h-200"
        />
      </div>
    </div>
  );
};

export default Login;
