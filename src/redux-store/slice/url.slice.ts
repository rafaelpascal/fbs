import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseState {
  course_url: string | null; // Course ID state
}

const initialState: CourseState = {
  course_url: null, // Initial value
};

const UrlSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseUrl: (state, action: PayloadAction<string>) => {
      state.course_url = action.payload;
    },
    resetCourseUrl: (state) => {
      state.course_url = null;
    },
  },
});

export const { setCourseUrl, resetCourseUrl } = UrlSlice.actions;

export default UrlSlice.reducer;
