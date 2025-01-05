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
      state.course_id = action.payload; // Set the course_id
    },
    resetCourseId: (state) => {
      state.course_id = null; // Reset the course_id to null
    },
  },
});

export const { setCourseId, resetCourseId } = courseSlice.actions;

export default courseSlice.reducer;
