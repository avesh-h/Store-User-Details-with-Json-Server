import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false };

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, { payload }) {
      if (payload.email.includes("@") && payload.password.length > 5) {
        state = !state.isLoggedIn;
        localStorage.setItem("isLoggedIn", state);
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const authActions = authSlice.actions;
