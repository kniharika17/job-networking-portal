import React, { useEffect, useState } from "react";
import "../styles/MyApplicationsPage.css";

const MyApplicationsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view your applications.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5050/api/applications/my", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch.");

        setAppliedJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="applications-page">
      <h2>My Applications</h2>
      {loading && <p>Loading applications...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && appliedJobs.length === 0 && (
        <p>You haven't applied for any jobs yet.</p>
      )}
      <ul>
        {appliedJobs.map((job) => (
          <li key={job._id}>
            <strong>{job.title}</strong> at {job.company} ({job.location})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyApplicationsPage;
