import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton"; // Import LogoutButton
import { motion } from "framer-motion"; // Import framer-motion for animations

const HomePage = () => {
  const { isAuthenticated } = useAuth(); // Get authentication status
  const navigate = useNavigate(); // Use navigate to redirect user after logout

  return (
    <div style={homePageStyles}>
      {/* Logout Button */}
      {isAuthenticated && <LogoutButton />}

      {/* Banner Section */}
      <div style={bannerStyles}>
        <motion.div
          style={bannerTextStyles}
          animate={{ y: [-10, 10, -10] }} // Floating animation effect
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
        >
          <h1 style={bannerHeadingStyles}>Welcome to Jupyter Notebooks App</h1>
          <p style={bannerSubheadingStyles}>
            Unlock the power of Data Science, Machine Learning, and Education.
          </p>
        </motion.div>
      </div>

      {/* Features Section */}
      <div style={featuresSectionStyles}>
        <h2 style={sectionHeadingStyles}>What You Can Do</h2>
        <div style={featureItemContainerStyles}>
          <motion.div
            style={featureCardStyles}
            animate={{
              y: [0, -10, 0], // Animated "up and down" motion
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <FeatureCard
              title="Data Visualization"
              description="Visualize your data with interactive and beautiful charts."
              icon="📊"
            />
          </motion.div>

          <motion.div
            style={featureCardStyles}
            animate={{
              y: [0, -10, 0], // Animated "up and down" motion
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <FeatureCard
              title="Machine Learning"
              description="Build and deploy ML models directly from your notebook."
              icon="🤖"
            />
          </motion.div>

          <motion.div
            style={featureCardStyles}
            animate={{
              y: [0, -10, 0], // Animated "up and down" motion
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <FeatureCard
              title="Education"
              description="Learn and teach Data Science with interactive examples."
              icon="📚"
            />
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <div style={aboutSectionStyles}>
        <h2 style={aboutHeadingStyles}>About the App</h2>
        <p style={aboutTextStyles}>
          Our app integrates Jupyter notebooks for seamless data science,
          machine learning, and educational purposes. Whether you are analyzing
          datasets, training models, or building a project, this platform
          empowers you to do more.
        </p>
      </div>
    </div>
  );
};

// Inline Styles

const homePageStyles = {
  fontFamily: "'Roboto', sans-serif",
  background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)", // Pink gradient background
  color: "white",
  minHeight: "100vh",
  paddingTop: "60px",
  overflow: "hidden",
  textAlign: "center",
  marginTop:'50px'
};

const bannerStyles = {
  background: "linear-gradient(135deg, #5C258D 0%, #4389A2 100%)", // Banner Gradient
  padding: "60px 0",
  marginBottom: "60px",
  borderRadius: "15px 15px 0 0",
};

const bannerTextStyles = {
  color: "white",
  maxWidth: "800px",
  margin: "0 auto",
};

const bannerHeadingStyles = {
  fontSize: "3rem",
  fontWeight: "700",
  marginBottom: "20px",
  textTransform: "uppercase",
};

const bannerSubheadingStyles = {
  fontSize: "1.5rem",
  fontWeight: "400",
  marginBottom: "40px",
  opacity: "0.8",
};

const sectionHeadingStyles = {
  fontSize: "2.5rem",
  fontWeight: "600",
  color: "#333",
  marginBottom: "40px",
  textTransform: "uppercase",
};

const featuresSectionStyles = {
  backgroundColor: "#f9f9f9",
  padding: "40px 0",
};

const featureItemContainerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  flexWrap: "wrap", // Ensure cards wrap to new lines when necessary
  marginTop: "30px",
};

const featureCardStyles = {
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  width: "280px",
  padding: "25px",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  marginBottom: "20px", // Prevent overlap by giving space below each card
};

const cardStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const featureIconStyles = {
  fontSize: "3rem",
  marginBottom: "20px",
};

const featureHeadingStyles = {
  fontSize: "1.6rem",
  fontWeight: "600",
  color: "#333",
  marginBottom: "10px",
};

const featureDescriptionStyles = {
  fontSize: "1rem",
  opacity: "0.7",
};

const aboutSectionStyles = {
  padding: "50px 20px",
  backgroundColor: "#f4f7f6",
  borderRadius: "12px",
  marginTop: "60px",
};

const aboutHeadingStyles = {
  fontSize: "2rem",
  fontWeight: "600",
  marginBottom: "20px",
};

const aboutTextStyles = {
  fontSize: "1.2rem",
  opacity: "0.8",
  lineHeight: "1.8",
  color: "#333",
  maxWidth: "800px",
  margin: "0 auto",
};

// Feature Card Component
const FeatureCard = ({ title, description, icon }) => {
  return (
    <div style={featureCardStyles} className="feature-card">
      <div style={featureIconStyles}>{icon}</div>
      <h3 style={featureHeadingStyles}>{title}</h3>
      <p style={featureDescriptionStyles}>{description}</p>
    </div>
  );
};

export default HomePage;
