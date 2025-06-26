import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Fixed navigation

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/signup', { name, email, password });
      alert('User registered successfully');
      navigate('/signin'); // Fixed navigation
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred during registration');
    }

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="contact-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p>Already have an Account?</p>
        <Link to="/signin">Sign In</Link>
      </form>
    </div>
  );
};

export default SignUpForm;
