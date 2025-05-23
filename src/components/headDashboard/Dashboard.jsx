import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // React Router hooks for navigation and state access
import "./Dashboard.css";
import HeadProfile from "../../pages/head/HeadProfilePage"; // Head profile component
import FamilyMembers from "../../pages/familyMembers/FamilyMembers"; // Family members listing component
import Homepage from "../../pages/home/Homepage";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Used for programmatic navigation

  // Retrieve phone number from location state or localStorage
  const phoneNumber =
    location.state?.phoneNumber || localStorage.getItem("phoneNumber");

  // State variables for loading, error, and fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  // Store phone number in localStorage for persistence
  if (phoneNumber) {
    localStorage.setItem("phoneNumber", phoneNumber);
  }

  // Sidebar navigation state
  const [activePage, setActivePage] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to render the main content based on active page
  const renderPageContent = () => {
    switch (activePage) {
      case "Home":
        return <Homepage />;
      case "Profile":
        return <HeadProfile />;
      case "Members":
        return <FamilyMembers phoneNumber={phoneNumber} />;
      default:
        return (
          <div className="page-content">Select a page from the sidebar.</div>
        );
    }
  };

  // Fetch user profile data using phone number on component mount
  useEffect(() => {
    if (!phoneNumber) {
      setError("Phone number is missing.");
      setLoading(false);
      return;
    }

    const fetchProfile = async (phoneNumber) => {
      try {
        const response = await fetch(
          `https://the-samaj-project-login.onrender.com/apidashboard/family_profile/${phoneNumber}/`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result); // Store result in state
      } catch (err) {
        setError(err.message); // Set error state if any
      } finally {
        setLoading(false); // Set loading to false after request finishes
      }
    };

    fetchProfile(phoneNumber);
  }, [phoneNumber]);

  // Handle sidebar navigation click
  const handleNavClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false); // Close sidebar on navigation
  };

  // 🔐 Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("phoneNumber"); // Clear session
    navigate("/"); // Redirect to login/home page
  };

  return (
    <div className="dashboard-container">
      {/* ☰ Hamburger menu for smaller screens */}
      <button
        className="hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* 🧭 Sidebar navigation */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="menu-title">Menu</h2>

        {/* 🏠 Home Page Button */}
        <button
          className={`sidebar-button ${activePage === "Home" ? "active" : ""}`}
          onClick={() => handleNavClick("Home")}
        >
          Home
        </button>

        {/* 🙍‍♂️ Profile Page Button */}
        <button
          className={`sidebar-button ${activePage === "Profile" ? "active" : ""}`}
          onClick={() => handleNavClick("Profile")}
        >
          Profile
        </button>

        {/* 👪 Members Page Button */}
        <button
          className={`sidebar-button ${activePage === "Members" ? "active" : ""}`}
          onClick={() => handleNavClick("Members")}
        >
          Members
        </button>

        {/* 🚪 Logout Button */}
        <button className="sidebar-button logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* 📄 Main content area */}
      <div className="main-content">
        <header className="topbar"></header>
        <main className="content-area">{renderPageContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
