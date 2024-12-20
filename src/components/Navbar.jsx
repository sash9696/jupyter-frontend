import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion"; // For animations

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div style={navbarStyles}>
      {/* Logo */}
      <div style={logoContainerStyles}>
        <Link to="/" style={logoTextStyles}>
          Jupyter App
        </Link>
      </div>

      {/* Navigation Links */}
      <div style={navLinksStyles}>
        {isAuthenticated && (
          <Link to="/notebooks" style={linkStyles}>
            Notebooks
          </Link>
        )}
        <Link to="/contact-us" style={linkStyles}>
          Contact Us
        </Link>

        {/* Manage Profile Link */}
        {isAuthenticated && (
          <Link to="/manage-profile" style={linkStyles}>
            Manage Profile
          </Link>
        )}
         {isAuthenticated && (
          <Link to="/chat" style={linkStyles}>
            CodeBot
          </Link>
        )}

        {/* Show logout button only if user is authenticated */}
        {isAuthenticated && (
          <motion.button
            onClick={logout}
            style={logoutButtonStyles}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Logout
          </motion.button>
        )}
      </div>
    </div>
  );
};

// Inline styles for Navbar
const navbarStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  padding: "15px 30px",
  background: "linear-gradient(135deg, #5C258D 0%, #4389A2 100%)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1000,
};

const logoContainerStyles = {
  display: "flex",
  alignItems: "center",
};

const logoTextStyles = {
  color: "white",
  fontSize: "2rem",
  fontWeight: "600",
  margin: 0,
  textDecoration: "none", // Remove underline from the link
  transition: "color 0.3s ease",
};

const navLinksStyles = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const linkStyles = {
  color: "white",
  textDecoration: "none",
  fontSize: "1.2rem",
  fontWeight: "500",
  transition: "color 0.3s ease",
};

const logoutButtonStyles = {
  backgroundColor: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default Navbar;
