import { useEffect, useState } from "react";
import serverData from "../../services/ServerData";
import { useParams } from "react-router";
import "./css/products.css";
import { base_url } from "../../utils/config";

export default function ProductsUser() {
  const [products, setProducts] = useState([]);
  const { categoryId, subCategoryId } = useParams();

  useEffect(() => {
    getAllProductsByCat_SubCat();
  }, []);

  console.log("producsts:", products);

  const getAllProductsByCat_SubCat = async () => {
    const response = await serverData.getProductsByCat_Subcat(
      categoryId,
      subCategoryId,
    );
    setProducts(response.data);
  };

  return (
    <div className="container my-4">
      <div className="row g-5">
        {products.map((product) => {
          const image = product.images.split(",")[0];
          return (
            <div
              key={product.productId}
              className="main col-6 col-md-4 col-lg-3"
            >
              <div className="card product-card h-100 shadow-sm">
                {/* Product Image */}
                <div className="product-img-wrapper">
                  <img
                    src={`${base_url.url}/uploads/products/${image}`}
                    className="card-img-top product-img"
                    alt={product.name}
                  />
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                  <h6 className="product-title">{product.name}</h6>

                  <p className="text-muted small mb-2 text-truncate">
                    {product.description}
                  </p>

                  <div className="mt-auto">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="product-price">₹{product.price}</span>
                      <span className="badge bg-success">In Stock</span>
                    </div>

                    <button className="btn btn-dark w-100 btn-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
