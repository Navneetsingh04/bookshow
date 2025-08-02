import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: {},
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // Reducer Actions

    createBooking: (state, action) => {
      state.current = {
        bookingId: action.movieId,
      };
    },

    updateBooking: (state, action) => {
      state.current = {
        ...state.current,
        ...action,
      };
    },
    resetBooking: (state) => {
      state = initialState;
    },
  },
});

export const { createBooking, updateBooking, resetBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;
