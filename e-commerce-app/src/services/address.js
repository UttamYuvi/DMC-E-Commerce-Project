import axios from "axios";
import { config } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserAddresses = async () => {
  try {
    const url = `${config.url}/user/address`;
    const token = await AsyncStorage.getItem("token");

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addUserAddress = async (address) => {
  try {
    const url = `${config.url}/user/address`;
    const token = await AsyncStorage.getItem("token");

    const res = await axios.post(url, address, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
