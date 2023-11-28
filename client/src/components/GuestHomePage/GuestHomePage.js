import React from 'react';
import { Link } from 'react-router-dom';
import './GuestHomePage.css'; 

function GuestHomePage() {
  return (
    <div className="guest-homepage">
      <h1>Welcome to Our Application!</h1>
      <p>Discover the features and benefits of using our app.</p>

      <div className="actions">
        <Link to="/signin" className="btn">Sign In</Link>
        <Link to="/signup" className="btn">Sign Up</Link>
      </div>

      {/* You can add more content here such as features, testimonials, etc. */}
    </div>
  );
}

export default GuestHomePage;
