import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Authentication";
import { userSlice } from "./UserData";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
