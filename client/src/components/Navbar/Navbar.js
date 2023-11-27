import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isAuthenticated, onLogout }) {  
  return (
    <nav>
      <NavLink to="/" exact activeClassName="active-link">Home</NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to="/employees" activeClassName="active-link">Employees</NavLink>
          <button onClick={onLogout}>Logout</button>  
        </>
      ) : (
        <>
          <NavLink to="/signup" activeClassName="active-link">Sign Up</NavLink>
          <NavLink to="/signin" activeClassName="active-link">Sign In</NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;
