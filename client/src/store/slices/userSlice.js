import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: {},
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Redcers Actions

    // fetching user -> upadte user payload
    userRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // on Success -> update payload

    userSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },

    // on failure -> reset the user paylaod

    userFailure: (state, action) => {
      state.loading = false;
      state.user = {}
      state.error = action.payload;
    },

    userLogout: (state) => {
      state.loading = false;
      state.user = {};
      state.error = null;
    },
  },
});

export const { userRequest, userSuccess, userFailure, userLogout } =
  userSlice.actions;

export default userSlice.reducer;
