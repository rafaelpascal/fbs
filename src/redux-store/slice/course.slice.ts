import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseState {
  course_id: number | null; // Course ID state
}

const initialState: CourseState = {
  course_id: null, // Initial value
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseId: (state, action: PayloadAction<number>) => {
      state.course_id = action.payload;
    },
    resetCourseId: (state) => {
      state.course_id = null;
    },
  },
});

export const { setCourseId, resetCourseId } = courseSlice.actions;

export default courseSlice.reducer;
