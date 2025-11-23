import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/user";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    try {
      const result = await loginUser(email, password);

      if (result.status === "success") {
        window.sessionStorage.setItem("token", result.data.token);

        toast.success("Login Successful");
        navigate("/profile");
      } else {
        toast.error(result.error);
      }
    } catch (ex) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #8EC5FC, #E0C3FC)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "85%",
          maxWidth: "900px",
          background: "white",
          borderRadius: "15px",
          overflow: "hidden",
          display: "flex",
          boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
        }}
      >
    
        <div
          className="d-none d-md-flex"
          style={{
            width: "50%",
            background: "#f1f4ff",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          <img
            src="/img-2.png"
            alt="Login Illustration"
            style={{ width: "90%" }}
          />
        </div>

        <div
          className="w-200 w-md-50"
          style={{ padding: "50px" }}
        >
          <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>
            Welcome Back!
          </h2>
          <p style={{ marginBottom: "25px", color: "#666" }}>
            Please log in to continue
          </p>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            style={{ padding: "12px", fontSize: "17px" }}
            onClick={signin}
          >
            Login →
          </button>

          <div style={{ marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#4A6CF7" }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
