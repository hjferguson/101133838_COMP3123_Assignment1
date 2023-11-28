import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn({ setAuthStatus }) { // Accept setAuthStatus as a prop
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate();

  // Handle changes in form inputs
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Send sign-in request to the server
      const response = await fetch('http://localhost:3000/api/v2/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setServerMessage(result.message);

      if (response.ok) {
        // On successful sign-in
        localStorage.setItem('token', result.token); // Store the JWT token
        setAuthStatus(true); // Update authentication status
        navigate('/'); // Navigate to the dashboard or home
      } else {
        // Handle errors based on the status code
        if(response.status === 401) {
          setServerMessage('Authentication failed. Please check your credentials.');
        } else if(response.status === 500) {
          setServerMessage('Server error. Please try again later.');
        } else {
          setServerMessage('An unexpected error occurred. Please try again.');
        }
      }
    } catch (error) {
      console.error('Sign in failed: ', error);
      setServerMessage('Sign in failed. Please try again later.');
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {serverMessage && <div className="server-message">{serverMessage}</div>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
