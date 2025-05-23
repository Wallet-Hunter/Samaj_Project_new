import React, { useState } from "react";
import "./AddMemberForm.css";

// Component for adding a new family member
const AddMemberForm = ({ onAddMember, onClose, headId }) => {
  // Local state for storing form inputs
  const [formData, setFormData] = useState({
    name: "",
    middle_name: "",
    last_name: "",
    birth_date: "",
    age: "",
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

  // Handle changes in text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file input for photo upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photo_upload: e.target.files[0],
    }));
  };

  // Submit handler to POST form data to API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields before submission
    if (!formData.name || !formData.phone_no) {
      alert("Name and Phone Number are required!");
      return;
    }

    try {
      const formPayload = new FormData();

      // Append only non-empty values to FormData
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== "") {
          formPayload.append(key, formData[key]);
        }
      }

      // API call to add a new member using headId
      const response = await fetch(
        `https://the-samaj-project-login.onrender.com/apidashboard/member_add/${headId}/`,
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to add member: ${response.statusText}`);
      }

      const result = await response.json();

      // Inform parent component about new member
      if (onAddMember) {
        onAddMember(result);
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        middle_name: "",
        last_name: "",
        birth_date: "",
        age: "",
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
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form: " + error.message);
    }
  };

  // Populate address fields using family head's data
  const handleUseHeadsAddress = async () => {
    try {
      const response = await fetch(
        `https://the-samaj-project-login.onrender.com/apidashboard/member_address/${headId}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch head's address");
      }

      const data = await response.json();

      // Fill form fields with head's address if available
      setFormData((prevData) => ({
        ...prevData,
        native_city: data.city || prevData.native_city,
        native_state: data.state || prevData.native_state,
        country: data.country || prevData.country,
        state: data.state || prevData.state,
        district: data.district || prevData.district,
        city: data.city || prevData.city,
        street_name: data.street_name || prevData.street_name,
        landmark: data.landmark || prevData.landmark,
        building_name: data.building_name || prevData.building_name,
        door_no: data.door_no || prevData.door_no,
        flat_no: data.flat_no || prevData.flat_no,
        pincode: data.pincode || prevData.pincode,
      }));
    } catch (error) {
      console.error("Error fetching head's address:", error);
      alert("Error fetching address: " + error.message);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="add-member-form" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Family Member</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          {/* -------------------- Personal Information -------------------- */}
          <div className="form-section">
            <h3>Personal Information</h3>
            {[
              ["Name", "name"],
              ["Middle Name", "middle_name"],
              ["Last Name", "last_name"],
              ["Age", "age", "number"],
              ["Date of Birth", "birth_date", "date"],
              ["Gender", "gender"],
              ["Marital Status", "marital_status"],
              ["Qualification", "qualification"],
              ["Occupation", "occupation"],
              ["Exact Nature of Duties", "exact_nature_of_duties"],
              ["Relation with Family Head", "relation_with_family_head"],
            ].map(([label, name, type = "text"]) => (
              <React.Fragment key={name}>
                <label>{label}:</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </React.Fragment>
            ))}
          </div>

          {/* -------------------- Address Information -------------------- */}
          <div className="form-section">
            <h3>Address</h3>
            {[
              ["Native City", "native_city"],
              ["Native State", "native_state"],
              ["Country", "country"],
              ["State", "state"],
              ["District", "district"],
              ["City", "city"],
              ["Street Name", "street_name"],
              ["Landmark", "landmark"],
              ["Building Name", "building_name"],
              ["Door No", "door_no"],
              ["Flat No", "flat_no"],
              ["Pincode", "pincode"],
            ].map(([label, name]) => (
              <React.Fragment key={name}>
                <label>{label}:</label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </React.Fragment>
            ))}

            {/* Prefill address fields from head's address */}
            <button
              type="button"
              className="use-head-address-btn"
              onClick={handleUseHeadsAddress}
            >
              Use Head's Address
            </button>
          </div>

          {/* -------------------- Contact Details -------------------- */}
          <div className="form-section">
            <h3>Contact</h3>
            {[
              ["Phone No", "phone_no"],
              ["Alternative No", "alternative_no"],
              ["Landline No", "landline_no"],
              ["Email", "email_id", "email"],
            ].map(([label, name, type = "text"]) => (
              <React.Fragment key={name}>
                <label>{label}:</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </React.Fragment>
            ))}
          </div>

          {/* -------------------- Additional Information -------------------- */}
          <div className="form-section">
            <h3>Other Information</h3>
            {[
              ["Blood Group", "blood_group"],
              ["Social Media Link", "social_media_link"],
            ].map(([label, name]) => (
              <React.Fragment key={name}>
                <label>{label}:</label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </React.Fragment>
            ))}
          </div>

          {/* -------------------- Profile Photo Upload -------------------- */}
          <div className="form-section">
            <h3>Profile Photo</h3>
            <label>Upload Photo:</label>
            <input
              type="file"
              name="photo_upload"
              onChange={handleFileChange}
            />
          </div>

          {/* -------------------- Submit Button -------------------- */}
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
