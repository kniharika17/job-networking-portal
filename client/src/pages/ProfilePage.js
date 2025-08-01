// client/src/pages/ProfilePage.js
import React from "react";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  // Dummy profile info (optional fallback if localStorage lacks token-based fetch)
  const user = JSON.parse(localStorage.getItem("profile")) || {};

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email || "N/A"}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
