import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  isLoggedIn: false,
  isAdmin: false,
  cart: [],
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.cart = action.payload.cart;
      state.token = action.payload.token;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      console.log("Reducer received:", action.payload);
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
      }
      console.log("Updated cart:", state.cart);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.id === action.payload.productId
      );
      if (item) item.quantity = action.payload.quantity;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.cart = [];
      state.token = null;
    },
    setToken: (state, action) => {
      console.log("Look here", action);
      state.token = action.payload;
    },
  },
});

export const {
  setUser,
  setIsLoggedIn,
  setCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  logout,
  setToken,
} = userSlice.actions;

export const getUserID = (state) => state.user.user?.id;
export const getToken = (state) => state.user.token;
export const getCart = (state) => state.user.cart;
export const getIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
