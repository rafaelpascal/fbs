import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.Slice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Type for the Redux store
export type RootState = ReturnType<typeof store.getState>;
// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;

export default store;
