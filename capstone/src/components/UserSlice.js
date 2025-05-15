import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: null,
  name: null,
  mailing_address: null,
  token: null,
  is_admin: false,
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.mailing_address = action.payload.mailing_address;
      state.is_admin = action.payload?.is_admin || false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.name = null;
      state.mailing_address = null;
      state.token = null;
      state.is_admin = false;
      // Keep cart in state even after logout
    },
  },
});

export const { setUser, setToken, setCart, logout } = userSlice.actions;

export const getUser = (state) => ({
  id: state.user.id,
  username: state.user.username,
  name: state.user.name,
  mailing_address: state.user.mailing_address,
  is_admin: state.user.is_admin,
});
export const getToken = (state) => state.user.token;
export const getIsAdmin = (state) => state.user.is_admin;
export const getCart = (state) => state.user.cart;

export default userSlice.reducer;
