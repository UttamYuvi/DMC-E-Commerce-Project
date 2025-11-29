import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginVendor } from "../../../services/vendor";
import { toast } from "react-toastify";
import { VendorContext } from "./VendorContext";
import { setToken, saveVendorToStorage } from "../../../utils/LocalStorage";

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
      console.log(ex);
    }
  };

  return (
    <div className="container w-50">
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
      <div className="mb-3">
        <button className="btn btn-success" onClick={signin}>
          Signin
        </button>
      </div>
      <div>
        <label> Don't have an account ?</label>
        <Link to="/register"> Click Here</Link>
      </div>
    </div>
  );
}

export default Login;
