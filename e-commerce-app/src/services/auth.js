import axios from "axios";
import { config } from "./config";

export async function loginUser(email, password) {
  try {
    const url = `${config.url}/login/user`;
    const body = { username: email, password };
    const response = await axios.post(url, body);
    return response.data;
  } catch (ex) {
    return null;
  }
}

export async function registerUser(body) {
  try {
    const url = `${config.url}/register/user`;
    const response = await axios.post(url, body);
    return response.data;
  } catch (ex) {
    return null;
  }
}
