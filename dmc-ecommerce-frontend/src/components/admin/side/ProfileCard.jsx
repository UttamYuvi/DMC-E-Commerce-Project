import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { VendorContext } from "../../../screens/vendors/auth/VendorContext";

function ProfileCard(openProductMenu) {
  const { vendor } = useContext(VendorContext);
  return (
    <div
      style={{
        cursor: "pointer",
        padding: "12px",
        margin: "12px 0px",
        borderRadius: "12px",
        background: "#343a40",
        boxShadow: "rgba(149,157,165,0.2) 0px 8px 24px",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        fontWeight: openProductMenu ? 600 : 400,
        position: "fixed",
        bottom: "12px",
        left: "16px",
      }}
    >
      <div>
        <Avatar alt="User Profile" src="/profile.jpg" />
      </div>
      <div style={{ marginLeft: "6px", width: "7rem", overflow: "hidden" }}>
        <div style={{ fontSize: "14px" }}>
          {vendor.firstName} {vendor.lastName}
        </div>
        <div style={{ fontSize: "10px" }}>{vendor.email}</div>
      </div>
    </div>
  );
}

export default ProfileCard;
