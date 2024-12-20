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

// Inline styles for the logout button fixed at top-right corner
const logoutButtonStyles = {
  position: "fixed",
  top: "20px",
  right: "20px",
  backgroundColor: "#4caf50", // Matching the green color from AuthForm theme
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "12px 20px",
  cursor: "pointer",
  fontSize: "1rem",
  zIndex: "100", // Ensure it stays above other content
  transition: "background-color 0.3s ease",
};

export default LogoutButton;
