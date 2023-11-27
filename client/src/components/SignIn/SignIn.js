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
    event.preventDefault();
    // Send formData to your backend to register the user
    // Example:
    // const response = await fetch('/api/signup', { method: 'POST', body: JSON.stringify(formData) });
    // const result = await response.json();
    // setServerMessage(result.message);
    // if (response.ok) navigate('/login');
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
