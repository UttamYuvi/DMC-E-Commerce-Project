import axios from "axios";
import { config } from "./config";

export async function loginUser(email, password) {
  try {
    const url = `${config.url}/login/user`;
    const body = { username: email, password };
    const response = await axios.post(url, body);
    console.log("response", response.data);
    return response.data;
  } catch (ex) {
    console.log("error", ex);
    return null;
  }
}

export async function registerUser(cat, subCat) {
  try {
    const url = `${config.url}/products/${cat}/${subCat}`;
    const response = await axios.get(url);
    return response.data;
  } catch (ex) {
    return null;
  }
}
