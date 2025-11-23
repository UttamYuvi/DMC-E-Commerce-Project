import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav
      style={{
        width: "100%",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <h2 style={{ margin: 0, fontWeight: "600", color: "#0d47a1" }}>
        ShopInfi Vendor
      </h2>

      <div style={{ display: "flex", gap: "25px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{
            textDecoration: "none",
            padding: "8px 20px",
            borderRadius: "6px",
            backgroundColor: "#0d47a1",
            color: "white",
            fontWeight: "500",
          }}
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
