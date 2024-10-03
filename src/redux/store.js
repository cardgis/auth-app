import { configureStore } from "@reduxjs/toolkit";
//import authReducer from "../features/auth/authSlice";
import authReducer from "../features/auth/authSlice"; // Utilisez le bon chemin ici

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
