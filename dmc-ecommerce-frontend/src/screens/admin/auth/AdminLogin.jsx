import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { saveAdminToStorage, setAdminToken } from "../../../utils/LocalStorage";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { AppSubHeader, AppText } from "../../../utils/AppText";
import { AdminContext } from "./AdminContext";
import { loginAdmin } from "../../../services/admin";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAdmin } = useContext(AdminContext);

  const signin = async () => {
    try {
      const result = await loginAdmin(email, password);
      console.log(result);
      if (result.data.status) {
        setAdminToken(result.data.data.token);

        const adminObject = {
          firstName: result.data.data.firstName,
          lastName: result.data.data.lastName,
          email: result.data.data.email,
          phone: result.data.data.phone,
        };

        saveAdminToStorage(adminObject);
        setAdmin(adminObject);

        toast.success(`Hi ${result.data.data.firstName}! Welcome to Shopifi😊`);
        navigate("/admin/pages/dashboard");
      } else {
        toast.error(result.data.error);
        navigate("/admin/login");
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
            <img src="/admin.png" width={"100%"} />
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
            </Grid>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default AdminLogin;
