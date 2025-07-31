// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:5050/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => {
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [navigate]);

  return user ? (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ProfilePage;
