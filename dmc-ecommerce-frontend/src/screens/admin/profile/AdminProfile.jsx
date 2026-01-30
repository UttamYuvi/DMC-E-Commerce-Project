import React, { useContext, useEffect, useState } from "react";
import serverData from "../../../services/ServerData";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AdminContext } from "../auth/AdminContext";

function AdminProfile() {
  const navigate = useNavigate();

  
    const { admin } = useContext(AdminContext);
    console.log(admin)

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Fetch profile when component mounts
//   const getProfile = async () => {
//     try {
//       const response = await serverData.getAdminProfile();
//       console.log(response.data)
//       setUser(response.data);
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to load profile");
//     }
//   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Update profile
//   const updateProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await serverData.updateAdminProfile(user);
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

  useEffect(() => {
    setUser(admin)
  }, [admin]);

  return (
    <div className="profile-page" style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <div className="profile-card" style={{ padding: "30px", borderRadius: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", width: "400px" }}>
        <legend style={{ fontWeight: "bold", marginBottom: "20px" }}>Admin Profile</legend>

        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
          readOnly
            type="text"
            name="firstName"
            value={user.firstName}
            className="form-control"
            id="firstName"
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
          readOnly
            type="text"
            name="lastName"
            value={user.lastName}
            className="form-control"
            id="lastName"
            onChange={handleChange}
          />
        </div>

        {/* Email (disabled) */}
        <fieldset disabled>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
            readOnly
              type="email"
              value={user.email}
              className="form-control"
              id="email"
            />
          </div>
        </fieldset>

        {/* Phone */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
          readOnly
            type="text"
            name="phone"
            value={user.phone}
            className="form-control"
            id="phone"
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="profile-actions" style={{ display: "flex", justifyContent: "space-between", margin:"centere"}}>
          <button
            className="btn btn-warning"
            onClick={() => navigate("/admin/pages/dashboard")}
          >
            Back
          </button>

          
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
