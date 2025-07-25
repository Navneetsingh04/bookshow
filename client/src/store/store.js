import { configureStore } from "@reduxjs/toolkit";

import popUpReducer from "./slices/popUpSlice";
import bookingReducer from "./slices/bookingSlice";
import userReducer from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    popup: popUpReducer,
    user : userReducer,
    booking : bookingReducer,
  },
});
