import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Add useNavigate
import "./Dashboard.css";
import HeadProfile from "../../pages/member/MemberProfilePage";
import FamilyMembers from "../../pages/familyMembers/FamilyMembers";
import Homepage from "../../pages/home/Homepage";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const phoneNumber =
    location.state?.phoneNumber || localStorage.getItem("phoneNumber");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  if (phoneNumber) {
    localStorage.setItem("phoneNumber", phoneNumber);
  }

  console.log(phoneNumber)

  const [activePage, setActivePage] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile(phoneNumber);
  }, [phoneNumber]);

  const handleNavClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  // 🔐 Logout function
  const handleLogout = () => {
    localStorage.removeItem("phoneNumber");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      {/* Hamburger menu */}
      <button
        className="hamburger"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="menu-title">Menu</h2>
        <button
          className={`sidebar-button ${activePage === "Home" ? "active" : ""}`}
          onClick={() => handleNavClick("Home")}
        >
          Home
        </button>
        <button
          className={`sidebar-button ${
            activePage === "Profile" ? "active" : ""
          }`}
          onClick={() => handleNavClick("Profile")}
        >
          Profile
        </button>
        <button
          className={`sidebar-button ${
            activePage === "Members" ? "active" : ""
          }`}
          onClick={() => handleNavClick("Members")}
        >
          Members
        </button>

        {/* 🚪 Logout Button */}
        <button className="sidebar-button logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Section */}
      <div className="main-content">
        <header className="topbar"></header>
        <main className="content-area">{renderPageContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
