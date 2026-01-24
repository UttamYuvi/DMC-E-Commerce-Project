import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./src/slice/cartSlice.js";

// create a redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
