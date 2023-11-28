import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import GuestHomePage from './components/GuestHomePage/GuestHomePage';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectRoutes from './components/ProtectRoutes';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <Routes>
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn setAuthStatus={setIsAuthenticated} />} />
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <GuestHomePage />} /> {/*Turnary if user logged or not*/}
        {/*use ProtectRoutes if route requires auth to access*/}


      </Routes>
    </Router>
  );
}

export default App;
