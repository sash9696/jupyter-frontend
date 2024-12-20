import React, { useState } from "react";
import { motion } from "framer-motion"; // Importing Framer Motion for animations
import "./Auth.css"; // Importing the CSS for styling

const Auth = ({ onSubmit }) => {
  // State to toggle between Sign Up and Login
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for guest login

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, username, password });
  };

  // Handle Guest Login
  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate guest login action (you can handle this in your context)
      onSubmit({ email: "guest@example.com", username: "guest", password: "guest" });
      setIsLoading(false);
    }, 2000); // Simulate a 2-second delay for guest login
  };

  return (
    <div className="auth-form-container">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
       <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          {isSignUp ? "Sign Up" : "Login"}
        </button>
      </form>

      {/* Guest Login Button */}
      <br></br>
      <motion.button
        className="auth-button guest-button"
        onClick={handleGuestLogin}
        whileHover={{ scale: 1.05 }} // Slight hover animation for the button
        whileTap={{ scale: 0.95 }}  // Slight tap animation for the button
        transition={{ duration: 0.2 }}
      >
        Guest Login
      </motion.button>

      {/* Show loading animation when logging in as a guest */}
      {isLoading && (
        <motion.div
          style={loaderContainerStyles}
          initial={{ opacity: 0 }} // Start with the loader hidden
          animate={{ opacity: 1 }} // Fade in the loader
          exit={{ opacity: 0 }} // Fade out the loader when it's not needed
          transition={{ duration: 0.5 }}
        >
          <motion.div
            style={loaderStyles}
            animate={{
              rotate: 360, // Spinner rotates 360 degrees
            }}
            transition={{
              repeat: Infinity, // Infinite loop
              repeatType: "loop",
              duration: 1, // One full rotation every second
            }}
          />
          <motion.p
            style={loadingTextStyles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }} // Delay for text to fade in after the loader
          >
            Logging in as Guest...
          </motion.p>
        </motion.div>
      )}

      <p className="toggle-action">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

// Inline Styles for Loader (same as before)
const loaderContainerStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const loaderStyles = {
  border: "8px solid #f3f3f3", /* Light gray */
  borderTop: "8px solid #5C258D", /* Purple */
  borderRadius: "50%",
  width: "50px",
  height: "50px",
};

const loadingTextStyles = {
  marginTop: "10px",
  fontSize: "1.2rem",
  fontWeight: "600",
  color: "#fff",
};

export default Auth;
