import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/loginPage/LoginPage";
import Dashboard from "./components/headDashboard/Dashboard";
import MemberDashboard from "./components/memberDashboard/Dashboard";
import SignupPage from "./pages/signupPage/SignUpPage";
import MemberSignUp from "./pages/signupForms/memberSignup/MemberSignUp";
import HeadSignup from "./pages/signupForms/headSignup/HeadSignup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="member-signup" element={<MemberSignUp />} />
        <Route path="head-signup" element= {< HeadSignup/>} />
        <Route path="/head-dashboard" element={<Dashboard />} />
        <Route path="/member-profile" element={<MemberDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
