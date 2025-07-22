import { configureStore } from "@reduxjs/toolkit";

import popUpReducer from "./slices/popUpSlice";

export const store = configureStore({
  reducer: {
    popup: popUpReducer,
  },
});
