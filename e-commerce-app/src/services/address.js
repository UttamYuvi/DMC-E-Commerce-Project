import axios from "axios";
import { config } from "./config";

export const getUserAddresses = async (token) => {
  try {
    const url = `${config.url}/user/address`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const addUserAddress = async (address, token) => {
  try {
    const url = `${config.url}/user/address`;

    const res = await axios.post(url, address, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
