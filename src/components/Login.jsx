import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook for managing authentication state
import { motion } from "framer-motion"; // Import framer-motion
import Auth from "./Auth/Auth"; // Import the Auth component

const Login = () => {
  const { login } = useAuth(); // Use the login function from AuthContext
  const navigate = useNavigate(); // Use navigate to redirect the user after login

  // State to handle the loading process
  const [isLoading, setIsLoading] = useState(false);

  // Generate token based on username (imitating token generation)
  const generateToken = (username) => {
    // Simplified token generation: username + a fixed string (can be enhanced)
    return username + "12345"; // Modify to suit your needs
  };

  // Handle form submission (pass data to backend or context)
  const handleFormSubmit = (formData) => {
    console.log("Form Data:", formData);

    setIsLoading(true); // Start the loading animation

    // Simulate login action (replace with actual backend call)
    setTimeout(() => {
      // Example: Use `formData` for actual authentication logic
      login(formData); // Simulated login function, replace with actual API call

      // Generate token for the user
      const token = generateToken(formData.username); // Assume `formData.username` contains the username

      // Store the token in localStorage
      localStorage.setItem("auth_token", token);
      localStorage.setItem("username", formData.username);

      console.log('auth_token',token)
      // Redirect to JupyterHub with the token in the URL
      // window.location.href = `http://localhost:8000?token=${token}`; // Redirect with token

      setIsLoading(false); // Stop the loader after login simulation
      // navigate("/"); // Optionally, you can navigate to a different page in your app
    }, 2000); // Simulating a 2-second delay for login process
  };

  return (
    <div className="login-container" style={loginContainerStyles}>
      {/* Auth form component */}
      <Auth onSubmit={handleFormSubmit} />

      {/* Show loader when logging in */}
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
            Logging in...
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

// Inline Styles for Login and Loader
const loginContainerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
  padding: "20px",
};

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

export default Login;
