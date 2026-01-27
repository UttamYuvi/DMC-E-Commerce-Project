import axios from "axios";
import Swal from "sweetalert2";
import { base_url } from "../utils/config";

export async function loginVendor(email, password) {
  try {
    const userBody = { username: email, password };
    const url = base_url.vendorUrl + "/login/vendor";
    console.log("login url", url);
    const response = await axios.post(url, userBody);
    return response.data;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

export async function registerVendor(
  firstName,
  lastName,
  mobile,
  email,
  password,
) {
  try {
    const userBody = { firstName, lastName, mobile, email, password };
    const url = base_url.vendorUrl + "/register/vendor";
    const response = await axios.post(url, userBody);
    return response.data;
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
