// client/src/pages/JobsPage.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/JobsPage.css";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyJobs = [
        { jobId: 1, title: "Frontend Developer", company: "Google", location: "Hyderabad" },
        { jobId: 2, title: "Backend Developer", company: "Amazon", location: "Bangalore" },
        { jobId: 3, title: "Data Analyst", company: "MathCo", location: "Chennai" },
        { jobId: 4, title: "AI/ML Intern", company: "NVIDIA", location: "Pune" },
        { jobId: 5, title: "Full Stack Developer", company: "TCS", location: "Noida" },
        { jobId: 6, title: "Cloud Engineer", company: "Microsoft", location: "Mumbai" }
      ];
      
    setJobs(dummyJobs);
    localStorage.setItem("jobs", JSON.stringify(dummyJobs)); // for JobDetails fallback
  }, []);

  const handleApply = async (e, job) => {
    e.stopPropagation(); // ✅ prevent parent div click
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login or signup to apply for jobs.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5050/api/applications/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(job)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to apply");
        return;
      }

      alert("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("An error occurred while applying.");
    }
  };

  const handleJobClick = (job) => {
    navigate(`/jobs/${job.jobId}`, { state: { job } });

  };

  return (
    <div className="jobs-page">
      <h2>Available Job Listings</h2>
      {jobs.map((job) => (
        <div
          key={job.id}
          className="job-card"
          style={{ cursor: "pointer" }}
          onClick={() => handleJobClick(job)}
        >
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <button
            onClick={(e) => handleApply(e, job)}
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
