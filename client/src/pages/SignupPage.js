import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5050/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate('/login');
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name}
               onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email}
               onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
               onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
