import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isSignIn: storedUser ? true : false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    /* LOGIN */

    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isSignIn = true;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* REGISTER */

    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    registerSuccess: (state) => {
      state.loading = false;
    },

    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* LOGOUT */

    logout: (state) => {
      state.user = null;
      state.isSignIn = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

  }
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout
} = authSlice.actions;

export default authSlice.reducer;