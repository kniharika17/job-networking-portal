import React, { useState } from 'react';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5050/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Signup successful!');
        console.log(data);
        // Optionally: redirect or clear form
      } else {
        alert(data.message || 'Signup failed!');
      }
    } catch (err) {
      alert('Error connecting to server.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
