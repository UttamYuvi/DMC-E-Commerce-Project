import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push({
        ...action.payload,
        quantity: 1,
      });
    },
    incrementQty: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQty: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    removeFromCart: (state, action) => {
      const item = action.payload;
      state.items = state.items.filter(
        (tempItem) => tempItem.productId !== item.productId,
      );
    },

    updateQuantity: (state, action) => {
      const { item, quantity } = action.payload;
      const index = state.items.findIndex(
        (tempItem) => tempItem.productId === item.productId,
      );
      if (index !== -1) {
        state.items[index].quantity = quantity;
      }
    },

    clear: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeFromCart,
  updateQuantity,
  clear,
} = cartSlice.actions;

export default cartSlice.reducer;
