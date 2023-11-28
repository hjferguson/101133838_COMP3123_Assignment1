import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import GuestHomePage from './components/GuestHomePage/GuestHomePage';
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
      <Routes>
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<GuestHomePage />} />

      </Routes>
    </Router>
  );
}

export default App;
