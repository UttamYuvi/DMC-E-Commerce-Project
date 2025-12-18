import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./css/CategoryUser.css";
import { getCategoryAll } from "../../services/UserService";
// import shirts from "../../assets/subCategories/shirt.jpg";
// import tshirts from "../../assets/subCategories/tshirt.jpg";

function CategoryUser() {
  const { categoryId } = useParams();
  const [subCategory,setSubCategory] = useState([])

  const getAllCategory = async() => {
    const response =  await getCategoryAll(categoryId)
    setSubCategory(response)
    return response
  }

  console.log(subCategory)

  useEffect(() => {
    console.log("hii")
    getAllCategory()
  },[])
  // useEffect(() => {
  //   getAllCategory()
  //     .then(setSubCategory)
  //     .catch(console.error);
  // }, [categoryId]);

  
  const filteredSubCategories = subCategory.filter(
    (sub) => sub.categoryId === Number(categoryId)
  );

  return (
    <div className="category-page">
      <h2 className="category-title">Sub Categories</h2>

      <div className="subcategory-grid">
        {subCategory.map((sub) => (
          <div key={sub.id} className="subcategory-card">
            <img
              src={"http://localhost:8080/uploads/subcategories/mens/"+sub.image}
              alt={sub.name}
              className="subcategory-img"
            />
            <p>{sub.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryUser;
