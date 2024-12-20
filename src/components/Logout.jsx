import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth(); // Get logout function from AuthContext
  const navigate = useNavigate(); // Use navigate to redirect the user after logout

  const handleLogout = () => {
    logout(); // Perform logout operation
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <button onClick={handleLogout} style={logoutButtonStyles}>
      Logout
    </button>
  );
};

// Inline styles for the logout button
const logoutButtonStyles = {
  backgroundColor: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "1rem",
  marginTop: "20px",
};

export default LogoutButton;
