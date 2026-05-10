import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collections: [],
  loading: false,
  error: null
};

const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {

    collectionRequest: (state) => {
      state.loading = true;
    },

    collectionSuccess: (state, action) => {
      state.loading = false;
      state.collections = action.payload;
    },

    collectionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  collectionRequest,
  collectionSuccess,
  collectionFailure
} = collectionSlice.actions;

export default collectionSlice.reducer;