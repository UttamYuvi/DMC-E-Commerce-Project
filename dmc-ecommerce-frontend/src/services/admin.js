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
export async function getAdminDashboard() {
  try {
    const url = base_url.adminUrl + "/admin/getAllVendors"; // ✅ FIXED URL

    const token = localStorage.getItem("adminToken"); // ✅ FIXED KEY

    return await axios.get(url, {
      headers: {
        token: token, // ✅ MATCHES verifyAdminAuth
      },
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Dashboard fetch failed",
    });
  }
}