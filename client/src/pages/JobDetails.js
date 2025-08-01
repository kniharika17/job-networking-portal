import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Details</h2>
      <p>This is a protected page for Job ID: {id}</p>
      <p>[Here you can show full job description, requirements, and Apply button]</p>
    </div>
  );
};

export default JobDetails;
