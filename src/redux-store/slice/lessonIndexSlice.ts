import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LessonState {
  currentLessonIndex: number;
  totalLessons: number;
}

const initialState: LessonState = {
  currentLessonIndex: 0,
  totalLessons: 0,
};

const lessonIndexSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setCurrentLessonIndex: (state, action: PayloadAction<number>) => {
      state.currentLessonIndex = action.payload;
    },
    setTotalLessons: (state, action: PayloadAction<number>) => {
      state.totalLessons = action.payload;
    },
    resetLessons: (state) => {
      state.currentLessonIndex = 0;
      state.totalLessons = 0;
    },
  },
});

export const { setCurrentLessonIndex, setTotalLessons, resetLessons } =
  lessonIndexSlice.actions;
export default lessonIndexSlice.reducer;
