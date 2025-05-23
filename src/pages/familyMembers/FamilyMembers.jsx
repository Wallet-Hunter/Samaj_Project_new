import React, { useEffect, useState } from "react";
//import FamilyMemberCard from "../pages/head/FamilyMemberCard"; // Adjust path if needed
import "./FamilyMembers.css";
import FamilyMemberCard from "../familyMemberCards/FamilyMemberCard";

const FamilyMembers = ({ phoneNumber }) => {
  const [data, setData] = useState(null);
  //const [members, setMembers] = useState([]);
  const [memberIds, setMemberIds] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(phoneNumber);
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

  if (loading) return <div>Loading family members...</div>;
  if (error) return <div>Error: {error}</div>;
  const { family_head, members } = data;
  return (
    <div className="family-members">
      <h3>Family Members</h3>

      <div className="family-member-list">
        {members.map((member) => (
          <div
            key={member.id}
            className="family-member-card"
            onClick={() => setSelectedMember(member)}
          >
            <p className="member-name">
              {member.name || "Unnamed"} {member.middle_name || ""}
            </p>
            <p className="member-relation">
              {member.relation_with_family_head.charAt(0).toUpperCase() +
                member.relation_with_family_head.slice(1)}
            </p>
          </div>
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
  );
};

export default FamilyMembers;
