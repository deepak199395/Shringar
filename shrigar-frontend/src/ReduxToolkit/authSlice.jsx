import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isSignIn: storedUser ? true : false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isSignIn = true;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    logout: (state) => {
      state.user = null;
      state.isSignIn = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;