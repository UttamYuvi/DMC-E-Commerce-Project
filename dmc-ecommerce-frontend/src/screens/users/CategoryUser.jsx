import React from "react";
import { useParams } from "react-router";
import "./css/CategoryUser.css";
import shirts from "../../assets/subCategories/shirt.jpg";
import tshirts from "../../assets/subCategories/tshirt.jpg";

function CategoryUser() {
  const { categoryId } = useParams();

  const subCategories = [
    // Mens (1)
    { id: 1, categoryId: 1, name: "Shirts" },
    { id: 2, categoryId: 1, name: "T-Shirts" },
    { id: 3, categoryId: 1, name: "Jeans" },
    { id: 4, categoryId: 1, name: "Trousers" },
    { id: 5, categoryId: 1, name: "Jackets" },
    { id: 6, categoryId: 1, name: "Hoodies & Sweatshirts" },
    { id: 7, categoryId: 1, name: "Blazers" },
    { id: 8, categoryId: 1, name: "Ethnic Wear" },
    { id: 9, categoryId: 1, name: "Innerwear" },
    { id: 10, categoryId: 1, name: "Sleepwear" },
    { id: 11, categoryId: 1, name: "Activewear" },
    { id: 12, categoryId: 1, name: "Shoes" },
    { id: 13, categoryId: 1, name: "Sandals & Slippers" },
    { id: 14, categoryId: 1, name: "Accessories" },

    // Womens (2)
    { id: 15, categoryId: 2, name: "Tops" },
    { id: 16, categoryId: 2, name: "T-Shirts" },
    { id: 17, categoryId: 2, name: "Dresses" },
    { id: 18, categoryId: 2, name: "Jeans" },
    { id: 19, categoryId: 2, name: "Trousers" },
    { id: 20, categoryId: 2, name: "Skirts" },
    { id: 21, categoryId: 2, name: "Jackets" },
    { id: 22, categoryId: 2, name: "Shrugs" },
    { id: 23, categoryId: 2, name: "Ethnic Wear" },
    { id: 24, categoryId: 2, name: "Innerwear" },
    { id: 25, categoryId: 2, name: "Sleepwear" },
    { id: 26, categoryId: 2, name: "Activewear" },
    { id: 27, categoryId: 2, name: "Heels" },
    { id: 28, categoryId: 2, name: "Flats" },
    { id: 29, categoryId: 2, name: "Handbags" },
    { id: 30, categoryId: 2, name: "Accessories" },

    // Boys (3)
    { id: 31, categoryId: 3, name: "T-Shirts" },
    { id: 32, categoryId: 3, name: "Shirts" },
    { id: 33, categoryId: 3, name: "Jeans" },
    { id: 34, categoryId: 3, name: "Shorts" },
    { id: 35, categoryId: 3, name: "Track Pants" },
    { id: 36, categoryId: 3, name: "Jackets" },
    { id: 37, categoryId: 3, name: "Hoodies" },
    { id: 38, categoryId: 3, name: "Ethnic Wear" },
    { id: 39, categoryId: 3, name: "School Uniforms" },
    { id: 40, categoryId: 3, name: "Shoes" },
    { id: 41, categoryId: 3, name: "Sandals" },
    { id: 42, categoryId: 3, name: "Caps" },
    { id: 43, categoryId: 3, name: "Sportswear" },

    // Girls (4)
    { id: 44, categoryId: 4, name: "Tops" },
    { id: 45, categoryId: 4, name: "T-Shirts" },
    { id: 46, categoryId: 4, name: "Dresses" },
    { id: 47, categoryId: 4, name: "Skirts" },
    { id: 48, categoryId: 4, name: "Jeans" },
    { id: 49, categoryId: 4, name: "Leggings" },
    { id: 50, categoryId: 4, name: "Jackets" },
    { id: 51, categoryId: 4, name: "Ethnic Wear" },
    { id: 52, categoryId: 4, name: "School Uniforms" },
    { id: 53, categoryId: 4, name: "Shoes" },
    { id: 54, categoryId: 4, name: "Sandals" },
    { id: 55, categoryId: 4, name: "Hair Accessories" },
    { id: 56, categoryId: 4, name: "Sportswear" },

    // Kids (5)
    { id: 57, categoryId: 5, name: "Rompers" },
    { id: 58, categoryId: 5, name: "Frocks" },
    { id: 59, categoryId: 5, name: "T-Shirts" },
    { id: 60, categoryId: 5, name: "Shorts" },
    { id: 61, categoryId: 5, name: "Pants" },
    { id: 62, categoryId: 5, name: "Nightwear" },
    { id: 63, categoryId: 5, name: "Winter Wear" },
    { id: 64, categoryId: 5, name: "Baby Sets" },
    { id: 65, categoryId: 5, name: "Toys" },
    { id: 66, categoryId: 5, name: "Shoes" },
    { id: 67, categoryId: 5, name: "Socks" },
    { id: 68, categoryId: 5, name: "Caps" },
    { id: 69, categoryId: 5, name: "School Bags" },
  ];
  const subCategoriesImages = {
    "Shirts": shirts,
    "T-Shirts": tshirts
  };
  const filteredSubCategories = subCategories.filter(
    (sub) => sub.categoryId === Number(categoryId)
  );

  return (
    <div className="category-page">
      <h2 className="category-title">Sub Categories</h2>

      <div className="subcategory-grid">
        {filteredSubCategories.map((sub) => (
          <div key={sub.id} className="subcategory-card">
            <img
              src={subCategoriesImages[sub.name]}
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
