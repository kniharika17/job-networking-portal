import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/JobsPage.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (location.state?.job) {
      setJob(location.state.job);
    } else {
      const fallbackJobs = JSON.parse(localStorage.getItem("jobs")) || [];
      const found = fallbackJobs.find((j) => j.id === parseInt(id));
      setJob(found);
    }
  }, [navigate, location, id]);

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to apply.");
      return;
    }

    const cleanJob = {
      jobId: job.id, // 👈 backend expects jobId
      title: job.title,
      company: job.company,
      location: job.location
    };

    try {
      const res = await fetch("http://localhost:5050/api/applications/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(cleanJob)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to apply.");
        return;
      }

      // ✅ Store in localStorage
      const stored = JSON.parse(localStorage.getItem("appliedJobs")) || [];
      const alreadyExists = stored.some((j) => j.jobId === cleanJob.jobId);
      if (!alreadyExists) {
        stored.push(cleanJob);
        localStorage.setItem("appliedJobs", JSON.stringify(stored));
      }

      alert("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while applying.");
    }
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-card" style={{ margin: "20px" }}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> This is a detailed view of the job.</p>
      <button className="apply-button" onClick={handleApply}>
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
