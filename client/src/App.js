import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const toggleLogin = () => { // Temporary function to test authentication
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <button onClick={toggleLogin}>Toggle Login State</button> {/* Temporary button */}
      {/* Other components and routes */}
    </Router>
  );
}


export default App;
