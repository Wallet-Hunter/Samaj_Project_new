import React, { useState } from 'react';
import './EditModel.css';

const EditModal = ({ data, onClose, headId }) => {
  const [formData, setFormData] = useState({ ...data });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const keys = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `https://the-samaj-project-login.onrender.com/apidashboard/family_head_edit/${headId}/`;

    try {
      const form = new FormData();

      // Append top-level fields except family and photo
      for (const key in formData) {
        if (key !== 'family' && key !== 'photo_upload') {
          form.append(key, formData[key] ?? '');
        }
      }

      // Append nested samaj_name
      if (formData.family?.samaj?.samaj_name) {
        form.append('samaj_name', formData.family.samaj.samaj_name);
      }

      // Append photo if it's a File
      if (formData.photo_upload instanceof File) {
        form.append('photo_upload', formData.photo_upload);
      }

      const response = await fetch(url, {
        method: 'PUT',
        body: form,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error('Failed to update data');
      }

      console.log('Data updated successfully');
      onClose();

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="modal-header">
          <h2>Edit Head Info</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          {[
            { label: 'Name', name: 'name_of_head' },
            { label: 'Middle Name', name: 'middle_name' },
            { label: 'Last Name', name: 'last_name' },
            { label: 'Birth Date', name: 'birth_date', type: 'date' },
            { label: 'Age', name: 'age', type: 'number' },
            { label: 'Gender', name: 'gender' },
            { label: 'Marital Status', name: 'marital_status' },
            { label: 'Qualification', name: 'qualification' },
            { label: 'Occupation', name: 'occupation' },
            { label: 'Exact Nature of Duties', name: 'exact_nature_of_duties' },
            { label: 'Native City', name: 'native_city' },
            { label: 'Native State', name: 'native_state' },
            { label: 'Country', name: 'country' },
            { label: 'State', name: 'state' },
            { label: 'District', name: 'district' },
            { label: 'City', name: 'city' },
            { label: 'Street Name', name: 'street_name' },
            { label: 'Landmark', name: 'landmark' },
            { label: 'Building Name', name: 'building_name' },
            { label: 'Door No', name: 'door_no' },
            { label: 'Flat No', name: 'flat_no' },
            { label: 'Pincode', name: 'pincode' },
            { label: 'Landline No', name: 'landline_no' },
            { label: 'Phone No', name: 'phone_no' },
            { label: 'Alternative No', name: 'alternative_no' },
            { label: 'Email ID', name: 'email_id', type: 'email' },
            { label: 'Blood Group', name: 'blood_group' },
            { label: 'Social Media Link', name: 'social_media_link' },
          ].map(({ label, name, type = 'text' }) => (
            <div className="form-group" key={name}>
              <label>{label}:</label>
              <input
                type={type}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="form-group">
            <label>Samaj Name:</label>
            <input
              type="text"
              name="family.samaj_name"
              value={formData.family?.samaj?.samaj_name || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  family: {
                    ...prev.family,
                    samaj: {
                      ...prev.family?.samaj,
                      samaj_name: value,
                    },
                  },
                }));
              }}
            />
          </div>

          <div className="form-group">
            <label>Photo Upload:</label>
            <input
              type="file"
              name="photo_upload"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, photo_upload: e.target.files[0] })
              }
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
