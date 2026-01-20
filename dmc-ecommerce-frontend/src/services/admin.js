import axios from "axios";
import { base_url } from "../utils/config";
import Swal from "sweetalert2";

export async function loginAdmin(email, password) {
  try {
    const adminBody = { email, password };
    console.log(adminBody);
    const url = base_url.adminUrl + "/admin/signin";
    const response = await axios.post(url, adminBody);
    console.log("response: ", response);
    return response;
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
