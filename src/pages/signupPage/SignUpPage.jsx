import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Prefill phone number if passed from previous route
  const prefilledPhone = location.state?.phoneNumber || "";

  // Form state to store signup details
  const [form, setForm] = useState({
    phoneNumber: prefilledPhone,
    fullName: "",
    samajName: "",
    role: "",
    familySize: "",
  });

  // Step control: 1 (role select), "headForm", 2 (member form)
  const [step, setStep] = useState(1);

  // Dropdown and Samaj list state
  const [samajList, setSamajList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Generic handler for input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle role selection step
  const handleFirstStepRoleSelection = (role) => {
    setForm({ ...form, role });

    // Navigate based on role
    if (role === "head") {
      setStep("headForm"); // Go to head-specific form
    } else {
      setStep(2); // Go to member-specific form
    }
  };

  // Submit handler for head of family
  const handleHeadFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.samajName || !form.familySize) {
      alert("Please fill in all fields");
      return;
    }

    const postData = {
      samaj: form.samajName,
      total_family_members: form.familySize,
    };

    try {
      const response = await fetch(
        "https://the-samaj-project-login.onrender.com/apidashboard/create_family/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      const result = await response.json();

      const familyId = result.id;

      // Handle API error response
      if (!response.ok) {
        alert(result.error || "Failed to create family");
        return;
      }

      // Save form data locally
      localStorage.setItem("signupData", JSON.stringify(form));

      // Navigate to head-signup page with family ID
      navigate("/head-signup", { state: { familyId,postData }  });
    } catch (error) {
      console.error("Error submitting head signup:", error);
      alert(
        "Something went wrong while creating the family. Please try again."
      );
    }
  };

  // Submit handler for member signup
  const handleSecondStepSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.phoneNumber || !form.fullName || !form.samajName) {
      alert("Please fill in all fields");
      return;
    }

    const memberData = {
      family_head_phone_number: form.phoneNumber,
      head_name: form.fullName,
      samaj_name: form.samajName,
    };

    // Save form data locally
    localStorage.setItem("signupData", JSON.stringify(form));

    // Navigate to member-signup page with form state
    navigate("/member-signup", { state: memberData });
  };

  // Fetch list of Samaj names on mount
  useEffect(() => {
    const fetchSamajList = async () => {
      try {
        const response = await fetch(
          "https://the-samaj-project-login.onrender.com/apidashboard/api_samaj"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setSamajList(data);
      } catch (error) {
        console.error("Error fetching Samaj names:", error);
      }
    };

    fetchSamajList();
  }, []);

  return (
    <div className="signup-page">
      <div className="background-overlay"></div>

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div className="glass-card">
          <h2>Sign Up</h2>
          <p>Select your role</p>
          <div className="button-group">
            <button onClick={() => handleFirstStepRoleSelection("head")}>
              Head
            </button>
            <button onClick={() => handleFirstStepRoleSelection("member")}>
              Member
            </button>
          </div>
        </div>
      )}

      {/* Step for Head of Family */}
      {step === "headForm" && (
        <div className="glass-card">
          <h2>Head Signup</h2>
          <form onSubmit={handleHeadFormSubmit}>
            <label>Samaj Name</label>
            <select
              name="samajName"
              value={form.samajName}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Samaj --</option>
              {samajList.map((samaj) => (
                <option key={samaj.id} value={samaj.samaj_name}>
                  {samaj.samaj_name}
                </option>
              ))}
            </select>

            <label>Family Size</label>
            <input
              type="number"
              name="familySize"
              value={form.familySize}
              onChange={handleChange}
              placeholder="Number of Family Members"
              min="1"
              required
            />
            <button type="submit">Next</button>
          </form>
        </div>
      )}

      {/* Step for Member Signup */}
      {step === 2 && (
        <div className="glass-card">
          <h2>Member Signup</h2>
          <form onSubmit={handleSecondStepSubmit}>
            <label> Head's Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="+91XXXXXXXXXX"
              required
            />

            <label> Head's Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your Full Name"
              required
            />

            <label>Samaj Name</label>
            <select
              name="samajName"
              value={form.samajName}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Samaj --</option>
              {samajList.map((samaj) => (
                <option key={samaj.id} value={samaj.samaj_name}>
                  {samaj.samaj_name}
                </option>
              ))}
            </select>
            {/* Dropdown for Samaj selection */}
            {showDropdown && (
              <ul className="dropdown-list">
                {samajList.map((samaj) => (
                  <li
                    key={samaj.id}
                    onClick={() => {
                      setForm({ ...form, samajName: samaj.samaj_name });
                      setShowDropdown(false);
                    }}
                  >
                    {samaj.samaj_name}
                  </li>
                ))}
              </ul>
            )}

            <button type="submit">Next</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
