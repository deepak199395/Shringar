import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[],
    loading: false,
    error: null
};

const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
     productRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    productSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
    }
});

export const {
  productRequest,
  productSuccess,
  productFailure
} = productSlice.actions;
export default productSlice.reducer;