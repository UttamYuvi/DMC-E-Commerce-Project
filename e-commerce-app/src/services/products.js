import axios from "axios";
import { config } from "./config";

export async function getAllProducts(page = 0, size = 2) {
  try {
    const url = `${config.url}/products?page=${page}&size=${size}`;
    const response = await axios.get(url);
    return response.data;
  } catch (ex) {
    return null;
  }
}

export async function getAllProductsBySubCatAndCat(cat, subCat) {
  try {
    const url = `${config.url}/products/${cat}/${subCat}`;
    const response = await axios.get(url);
    return response.data;
  } catch (ex) {
    return null;
  }
}
