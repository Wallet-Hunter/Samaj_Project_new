import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import "./DeleteMemberModal.css";

const DeleteMemberModal = ({ members, onClose, membersId, onDeleteMember }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    // Handle delete request to the API
    const handleDelete = async (memberId) => {
        setLoading(true);
        setError(""); // Reset error state
      
        try {
          const response = await fetch(`https://the-samaj-project-login.onrender.com/apidashboard/member_delete/${memberId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (response.ok) {
            onDeleteMember(memberId);  // Notify parent component
            setLoading(false);
          } else if (response.status === 404) {
            setError(`Member with ID ${memberId} not found. It might have already been deleted.`);
            setLoading(false);
          } else if (response.status === 500) {
            setError("Server error. Please try again later.");
            setLoading(false);
          } else {
            throw new Error("Error deleting member. Please try again.");
          }
        } catch (err) {
          setLoading(false);
          setError(err.message);
          console.error("Error deleting member:", err);
        }
      };
      
  
    return (
      <div className="delete-member-modal-overlay">
        <div className="delete-member-modal-content">
          <div className="modal-header">
            <h3>Delete Member</h3>
            <button className="close-button" onClick={onClose}>X</button>
          </div>
  
          {/* Error Message */}

  
          <ul className="member-list">
            {members.length === 0 ? (
              <div>No members available to delete.</div>
            ) : (
              members.map((member) => (
                <li key={member.id} className="member-item">
                  <span>{member.name}</span>
                  <MdDelete
                    className="delete-icon"
                    onClick={() => handleDelete(member.id)} // Call handleDelete to delete the member
                  />
                </li>
              ))
            )}
          </ul>
  
          {loading && <div className="loading-message">Deleting...</div>} {/* Show loading state */}
        </div>
      </div>
    );
  };
  
  //export default DeleteMemberModal;
  

export default DeleteMemberModal;
