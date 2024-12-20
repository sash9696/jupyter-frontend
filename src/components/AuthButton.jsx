import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Reusable button to handle login and logout
const AuthButton = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/notebooks"); // Redirect to the Notebooks page after login
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the Home page after logout
  };

  return (
    <div className="auth-button-container">
      {!isAuthenticated ? (
        // <button onClick={handleLogin}>Log in</button>
        <span></span>
      ) : (
        <button onClick={handleLogout}>Log out</button>
      )}
    </div>
  );
};

export default AuthButton;
