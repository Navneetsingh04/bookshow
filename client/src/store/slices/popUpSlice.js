import { createSlice } from "@reduxjs/toolkit";

const popUpSlice = createSlice({
  name: "popup",
  initialState: {
    registerPopup: false,
    loginPopup: false,
  },
  reducers: {
    toggleRegisterPopup: (state) => {
      state.registerPopup = !state.registerPopup;
    },
    toggleLoginPopup: (state) => {
      state.loginPopup = !state.loginPopup;
    },
    closeRegisterPopup: (state) => {
      state.registerPopup = false;
    },
    closeLoginPopup: (state) => {
      state.loginPopup = false;
    },
    closeAllPopups: (state) => {
      state.registerPopup = false;
      state.loginPopup = false;
    },
  },
});

export const { 
  toggleLoginPopup, 
  toggleRegisterPopup, 
  closeLoginPopup, 
  closeRegisterPopup, 
  closeAllPopups 
} = popUpSlice.actions;
export default popUpSlice.reducer;
