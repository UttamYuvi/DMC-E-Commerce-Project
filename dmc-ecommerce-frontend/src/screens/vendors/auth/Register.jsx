import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerVendor } from "../../../services/vendor";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { AppSubHeader, AppText } from "../../../utils/AppText";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      const result = await registerVendor(
        firstName,
        lastName,
        mobile,
        email,
        password,
      );
      if (result) {
        console.log(result);
        toast.success("Register successfully");
        navigate("/vendor/login");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "ERROR",
          title: "something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (ex) {
      toast.error(ex);
    }
  };

  return (
    <div
      className="container w-100"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{ width: "70%" }}
        // className=" w-lg-75 w-md-100"
      >
        <div style={{ padding: "16px", display: "flex" }}>
          <div className=" col-lg-6 d-none d-md-block align-content-center">
            <img src="signup.png" width={"100%"} />
          </div>

          <div className=" col-lg-6">
            <Grid container spacing={3}>
              <Grid size={12}>
                <AppSubHeader>Join us</AppSubHeader>
              </Grid>
              <Grid size={6}>
                <TextField
                  id="firstName"
                  type="text"
                  label="First name"
                  variant="outlined"
                  placeholder="Enter first name"
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  id="lastName"
                  type="text"
                  label="Last name"
                  variant="outlined"
                  placeholder="Enter last name"
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  id="phone"
                  type="text"
                  label="Phone"
                  variant="outlined"
                  placeholder="Enter phone number"
                  onChange={(e) => setMobile(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  id="email"
                  type="email"
                  label="Email Address"
                  variant="outlined"
                  placeholder="Enter email address"
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid size={12}>
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={signup}
                >
                  Sign up
                </Button>
              </Grid>

              <Grid size={12}>
                <AppText>
                  <label> Already have an account?</label>
                  <Link to="/"> Login in</Link>
                </AppText>
              </Grid>
            </Grid>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Register;

{
  /* <div className="mb-3 mt-3">
        <label for="firstName" className="form-label">
          First name
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          placeholder="Enter first name"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="mb-3 mt-3">
        <label for="lastName" className="form-label">
          Last name
        </label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          placeholder="Enter last name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="mb-3 mt-3">
        <label for="firstName" className="form-label">
          Mobile
        </label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          placeholder="Enter first name"
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <div className="mb-3 mt-3">
        <label for="inputEmail" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="inputEmail"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label for="inputPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="checkChecked"
          checked
        />
        <label class="form-check-label" for="checkChecked">
          Commission rate is 5%. check if you agree
        </label>
      </div>

      <div className="mb-3">
        <button className="btn btn-success" onClick={signup}>
          Signin
        </button>
      </div> */
}
