import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user.Slice";
import courseReducer from "./slice/course.slice";
import courseUrlReducer from "./slice/url.slice";
import formRequirementsReducer from "./slice/form_requirements.slice";
import lessonReducer from "./slice/lessonSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    url: courseUrlReducer,
    formRequirements: formRequirementsReducer,
    lesson: lessonReducer,
  },
});

// Type for the Redux store
export type RootState = ReturnType<typeof store.getState>;
// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;

export default store;
