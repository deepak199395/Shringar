import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isSignIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isSignIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.isSignIn = false;
    }

  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;