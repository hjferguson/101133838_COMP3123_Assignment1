import React from 'react';
//import { Link } from 'react-router-dom';
import './GuestHomePage.css'; 

function GuestHomePage() {
  return (
    <div className="guest-homepage">
      <h1>Welcome to Fullstack Assignment 2!</h1>
      <h2>COMP3123</h2>
      <p>Written by Harlan Ferguson - 101133838</p>
      <p>Please create a new user using the sign up button in the navbar</p>
      <p>Then, once signed in with that user, you can CRUD employees</p>
      <p>Additionally, there is an employee dashboard, that gives stats on the current employees</p>

      
      {/* You can add more content here such as features, testimonials, etc. */}
    </div>
  );
}

export default GuestHomePage;
