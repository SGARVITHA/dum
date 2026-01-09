import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Stethoscope, ShieldCheck, Activity, Users } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock authentication success
    navigate("/patients");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-teal-600 to-emerald-500 text-white p-12">

        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Sepsis Watch</h1>
            <p className="text-sm opacity-90">Early Screening System</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Early Detection<br />Saves Lives
          </h2>
          <p className="text-lg opacity-95 max-w-md">
            Rule-based sepsis screening for non-ICU hospital wards.
            Monitor vital trends, receive timely alerts, and take
            action before it’s too late.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FeatureCard icon={<ShieldCheck />} title="Safety-First" subtitle="Transparent alerting" />
          <FeatureCard icon={<Activity />} title="Trend Analysis" subtitle="Visual progression" />
          <FeatureCard icon={<Users />} title="Team Aware" subtitle="Full audit trail" />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">

          <h2 className="text-2xl font-semibold mb-2">
            {isSignup ? "Create Account" : "Sign In"}
          </h2>
          <p className="text-gray-600 mb-8">
            {isSignup
              ? "Register to access the screening system"
              : "Enter your credentials to continue"}
          </p>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Email ID
              </label>
              <input
                type="email"
                required
                placeholder="doctor@hospital.org"
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-3
                           focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Role (still required for audit) */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Role
              </label>
              <select
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-white
                           focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select your role</option>
                <option>Doctor</option>
                <option>Nurse</option>
                <option>Resident</option>
                <option>Intern</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700
                         text-white font-semibold py-3 rounded-lg transition"
            >
              {isSignup ? "Sign Up" : "Sign In to System"}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            {isSignup ? "Already have an account?" : "New to the system?"}{" "}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-teal-600 font-medium hover:underline"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>

          <p className="text-xs text-gray-500 mt-4 text-center">
            For authorized hospital personnel only. All actions are logged for audit purposes.
          </p>

        </div>
      </div>
    </div>
  );
}

/* Feature Card */
function FeatureCard({ icon, title, subtitle }) {
  return (
    <div className="bg-white/15 backdrop-blur-md rounded-xl p-4">
      <div className="mb-3">{icon}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm opacity-90">{subtitle}</p>
    </div>
  );
}
