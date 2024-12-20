import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./components/HomePage";
import ContactUs from "./components/ContactUs";
import NotebooksList from "./components/NotebooksList";
import Login from "./components/Login";
import LogoutButton from "./components/LogoutButton";
import Navbar from "./components/Navbar";
import ManageProfile from "./components/ManageProfile"; // Ensure the import is correct
import "./App.css";
import NotebookPage from "./components/NotebookPage";
import ChatPage from "./components/ChatPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar should be on every page */}
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/notebooks" element={<NotebooksList />} />
            <Route path="/notebook/:path" element={<NotebookPage />} />
            <Route path="/login" element={<LoginRedirect />} />
            <Route path="/manage-profile" element={<ManageProfile />} /> {/* Add manage profile route */}
            <Route path="/chat" element={<ChatPage />} /> {/* AI Chat Route */}

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

// Redirect to home if authenticated, else redirect to login
const HomeRedirect = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div>
        <LogoutButton />
        <HomePage />
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

// Redirect user from login page if they are authenticated
const LoginRedirect = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Login />;
};

export default App;
