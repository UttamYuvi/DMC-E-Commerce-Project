import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerVendor } from "../../../services/vendor";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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
        password
      );
      if (result.status) {
        toast.success("Register successfully");

        navigate("/");
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
      console.log(ex);
    }
  };

  return (
    <div className="container w-50">
      <div className="mb-3 mt-3">
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
      </div>
      <div>
        <label> Don't have an account ?</label>
        <Link to="/register"> Click Here</Link>
      </div>
    </div>
  );
}

export default Register;
