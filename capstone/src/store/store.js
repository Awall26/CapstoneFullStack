import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/API";
import userReducer from "../components/UserSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
