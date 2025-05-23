import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import "./HeadProfile.css";
import EditModal from "../../components/models/editModels/EditModal";
import AddMemberForm from "../../components/addMember/AddMemberForm";
import FamilyMemberCard from "../familyMemberCards/FamilyMemberCard";
import { Navigate, useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";

import DeleteMemberModal from "../../components/models/deleteModel/DeleteMemberModal";

const HeadProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const [showDelete, setShowDelete] = useState(false); // State for delete modal
  const [memberToDelete, setMemberToDelete] = useState(null); // State to store the member to delete

  const location = useLocation();

  // Safely access phoneNumber, and set a default value if it is undefined
  const phoneNumber = location.state?.phoneNumber || null;

  useEffect(() => {
    if (!phoneNumber) {
      setError("Phone number is missing.");
      setLoading(false);
      return; // Don't proceed with fetchProfile if phoneNumber is missing
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

  if (loading) return <div style={{ color: "white" }}>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null; // safety check

  const { family_head, members } = data;
  const headId = family_head.id;
  // console.log(headId);

  const memberIds = members.map((member) => member.id);
  // console.log(memberIds);

  return (
    <div className="head-profile-container">
      {/* Header */}

      <div className="profile-header">
        <div className="profile-header-left">
          <h2 className="profile-name">
            {family_head.name_of_head} {family_head.middle_name}{" "}
            {family_head.last_name}
            <span className="head-badge">Head</span>
          </h2>

          <p className="family-id">Family ID: {family_head.family.id}</p>

          <p className="remaining-members-label">
            Remaining Members: {data.remaining_members}
          </p>
        </div>
        <div className="profile-header-right">
          <button onClick={() => setShowEdit(true)} className="edit-button">
            <FaEdit /> Edit Info
          </button>
          <br />
          <button
            onClick={() => setShowAdd(true)}
            className="add-member-button"
          >
            <FaPlus /> Add Member
          </button>
          {/* <button
            // Added onClick event to navigate to Delete Member page
            onClick={() => setShowDelete(true)}
            className="delete-member-button"
          >
            <MdDelete />
            Delete Member
          </button> */}
        </div>
      </div>

      {/* Profile Summary */}
      <div className="info-section">
        <h4 className="section-title">Profile Summary</h4>
        <table className="info-table">
          <tbody>
            <tr>
              <th>Age</th>
              <td>{family_head.age}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{family_head.gender}</td>
            </tr>
            <tr>
              <th>Marital Status</th>
              <td>{family_head.marital_status}</td>
            </tr>
            <tr>
              <th>Occupation</th>
              <td>{family_head.occupation || "—"}</td>
            </tr>
            <tr>
              <th>Samaj</th>
              <td>{family_head.family.samaj.samaj_name || "—"}</td>
            </tr>
            <tr>
              <th>Qualification</th>
              <td>{family_head.qualification || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-section">
        <h4 className="section-title">Personal Information</h4>
        <table className="info-table">
          <tbody>
            <tr>
              <th>Birth Date</th>
              <td>{family_head.birth_date}</td>
            </tr>
            <tr>
              <th>Blood Group</th>
              <td>{family_head.blood_group}</td>
            </tr>
            <tr>
              <th>Exact Nature of Duties</th>
              <td>{family_head.nature_of_duties || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="info-section">
        <h4 className="section-title">Contact Information</h4>
        <table className="info-table">
          <tbody>
            <tr>
              <th>Email</th>
              <td>{family_head.email_id}</td>
            </tr>
            <tr>
              <th>Phone No</th>
              <td>{family_head.phone_no}</td>
            </tr>
            <tr>
              <th>Alternative No</th>
              <td>{family_head.alternative_no || "—"}</td>
            </tr>
            <tr>
              <th>Landline No</th>
              <td>{family_head.landline_no || "—"}</td>
            </tr>
            <tr>
              <th>Social Media</th>
              <td>{family_head.social_media || "—"}</td>
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
                {family_head.flat_no}, {family_head.door_no}
              </td>
            </tr>
            <tr>
              <th>Building</th>
              <td>{family_head.building_name}</td>
            </tr>
            <tr>
              <th>Street</th>
              <td>{family_head.street_name}</td>
            </tr>
            <tr>
              <th>Landmark</th>
              <td>{family_head.landmark}</td>
            </tr>
            <tr>
              <th>City</th>
              <td>{family_head.city || "—"}</td>
            </tr>
            <tr>
              <th>District</th>
              <td>{family_head.district}</td>
            </tr>
            <tr>
              <th>State</th>
              <td>{family_head.state}</td>
            </tr>
            <tr>
              <th>Native City</th>
              <td>{family_head.native_city}</td>
            </tr>
            <tr>
              <th>Native State</th>
              <td>{family_head.native_state}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{family_head.country || "India"}</td>
            </tr>
            <tr>
              <th>Pincode</th>
              <td>{family_head.pincode}</td>
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
              <td>{family_head.created_at || "—"}</td>
            </tr>
            <tr>
              <th>Updated At</th>
              <td>{family_head.updated_at || "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Family Info */}
      <div className="info-section">
        <h4 className="section-title">Family Information</h4>
        <table className="info-table">
          <tbody>
            <tr>
              <th>Family ID</th>
              <td>{family_head.family.id}</td>
            </tr>
            <tr>
              <th>Total Family Members</th>
              <td>{members.length}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Family Members */}
      <div className="family-members">
        <h3>Family Members</h3>
        <div className="family-member-list">
          {members.map((member) => (
            <button
              key={member.id}
              className="family-member-card"
              onClick={() => setSelectedMember(member)}
            >
              <p className="member-name">
                {member.name} {member.middle_name}
              </p>
              <p className="member-relation">
                {member.relation_with_family_head.charAt(0).toUpperCase() +
                  member.relation_with_family_head.slice(1)}
              </p>
            </button>
          ))}
        </div>

        {selectedMember && (
          <FamilyMemberCard
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
            membersId={memberIds}
          />
        )}
      </div>

      {/* Modals */}
      {showEdit && (
        <EditModal
          data={family_head}
          headId={headId}
          onClose={() => setShowEdit(false)}
        />
      )}

      {/* Add Member Modal */}
      {showAdd && (
        <AddMemberForm headId={headId} onClose={() => setShowAdd(false)} />
      )}

      {showDelete && (
        <DeleteMemberModal
          members={members}
          onClose={() => setShowDelete(false)}
          membersId={memberIds}
          //onDeleteMember={handleDeleteMember}
        />
      )}
    </div>
  );
};

export default HeadProfile;
