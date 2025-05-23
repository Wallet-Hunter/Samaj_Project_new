# 🏡 Samaj Project – Frontend

This is the **frontend** of the Samaj Project – a community management system built to support structured family data management. It provides role-based access for **Family Heads** and **Members**, along with OTP-based authentication for secure login.

---

## ✨ Features

### 🔐 Authentication
- **Phone Number & OTP Login**
  - Users log in using their phone number.
  - OTP is sent for verification before access is granted.
- **Role-Based Signup**
  - Users choose between:
    - **Family Head**
    - **Member**
  - Each role has a tailored signup experience.

### 👥 Role-Specific Dashboards

#### 👨‍👩‍👧‍👦 Family Head
- View and update personal profile
- View all members of the family
- Add, edit, and delete members
- Full access to all member data and actions

#### 👤 Member
- View and edit own profile
- View other members (read-only)
- No permission to add, edit, or delete other members

---

## 🛠️ Tech Stack

- **React.js** – Frontend framework
- **React Router DOM** – Client-side routing
- **Context API / Redux** – State management
- **Axios / Fetch API** – Backend integration
- **Tailwind CSS / CSS Modules** – Responsive design & styling
- **OTP Integration Ready** – Compatible with Firebase / Twilio

---

## 📁 Folder Structure
SAMAJ_PROJECT/
├── public/
├── src/
│ ├── assets/ # Static files (images, etc.)
│ ├── components/
│ │ ├── addMember/ # Add member form
│ │ ├── headDashboard/ # Dashboard for family head
│ │ ├── loginPage/ # Login component
│ │ ├── memberDashboard/ # Dashboard for member
│ │
│ ├── models/ # Modals
│ │ ├── deleteModel/ # Delete member modal
│ │ └── editModels/ # Edit member modal
│ │
│ ├── data/ # (Future: Store local data/constants)
│
│ ├── pages/
│ │ ├── familyMemberCards/ # UI cards for each member
│ │ ├── familyMembers/ # Family members list
│ │ ├── head/ # Head profile page
│ │ ├── home/ # Home page
│ │ ├── member/ # Member profile page
│ │
│ ├── signupForms/
│ │ ├── headSignup/ # Signup form for head
│ │ └── memberSignup/ # Signup form for member
│ │
│ ├── signupPage/ # Signup role selection
│
│ ├── App.css
│ ├── App.js
│ └── index.js


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/samaj-frontend.git
cd samaj-frontend

2. Install Dependencies
npm install

3. Run the Application
npm start

