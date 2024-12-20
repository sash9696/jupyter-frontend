import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ManageProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // States for storing profile information
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  // Handle the form submission to update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (username && password) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      setMessage("Profile updated successfully!");
    } else {
      setMessage("Please fill out both fields.");
    }
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    // Clear user data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    setMessage("Account deleted successfully!");

    // Optionally log the user out
    logout();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div style={{
      marginTop:'200px',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'

    }} className="manage-profile-container">
      <h2>Manage Your Profile</h2>

      {/* Display any success/error messages */}
      {message && <p>{message}</p>}

      <form onSubmit={handleProfileUpdate}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br></br>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>

        <button type="submit">Update Profile</button>
      </form>

      {/* Button to delete account */}
      <button onClick={handleDeleteAccount} style={{ marginTop: "20px", backgroundColor: "red", color: "white" }}>
        Delete Account
      </button>
    </div>
  );
};

export default ManageProfile;
