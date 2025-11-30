import React from "react";
import { useState, useEffect } from "react";
import "./css/profile.css";

function Profile() {
  const [editName, setEditName] = useState("");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  //   useEffect(() => {
  //     setUser(null);
  //   }, []);
  useEffect(() => {
    if (user) {
      setEditName(user.name);
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = { name, email, mobile };
    setUser(newUser);
  };

  // Handle update name only
  //   const updateName = (e) => {
  //     e.preventDefault();
  //     setUser({ ...user });
  //   };
  const updateName = (e) => {
    e.preventDefault();
    setUser({ ...user, name: editName });
    alert("Name updated!");
  };

  if (!user) {
    return (
      <div className="p-container">
        <h2 className="p-title">Create Your Profile</h2>
        <form className="p-form">
          <input
            className="inp"
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="inp"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="inp"
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <button className="p-button" onClick={handleLogin}>
            Save Details
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-container">
      <h2 className="p-title">My Profile</h2>

      <div className="profile-card">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Mobile:</strong> {user.mobile}
        </p>
        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <form>
          <label>Update Name</label>
          <input
            className="inp"
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />

          <button className="p-button" onClick={updateName}>
            Update Name
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
