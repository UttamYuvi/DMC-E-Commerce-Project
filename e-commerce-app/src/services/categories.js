import axios from "axios";
import { config } from "./config";

export async function getAllCategories() {
  try {
    const url = `${config.url}/categories`;
    const response = await axios.get(url);
    return response.data;
  } catch (ex) {
    return null;
  }
}

export async function getAllSubCategories() {
  try {
    const url = `${config.url}/products/subcategories`;
    const response = await axios.get(url);
    return response.data;
  } catch (ex) {
    return null;
  }
}

export async function getAllSubCategoriesByCategory(categoryId) {
  try {
    const url = `${config.url}/products/subcategory/${categoryId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (ex) {
    return null;
  }
}
