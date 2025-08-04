// client/src/components/LoginForm.js
import "../styles/LoginForm.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  //const [token, setToken] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setProfile(null);
  
    try {
      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
  
      const data = await res.json();
      console.log("Login response:", data);
  
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      if (data.token) {
        console.log("Setting token:", data.token);
        localStorage.setItem("token", data.token);
        fetchProfile(data.token);
        const oldLocalJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

if (oldLocalJobs.length > 0) {
  oldLocalJobs.forEach(async (job) => {
    try {
      const res = await fetch("http://localhost:5050/api/applications/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`
        },
        body: JSON.stringify(job)
      });

      const resData = await res.json();
      if (res.ok) {
        console.log(`✅ Synced old application: ${job.title}`);
      } else {
        console.log(`⚠️ Already exists or failed: ${job.title}`, resData.message);
      }
    } catch (err) {
      console.error("Error syncing old job:", job.title, err.message);
    }
  });

  // Optional: Clear after syncing
  localStorage.removeItem("appliedJobs");
}




      } else {
        throw new Error("No token received from server.");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  


  const fetchProfile = async (jwtToken) => {
    console.log("Fetching profile with token:", jwtToken);

    try {
      const res = await fetch("http://localhost:5050/api/user/profile", {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch profile");
      }

      setProfile(data);
      localStorage.setItem("profile", JSON.stringify(data));
      navigate("/profile");
    } catch (err) {
      console.error("Profile fetch failed:", err.message); // ✅ show error
      setError(err.message);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {!profile && (
  <form onSubmit={handleLogin}>
    <input
      name="email"
      type="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
      required
    />
    <br />
    <input
      name="password"
      type="password"
      placeholder="Password"
      value={formData.password}
      onChange={handleChange}
      required
    />
    <br />
    <button type="submit">Login</button>
  </form>
)}


      {error && <p style={{ color: "red" }}>{error}</p>}

      {profile && (
        <div>
          <h3>Welcome, {profile.name}!</h3>
          <p>Email: {profile.email}</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
