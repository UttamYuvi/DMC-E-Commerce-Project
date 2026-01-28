import axios from "axios";
import { config } from "./config";

export async function updateUserProfile(payload, token) {
  try {
    const url = `${config.url}/user/update`;
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return null;
  }
}
