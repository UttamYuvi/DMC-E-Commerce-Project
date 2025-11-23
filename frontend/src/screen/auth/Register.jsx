import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../services/user";



function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const result = await registerUser(name, email, mobile, password);

    if (result.status === "success") {
      toast.success("Registration Successful");
      navigate("/");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#f2f7ff",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "1100px",
          background: "white",
          borderRadius: "15px",
          display: "flex",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        
        <div
        className="d-none d-md-flex"
          style={{
            width: "50%",
            padding: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/img-2.png "           
            alt="Illustration"
            style={{
              width: "90%",
            }}
          />
        </div>

      
        <div
        className="w-150 w-md-50"
          style={{
            
            padding: "50px"
          }}
        >
          <h2 style={{ fontSize: "32px", marginBottom: "25px" }}>Sign Up</h2>

          
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          
          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              className="form-control"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          
          <button
            className="btn btn-primary w-100"
            style={{ padding: "12px", fontSize: "16px" }}
            onClick={signup}
          >
            Register →
          </button>

          
          <div style={{ marginTop: "20px" }}>
            Already have an account?{" "}
            <Link to="/" style={{ color: "#4A6CF7" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
