import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LessonState {
  lessonId: number | undefined;
}

const initialState: LessonState = {
  lessonId: 0,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLessonId: (state, action: PayloadAction<number>) => {
      state.lessonId = action.payload;
    },
  },
});

export const { setLessonId } = lessonSlice.actions;
export default lessonSlice.reducer;
