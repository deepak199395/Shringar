import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
  order: null,
  orders: []
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {

    createOrderRequest: (state) => {
      state.loading = true;
    },

    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },

    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchOrdersRequest: (state) => {
      state.loading = true;
    },

    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },

    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure
} = orderSlice.actions;

export default orderSlice.reducer;