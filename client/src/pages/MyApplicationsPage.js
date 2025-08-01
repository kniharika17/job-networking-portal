import React, { useEffect, useState } from "react";
import "../styles/MyApplicationsPage.css";

const MyApplicationsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("appliedJobs");
    const parsed = stored ? JSON.parse(stored) : [];
    setAppliedJobs(parsed);
  }, []);

  return (
    <div className="applications-page">
      <h2>My Applications</h2>
      {appliedJobs.length === 0 ? (
        <p>You haven't applied for any jobs yet.</p>
      ) : (
        <ul>
          {appliedJobs.map((job, index) => (
            <li key={index}>
              <strong>{job.title}</strong> at {job.company} ({job.location})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplicationsPage;
