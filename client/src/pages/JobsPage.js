// client/src/pages/JobsPage.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/JobsPage.css";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate(); // ✅ Use inside component

  useEffect(() => {
    const dummyJobs = [
      { id: 1, title: "Frontend Developer", company: "Google", location: "Hyderabad" },
      { id: 2, title: "Backend Developer", company: "Amazon", location: "Bangalore" },
      { id: 3, title: "Data Analyst", company: "MathCo", location: "Chennai" }
    ];
    setJobs(dummyJobs);
  }, []);

  const handleApply = (job) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Please login or signup to apply for jobs.");
      navigate("/login");
      return;
    }
  
    // ✅ Save to localStorage
    const existing = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    const alreadyApplied = existing.find((j) => j.id === job.id);
  
    if (!alreadyApplied) {
      const updated = [...existing, job];
      localStorage.setItem("appliedJobs", JSON.stringify(updated));
      alert(`Applied to ${job.title} at ${job.company}!`);
    } else {
      alert("You have already applied for this job.");
    }
  };
  
  

  return (
    <div className="jobs-page">
      <h2>Available Job Listings</h2>
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <button
            onClick={() => handleApply(job)}
            className="apply-button"
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobsPage;
