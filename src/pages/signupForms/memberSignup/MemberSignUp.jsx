import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MemberSignUp.css";
import Swal from "sweetalert2";

const MemberSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    middle_name: "",
    last_name: "",
    birth_date: "",
    age: " ",
    gender: "",
    marital_status: "",
    qualification: "",
    occupation: "",
    exact_nature_of_duties: "",
    native_city: "",
    native_state: "",
    country: "",
    state: "",
    district: "",
    city: "",
    street_name: "",
    landmark: "",
    building_name: "",
    door_no: "",
    flat_no: "",
    pincode: "",
    landline_no: "",
    phone_no: "",
    alternative_no: "",
    email_id: "",
    blood_group: "",
    social_media_link: "",
    photo_upload: null,
    relation_with_family_head: "",
  });

  const location = useLocation();

  const { family_head_phone_number, head_name, samaj_name } =
    location.state || {};

  useEffect(() => {
    console.log("Received member data:", {
      family_head_phone_number,
      head_name,
      samaj_name,
    });
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "photo_upload" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formToSend = new FormData();

      // Add all form fields
      for (const key in formData) {
        formToSend.append(key, formData[key]);
      }

      // Add family head details from location.state
      formToSend.append(
        "family_head_phone_number",
        family_head_phone_number || ""
      );
      formToSend.append("head_name", head_name || "");
      formToSend.append("samaj_name", samaj_name || "");

      const response = await fetch(
        "https://the-samaj-project-login.onrender.com/apidashboard/new_member/",
        {
          method: "POST",
          body: formToSend,
        }
      );

      if (!response.ok) throw new Error("Submission failed");

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Member has been registered successfully.",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="form-container">
      <h2 style={{color: "black"}}>Member Sign-Up Form</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <fieldset>
          <legend>Personal Information</legend>
          {[
            ["name", "First Name", "text", true],
            ["middle_name", "Middle Name", "text", false],
            ["last_name", "Last Name", "text", true],
            ["birth_date", "Birth Date", "date", true],
            ["age", "Age", "number", true],
            ["gender", "Gender", "text", true],
            ["marital_status", "Marital Status", "text", true],
            ["qualification", "Qualification", "text", false],
            ["occupation", "Occupation", "text", false],
            ["exact_nature_of_duties", "Exact Duties", "text", false],
            [
              "relation_with_family_head",
              "Relation with Family Head",
              "text",
              true,
            ],
          ].map(([name, label, type = "text", required = false]) => (
            <div className="form-field" key={name}>
              <label>
                {label} {required && <span style={{ color: "red" }}>*</span>}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
              />
            </div>
          ))}

          <div className="form-field">
            <label>Blood Group</label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-field">
            <label>Photo Upload</label>
            <input
              type="file"
              name="photo_upload"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Contact Information</legend>
          {[
            ["phone_no", "Phone Number"],
            ["alternative_no", "Alternative Number"],
            ["landline_no", "Landline Number"],
            ["email_id", "Email", "email"],
            ["social_media_link", "Social Media Link"],
          ].map(([name, label, type = "text"]) => (
            <div className="form-field" key={name}>
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>Current Address</legend>
          {[
            ["country", "Country"],
            ["state", "State"],
            ["district", "District"],
            ["city", "City"],
            ["street_name", "Street Name"],
            ["landmark", "Landmark"],
            ["building_name", "Building Name"],
            ["door_no", "Door Number"],
            ["flat_no", "Flat Number"],
            ["pincode", "Pincode"],
          ].map(([name, label]) => (
            <div className="form-field" key={name}>
              <label>{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>Native Place</legend>
          {[
            ["native_city", "Native City"],
            ["native_state", "Native State"],
          ].map(([name, label]) => (
            <div className="form-field" key={name}>
              <label>{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </fieldset>

        <div className="form-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default MemberSignUp;
