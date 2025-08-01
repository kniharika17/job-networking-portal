// client/src/pages/JobDetails.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyJobs = [
  { id: 1, title: "Frontend Developer", company: "Google", location: "Hyderabad", description: "Build UI using React." },
  { id: 2, title: "Backend Developer", company: "Amazon", location: "Bangalore", description: "Develop APIs using Node.js." },
  { id: 3, title: "Data Analyst", company: "MathCo", location: "Chennai", description: "Analyze data with Python and SQL." }
];

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const selected = dummyJobs.find((j) => j.id === parseInt(id));
    setJob(selected);
  }, [id]);

  const handleApply = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login or signup to apply.");
      navigate("/login");
      return;
    }

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

  if (!job) return <p>Loading job details...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <button onClick={handleApply} className="apply-button">Apply</button>
    </div>
  );
};

export default JobDetails;
