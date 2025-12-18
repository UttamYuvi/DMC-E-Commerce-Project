import axios from "axios"

const BASE_URL = "http://localhost:8080";

export async function getCategoryAll(categoryId) {
    console.log('service')
    const response = await axios.get(`${BASE_URL}/products/subcategory/${categoryId}`)
    // console.log(response)
    return response.data
}
