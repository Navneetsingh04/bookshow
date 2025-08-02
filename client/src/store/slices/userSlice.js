import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  user: null,
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

    userSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },

    userFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },

    userLogout: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { userRequest, userSuccess, userFailure, userLogout } =
  userSlice.actions;

export default userSlice.reducer;
