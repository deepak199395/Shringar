import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {

    createOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    createOrderSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },

    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure
} = orderSlice.actions;

export default orderSlice.reducer;