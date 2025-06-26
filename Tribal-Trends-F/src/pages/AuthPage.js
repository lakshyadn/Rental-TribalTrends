import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../css/AuthPage.css';

const AuthPage = ({ handleSignInSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate(); // Fixed useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      if (isSignUp) {
        await axios.post('http://localhost:5000/api/signup', userData);
        alert('User registered successfully');
        navigate('/signin'); // Fixed navigation
      } else {
        const response = await axios.post('http://localhost:5000/api/signin', { email, password });
        const { user } = response.data;
        handleSignInSuccess(user); 
        alert('Sign in successful');
        navigate('/home'); // Fixed navigation
      }
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred during authentication');
    }

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleFormSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
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
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
          <p>{isSignUp ? 'Already have an Account?' : "Don't have an Account?"}</p>
          <Link to="#" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Link>
          {!isSignUp && <Link to="/reset">Forgot Password?</Link>}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
