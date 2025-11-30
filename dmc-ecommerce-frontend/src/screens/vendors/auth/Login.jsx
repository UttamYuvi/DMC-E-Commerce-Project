import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginVendor } from "../../../services/vendor";
import { toast } from "react-toastify";
import { VendorContext } from "./VendorContext";
import { setToken, saveVendorToStorage } from "../../../utils/LocalStorage";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { AppSubHeader, AppText } from "../../../utils/AppText";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setVendor } = useContext(VendorContext);

  const signin = async () => {
    try {
      const result = await loginVendor(email, password);
      if (result.status) {
        setToken(result.data.token);

        const vendorObj = {
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          mobile: result.data.mobile,
        };

        saveVendorToStorage(vendorObj);
        setVendor(vendorObj);

        toast.success(`Hi ${result.data.firstName}! Welcome to Shopifi😊`);
        navigate("/page/dashboard");
      } else {
        toast.error(result.error);
        navigate("/");
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
            <img src="signin.png" width={"100%"} />
          </div>
          <div className=" col-lg-6">
            <Grid container spacing={3}>
              <Grid size={12}>
                <AppSubHeader>Welcome</AppSubHeader>
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
                  onClick={signin}
                >
                  Sign in
                </Button>
              </Grid>

              <Grid size={12}>
                <AppText>
                  <label> Don't have an account?</label>
                  <Link to="/register"> Register here </Link>
                  <label>for free</label>
                </AppText>
              </Grid>
            </Grid>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
