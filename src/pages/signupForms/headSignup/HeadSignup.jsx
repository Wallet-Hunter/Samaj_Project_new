import React, { useState } from "react";
import "./HeadSignup.css";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const HeadSignup = () => {
  const [formData, setFormData] = useState({
    name_of_head: "",
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
    family: {
      id: "",
      samaj: {
        id: "",
        samaj_name: "",
        created_at: "",
      },
      total_family_members: "",
      created_at: "",
    },
    created_at: "",
    updated_at: "",
  });

  const location = useLocation();
const familyId = location.state?.familyId;
const postData = location.state?.postData || {};

const { samaj, total_family_members } = postData;

console.log(samaj);
console.log(total_family_members);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (name.startsWith("samaj_")) {
      setFormData((prev) => ({
        ...prev,
        family: {
          ...prev.family,
          samaj: {
            ...prev.family.samaj,
            [name.replace("samaj_", "")]: value,
          },
        },
      }));
    } else if (name.startsWith("family_")) {
      setFormData((prev) => ({
        ...prev,
        family: {
          ...prev.family,
          [name.replace("family_", "")]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set timestamps
    const now = new Date().toISOString();
    const updatedData = {
      ...formData,
      created_at: now,
      updated_at: now,
      family: {
        ...formData.family,
        created_at: now,
        samaj: {
          ...formData.family.samaj,
          created_at: now,
        },
      },
    };

    try {
      const formToSend = new FormData();

      for (const key in updatedData) {
        const value = updatedData[key];

        if (value === "" || value === null) continue;

        if (key === "family") {
          formToSend.append("family", JSON.stringify(value));
        } else {
          formToSend.append(key, value);
        }
      }

      const response = await fetch(
        `https://the-samaj-project-login.onrender.com/apidashboard/new_head/${familyId}/`,
        {
          method: "POST",
          body: formToSend,
        }
      );

      if (!response.ok) throw new Error("Failed to register");

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your details have been submitted successfully.",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  // Utility component to render a label with optional required asterisk
  const Label = ({ text, required }) => (
    <label>
      {text}
      {required && <span className="required-asterisk">*</span>}
    </label>
  );

  return (
    <div className="head-signup-container">
      <h2 style={{ color: "black" }}>Head Signup</h2>
      <form className="head-signup-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Profile Summary</legend>
          <div>
            <Label text="Name of Head" required />
            <input
              type="text"
              name="name_of_head"
              value={formData.name_of_head}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label text="Age" required />
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label text="Gender" required />
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label text="Marital Status" required />
            <input
              type="text"
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Occupation" />
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Samaj Name" />
            <input
              type="text"
              name="samaj_samaj_name"
              value={formData.family.samaj.samaj_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Qualification" />
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Personal Information</legend>
          <div>
            <Label text="Birth Date" />
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Blood Group" />
            <input
              type="text"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Exact Nature of Duties" />
            <input
              type="text"
              name="exact_nature_of_duties"
              value={formData.exact_nature_of_duties}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Contact Information</legend>
          <div>
            <Label text="Email" required />
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label text="Phone No" required />
            <input
              type="text"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label text="Alternative No" />
            <input
              type="text"
              name="alternative_no"
              value={formData.alternative_no}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Landline No" />
            <input
              type="text"
              name="landline_no"
              value={formData.landline_no}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Social Media Link" />
            <input
              type="text"
              name="social_media_link"
              value={formData.social_media_link}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Address</legend>
          <div>
            <Label text="Flat/Door No" />
            <input
              type="text"
              name="flat_no"
              value={formData.flat_no}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Building Name" />
            <input
              type="text"
              name="building_name"
              value={formData.building_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Street Name" />
            <input
              type="text"
              name="street_name"
              value={formData.street_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Landmark" />
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="City" />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="District" />
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="State" />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Native City" />
            <input
              type="text"
              name="native_city"
              value={formData.native_city}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Native State" />
            <input
              type="text"
              name="native_state"
              value={formData.native_state}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Country" />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text="Pincode" />
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* <fieldset>
          <legend>Account Information</legend>
          <div>
            <Label text="Created At" />
            <input
              type="text"
              name="created_at"
              value={formData.created_at}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div>
            <Label text="Updated At" />
            <input
              type="text"
              name="updated_at"
              value={formData.updated_at}
              onChange={handleChange}
              readOnly
            />
          </div>
        </fieldset> */}

        <fieldset>
          <legend>Family Information</legend>
          <div>
            <Label text="Family ID" />
            <input
              type="text"
              name="family_id"
              value={formData.family.id}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  family: { ...prev.family, id: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <Label text="Total Family Members" />
            <input
              type="text"
              name="family_total_family_members"
              value={formData.family.total_family_members}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <div style={{ marginTop: "20px" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default HeadSignup;
