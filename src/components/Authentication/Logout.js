import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    // Redirect user to LandingPage component.
    navigate('/');
    window.location.reload();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
