import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [serverMessage, setServerMessage] = useState(''); // State for server response message
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //allows for async
    
    try{
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
        localStorage.setItem('token', result.token);
        navigate('/home');
      } else {
        // It's often useful to log the entire response for debugging
        console.error('Response error:', response);
      
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
      setServerMessage('Sign in failed. Please try again later. :c');
    }
  };

  return (
    <div>
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
