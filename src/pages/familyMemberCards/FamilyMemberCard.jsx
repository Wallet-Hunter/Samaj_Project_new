import React, { useState } from "react";
import "./FamilyMemberCard.css";

const FamilyMemberCard = ({ member, onClose, onEdit, membersId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...member });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(membersId);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://the-samaj-project-login.onrender.com/apidashboard/member_edit/${membersId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text(); // Or response.json() based on your API
        throw new Error(`Failed to update member: ${errorMessage}`);
      }

      // Handle success (e.g., redirect, update UI, etc.)
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  if (!member) return null;

  return (
    <div className="modal-overlay">
      <div className="family-member-details">
        <div className="family-member-header">
          <h4>
            {member.name} {member.middle_name} {member.last_name}
          </h4>
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>

        {/* <div className="profile-photo">
          <img src={member.photo_upload} alt="Family Member" />
        </div> */}

        {isEditing ? (
          <div className="edit-form">
            <div className="details-grid">
              {/* Personal Info */}
              <div className="details-section">
                <h3>Personal Information</h3>
                <ul>
                  <li>
                    <label>Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Middle Name</label>
                    <input
                      name="middle_name"
                      value={formData.middle_name}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Last Name</label>
                    <input
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Age</label>
                    <input
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Date of Birth</label>
                    <input
                      name="birth_date"
                      type="date"
                      value={formData.birth_date}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Gender</label>
                    <input
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Marital Status</label>
                    <input
                      name="marital_status"
                      value={formData.marital_status || ""}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Qualification</label>
                    <input
                      name="qualification"
                      value={formData.qualification || ""}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Occupation</label>
                    <input
                      name="occupation"
                      value={formData.occupation || ""}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Exact Nature of Duties</label>
                    <input
                      name="exact_nature_of_duties"
                      value={formData.exact_nature_of_duties || ""}
                      onChange={handleChange}
                    />
                  </li>
                </ul>
              </div>

              {/* Address Info */}
              <div className="details-section">
                <h3>Address</h3>
                <ul>
                  <li>
                    <label>Native City</label>
                    <input
                      name="native_city"
                      value={formData.native_city}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Native State</label>
                    <input
                      name="native_state"
                      value={formData.native_state}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Country</label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>State</label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>District</label>
                    <input
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>City</label>
                    <input
                      name="city"
                      value={formData.city || ""}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Street Name</label>
                    <input
                      name="street_name"
                      value={formData.street_name}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Landmark</label>
                    <input
                      name="landmark"
                      value={formData.landmark || ""}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Building Name</label>
                    <input
                      name="building_name"
                      value={formData.building_name || ""}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Door No</label>
                    <input
                      name="door_no"
                      value={formData.door_no || ""}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Flat No</label>
                    <input
                      name="flat_no"
                      value={formData.flat_no || ""}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Pincode</label>
                    <input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="details-section">
                <h3>Contact Details</h3>
                <ul>
                  <li>
                    <label>Phone No</label>
                    <input
                      name="phone_no"
                      value={formData.phone_no}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Alternative No</label>
                    <input
                      name="alternative_no"
                      value={formData.alternative_no || ""}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Landline No</label>
                    <input
                      name="landline_no"
                      value={formData.landline_no || ""}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Email</label>
                    <input
                      name="email_id"
                      value={formData.email_id}
                      onChange={handleChange}
                    />
                  </li>
                </ul>
              </div>

              {/* Other Info */}
              <div className="details-section">
                <h3>Other Information</h3>
                <ul>
                  <li>
                    <label>Blood Group</label>
                    <input
                      name="blood_group"
                      value={formData.blood_group}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Relation with Family Head</label>
                    <input
                      name="relation_with_family_head"
                      value={formData.relation_with_family_head}
                      onChange={handleChange}
                    />
                  </li>
                  <li>
                    <label>Social Media</label>
                    <input
                      name="social_media_link"
                      value={formData.social_media_link || ""}
                      onChange={handleChange}
                    />
                  </li>
                </ul>
              </div>
            </div>
            <button onClick={handleSave} className="save-button">
              Save
            </button>
          </div>
        ) : (
          <div className="details-grid">
            {/* Personal Info */}
            <div className="details-section">
              <h3>Personal Information</h3>
              <table className="details-table">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>
                      {member.name} {member.middle_name} {member.last_name}
                    </td>
                  </tr>
                  <tr>
                    <th>Age</th>
                    <td>{member.age}</td>
                  </tr>
                  <tr>
                    <th>Date of Birth</th>
                    <td>{member.birth_date}</td>
                  </tr>
                  <tr>
                    <th>Gender</th>
                    <td>{member.gender}</td>
                  </tr>
                  <tr>
                    <th>Marital Status</th>
                    <td>{member.marital_status}</td>
                  </tr>
                  <tr>
                    <th>Qualification</th>
                    <td>{member.qualification}</td>
                  </tr>
                  <tr>
                    <th>Occupation</th>
                    <td>{member.occupation}</td>
                  </tr>
                  <tr>
                    <th>Exact Nature of Duties</th>
                    <td>{member.exact_nature_of_duties || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Address Info */}
            <div className="details-section">
              <h3>Address</h3>
              <table className="details-table">
                <tbody>
                  <tr>
                    <th>Native City</th>
                    <td>{member.native_city}</td>
                  </tr>
                  <tr>
                    <th>Native State</th>
                    <td>{member.native_state}</td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>{member.country}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>{member.state}</td>
                  </tr>
                  <tr>
                    <th>District</th>
                    <td>{member.district}</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>{member.city || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Street Name</th>
                    <td>{member.street_name}</td>
                  </tr>
                  <tr>
                    <th>Landmark</th>
                    <td>{member.landmark}</td>
                  </tr>
                  <tr>
                    <th>Building Name</th>
                    <td>{member.building_name}</td>
                  </tr>
                  <tr>
                    <th>Door No</th>
                    <td>{member.door_no}</td>
                  </tr>
                  <tr>
                    <th>Flat No</th>
                    <td>{member.flat_no}</td>
                  </tr>
                  <tr>
                    <th>Pincode</th>
                    <td>{member.pincode}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Contact Info */}
            <div className="details-section">
              <h3>Contact Details</h3>
              <table className="details-table">
                <tbody>
                  <tr>
                    <th>Phone No</th>
                    <td>{member.phone_no}</td>
                  </tr>
                  <tr>
                    <th>Alternative No</th>
                    <td>{member.alternative_no || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Landline No</th>
                    <td>{member.landline_no || "N/A"}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{member.email_id}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Other Info */}
            <div className="details-section">
              <h3>Other Information</h3>
              <table className="details-table">
                <tbody>
                  <tr>
                    <th>Blood Group</th>
                    <td>{member.blood_group}</td>
                  </tr>
                  <tr>
                    <th>Relation with Family Head</th>
                    <td>{member.relation_with_family_head}</td>
                  </tr>
                  <tr>
                    <th>Social Media</th>
                    <td>{member.social_media_link || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyMemberCard;
