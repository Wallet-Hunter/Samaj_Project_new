import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import "./MemberProfilePage.css";
import EditModal from "../../components/models/editModels/EditModal";
import { useLocation } from "react-router-dom";

const FamilyMemberProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [showEdit, setShowEdit] = useState(false);

  const phoneNumber = location.state?.phoneNumber || null;
  useEffect(() => {
    const fetchProfile = async () => {
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

    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null; // safety check

  const { member, members } = data;
  const memberId = member.id;
console.log(memberId);

  return (
    <div className="head-profile-container">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-header-left">
          <h2 className="profile-name">
            {member.name} {member.middle_name} {member.last_name}
            <span className="head-badge">Member</span>
          </h2>
          <p className="family-id">Family ID: {member.id}</p>
        </div>

        <div className="profile-header-right">
          <button onClick={() => setShowEdit(true)} className="edit-button">
            <FaEdit /> Edit Info
          </button>
          <br />
        </div>
      </div>

      {/* Profile Summary */}
      <div className="info-section">
        <h4 className="section-title">Profile Summary</h4>
        <table className="info-table">
          <tbody>
            <tr>
              <th>Age</th>
              <td>{member.age}</td>
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
              <th>Occupation</th>
              <td>{member.occupation || "—"}</td>
            </tr>
            {/* Uncomment below if samaj data is needed */}
            {/* <tr>
        <th>Samaj</th>
        <td>{member.family.samaj.samaj_name || '—'}</td>
      </tr> */}
            <tr>
              <th>Qualification</th>
              <td>{member.qualification || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Personal Info */}
      <div className="info-section">
        <h4 className="section-title">Personal Information</h4>
        <table className="info-table">
          <tbody>
            <tr>
              <th>Birth Date</th>
              <td>{member.birth_date}</td>
            </tr>
            <tr>
              <th>Blood Group</th>
              <td>{member.blood_group}</td>
            </tr>
            <tr>
              <th>Exact Nature of Duties</th>
              <td>{member.exact_nature_of_duties || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Contact Info */}
      <div className="info-section">
        <h4 className="section-title">Contact Information</h4>
        <table className="info-table">
          <tbody>
            <tr>
              <th>Email</th>
              <td>{member.email_id}</td>
            </tr>
            <tr>
              <th>Phone No</th>
              <td>{member.phone_no}</td>
            </tr>
            <tr>
              <th>Alternative No</th>
              <td>{member.alternative_no || "—"}</td>
            </tr>
            <tr>
              <th>Landline No</th>
              <td>{member.landline_no || "—"}</td>
            </tr>
            <tr>
              <th>Social Media</th>
              <td>{member.social_media || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Address Info */}
      <div className="info-section">
        <h4 className="section-title">Address</h4>
        <table className="info-table">
          <tbody>
            <tr>
              <th>Flat/Door</th>
              <td>
                {member.flat_no}, {member.door_no}
              </td>
            </tr>
            <tr>
              <th>Building</th>
              <td>{member.building_name}</td>
            </tr>
            <tr>
              <th>Street</th>
              <td>{member.street_name}</td>
            </tr>
            <tr>
              <th>Landmark</th>
              <td>{member.landmark}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{member.city || "—"}</td>
            </tr>
            <tr>
              <th>District</th>
              <td>{member.district}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{member.state}</td>
            </tr>
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
              <td>{member.country || "India"}</td>
            </tr>
            <tr>
              <th>Pincode</th>
              <td>{member.pincode}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Account Info */}
      <div className="info-section">
        <h4 className="section-title">Account Information</h4>
        <table className="info-table">
          <tbody>
            <tr>
              <th>Created At</th>
              <td>{member.created_at}</td>
            </tr>
            <tr>
              <th>Updated At</th>
              <td>{member.updated_at || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {showEdit && (
        <EditModal
          data={member}
          headId={memberId}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Family Info
      <div className="info-section">
        <h4>Family Information</h4>
        <ul>
          <li>Family ID: {member.family.id}</li>
          <li>Total Family Members: {members.length}</li>
        </ul>
      </div> */}
    </div>
  );
};

export default FamilyMemberProfile;
