import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.items.find(i => i._id === item._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    // ➕ INCREASE
    increaseQty: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item) item.quantity += 1;
    },

    // ➖ DECREASE
    decreaseQty: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i._id !== action.payload);
        }
      }
    },

    // 🗑 REMOVE
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
    },

    // 🔥 CLEAR CART (ADD THIS)
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart   // ✅ export it
} = cartSlice.actions;

export default cartSlice.reducer;