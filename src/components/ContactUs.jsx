import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { useNavigate } from "react-router-dom"; // For potential navigation

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a form submission
    setTimeout(() => {
      alert("Message Sent Successfully!");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" }); // Clear the form
    }, 2000);
  };

  return (
    <div style={contactPageStyles}>
      <motion.div
        style={bannerStyles}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
      >
        <h1 style={bannerHeadingStyles}>Contact Us</h1>
        <p style={bannerSubheadingStyles}>
          We would love to hear from you! Drop us a message and we'll get back
          to you soon.
        </p>
      </motion.div>

      {/* Contact Form */}
      <div style={formSectionStyles}>
        <motion.form
          style={formStyles}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            style={inputGroupStyles}
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label style={labelStyles}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={inputStyles}
              required
            />
          </motion.div>

          <motion.div
            style={inputGroupStyles}
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label style={labelStyles}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyles}
              required
            />
          </motion.div>

          <motion.div
            style={inputGroupStyles}
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label style={labelStyles}>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              style={textareaStyles}
              required
            ></textarea>
          </motion.div>

          <motion.button
            type="submit"
            style={submitButtonStyles}
            disabled={isSubmitting}
            initial={{ scale: 1 }}
            animate={{ scale: isSubmitting ? 0.95 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
};

// Inline Styles

const contactPageStyles = {
  fontFamily: "'Roboto', sans-serif",
  background: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)", // Pink gradient background
  color: "white",
  minHeight: "100vh",
  paddingTop: "60px",
  overflow: "hidden",
  textAlign: "center",
};

const bannerStyles = {
  background: "linear-gradient(135deg, #5C258D 0%, #4389A2 100%)", // Banner Gradient
  padding: "60px 0",
  marginBottom: "60px",
  borderRadius: "15px 15px 0 0",
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

const formSectionStyles = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "40px",
  backgroundColor: "#ffffff",
  borderRadius: "15px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  width: "100%", // Ensure the form takes up the full width on smaller screens
};

const formStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const inputGroupStyles = {
  display: "flex",
  flexDirection: "column",
};

const labelStyles = {
  fontSize: "1.1rem",
  fontWeight: "600",
  color: "#333",
  marginBottom: "10px",
  textAlign: "left",
};

const inputStyles = {
  padding: "12px",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
};

const textareaStyles = {
  padding: "12px",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  height: "150px",
  resize: "none",
};

const submitButtonStyles = {
  padding: "15px 25px",
  backgroundColor: "#5C258D",
  border: "none",
  color: "white",
  fontSize: "1.2rem",
  fontWeight: "600",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

export default ContactPage;
