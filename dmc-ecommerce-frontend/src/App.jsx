import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./screens/vendors/dashboard/Dashboard";
import Login from "./screens/vendors/auth/Login";
import Sales from "./screens/vendors/dashboard/Sales";
import Profile from "./screens/users/Profile"
import Register from "./screens/vendors/auth/Register";
import { ToastContainer } from "react-toastify";
import MainPage from "./screens/vendors/dashboard/MainPage";
import Category from "./screens/vendors/dashboard/category/Category";
import SubCategory from "./screens/vendors/dashboard/SubCategory";
import Home from "./screens/users/Home"
import Product from "./screens/vendors/dashboard/Product";
// import { getVendor } from "./utils/LocalStorage";
import { useContext } from "react";
import { VendorContext } from "./screens/vendors/auth/VendorContext";
import AllCategory from "./screens/vendors/dashboard/category/AllCategory";
import AboutUs from "./screens/users/AboutUs";
import Orders from "./screens/users/orders";
import Help from "./screens/users/Help";
import Cart from "./screens/users/Cart";
import CategoryUser from "./screens/users/CategoryUser";
// import { getVendorFromStorage } from "./utils/LocalStorage";

function App() {
  const { vendor } = useContext(VendorContext);
  // const vendor = getVendorFromStorage();
  console.log("Current Vendor:", vendor);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/category/:categoryId" element={<CategoryUser/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/help" element={<Help/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route
          path="/page"
          element={vendor ? <MainPage /> : <Navigate to="/login" />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="category" element={<Category />} />
          <Route path="allcategory" element={<AllCategory />} />
          <Route path="subcategory" element={<SubCategory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
