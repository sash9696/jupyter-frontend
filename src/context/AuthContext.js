import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component that will wrap your app and provide authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Default to null for loading state

  // Check localStorage on initial load to restore authentication state
  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState === "true") {
      setIsAuthenticated(true); // Restore login state from localStorage
    } else {
      setIsAuthenticated(false); // No valid auth state in localStorage
    }
  }, []); // Run this only once when the component mounts

  const login = () => {
    setIsAuthenticated(true); // Simulate logging in
    localStorage.setItem("isAuthenticated", "true"); // Persist login state
  };

  const logout = () => {
    setIsAuthenticated(false); // Simulate logging out
    localStorage.removeItem("isAuthenticated"); // Remove the auth state from localStorage
  };

  // Loading state when `isAuthenticated` is still `null`
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // You can replace this with a loader or splash screen
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
