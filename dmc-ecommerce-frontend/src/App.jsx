import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./screens/vendors/dashboard/Dashboard";
import Login from "./screens/vendors/auth/Login";
import Sales from "./screens/vendors/dashboard/Sales";
import Profile from "./screens/vendors/dashboard/Profile";
import Register from "./screens/vendors/auth/Register";
import { ToastContainer } from "react-toastify";
import MainPage from "./screens/vendors/dashboard/MainPage";
import Category from "./screens/vendors/dashboard/category/Category";
import SubCategory from "./screens/vendors/dashboard/subcategory/SubCategory";
import Product from "./screens/vendors/dashboard/products/Product";
import { useContext } from "react";
import { VendorContext } from "./screens/vendors/auth/VendorContext";
import AllCategory from "./screens/vendors/dashboard/category/AllCategory";
import AllSubCategory from "./screens/vendors/dashboard/subcategory/AllSubCategory";
import Orders from "./screens/vendors/dashboard/Orders";
import AllProducts from "./screens/vendors/dashboard/products/AllProducts";
import Home from "./screens/users/Home";
import CategoryUser from "./screens/users/CategoryUser";
import ProductsUser from "./screens/users/ProductsUser";

function App() {
  const { vendor } = useContext(VendorContext);

  return (
    <>
      <Routes>
        {/* <Route path="*" element={<Login/>} />  */}
        <Route path="*" element={<Home/>} />  
        <Route path="/register" element={<Register />} />
        <Route path="/category/:categoryId/:categoryName" element={<CategoryUser/>} />
        <Route path="products/:categoryId/:subCategoryId" element={<ProductsUser />} />

        <Route
          path="/page"
          element={vendor ? <MainPage /> : <Navigate to="/" />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="allproducts" element={<AllProducts />} />
          <Route path="category" element={<Category />} />
          <Route path="allcategory" element={<AllCategory />} />
          <Route path="allsubcategory" element={<AllSubCategory />} />
          <Route path="subcategory" element={<SubCategory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="sales" element={<Sales />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
