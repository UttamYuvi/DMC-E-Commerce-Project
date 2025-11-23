import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./screens/vendors/dashboard/Dashboard";
import Login from "./screens/vendors/auth/Login";
import Sales from "./screens/vendors/dashboard/Sales";
import Profile from "./screens/vendors/dashboard/Profile";
import Register from "./screens/vendors/auth/Register";
import { ToastContainer } from "react-toastify";
import MainPage from "./screens/vendors/dashboard/MainPage";
import Category from "./screens/vendors/dashboard/Category";
import SubCategory from "./screens/vendors/dashboard/SubCategory";
import Product from "./screens/vendors/dashboard/Product";
import { useState } from "react";
import { VendorContext } from "./screens/vendors/auth/VendorContext";

function App() {
  const [vendor, setVendor] = useState(null);
  console.log(vendor);

  return (
    <>
      <VendorContext.Provider value={{ vendor, setVendor }}>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/page"
            element={vendor ? <MainPage /> : <Navigate to="/" />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="product" element={<Product />} />
            <Route path="category" element={<Category />} />
            <Route path="subcategory" element={<SubCategory />} />
            <Route path="sales" element={<Sales />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </VendorContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
