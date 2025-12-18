import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./css/CategoryUser.css";
import { getCategoryAll } from "../../services/UserService";
// import shirts from "../../assets/subCategories/shirt.jpg";
// import tshirts from "../../assets/subCategories/tshirt.jpg";

function CategoryUser() {
  const { categoryId, categoryName } = useParams();
  const [subCategory, setSubCategory] = useState([]);

  // const categories = [
  //   { id: 1, name: "mens" },
  //   { id: 2, name: "womens" },
  //   { id: 3, name: "boys" },
  //   { id: 4, name: "girls" },
  //   { id: 5, name: "kids" },
  // ];

  const getAllCategory = async () => {
    const response = await getCategoryAll(categoryId);
    setSubCategory(response);
    return response;
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="category-page">
      <h2 className="category-title">Sub Categories</h2>

      <div className="subcategory-grid">
        {subCategory.map((sub) => (
          <div key={sub.id} className="subcategory-card">
            <img
              src={`http://localhost:8080/uploads/subcategories/${categoryName}/${sub.image}`}
              // src={"http://localhost:8080/uploads/subcategories/mens/"+sub.image}
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
