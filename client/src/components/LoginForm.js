// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
