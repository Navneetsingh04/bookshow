import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  wishlist: [],
  error: null,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlistRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    wishlistSuccess: (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
      state.error = null;
    },

    wishlistFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addToWishlist: (state, action) => {
      const movieExists = state.wishlist.find(
        (movie) => movie._id === action.payload._id
      );
      if (!movieExists) {
        state.wishlist.push(action.payload);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (movie) => movie._id !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const {
  wishlistRequest,
  wishlistSuccess,
  wishlistFailure,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
