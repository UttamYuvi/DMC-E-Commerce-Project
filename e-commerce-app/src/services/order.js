import axios from "axios";
import { config } from "./config";

export async function placeOrderService(orderParam,token) {
  try {
    const url = `${config.url}/orders`;
    const response = await axios.post(url,orderParam,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });
    console.log("service",response.data)
    return response.data;
  } catch (ex) {
    console.log("error",ex)
    return null;
  }
}

export async function getAllUserOrders(token) {
    try {
        const url = `${config.url}/orders`
        const response = await axios.get(url,{
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return null;
    }

}