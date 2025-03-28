// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface LessonState {
//   lessonId: number | undefined;
// }

// const initialState: LessonState = {
//   lessonId: 0,
// };

// const lessonSlice = createSlice({
//   name: "lesson",
//   initialState,
//   reducers: {
//     setLessonId: (state, action: PayloadAction<number>) => {
//       state.lessonId = action.payload;
//     },
//   },
// });

// export const { setLessonId } = lessonSlice.actions;
// export default lessonSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LessonState {
  lessonId: number | undefined;
  currentLessonIndex: number;
  totalLessons: number;
}

const initialState: LessonState = {
  lessonId: undefined,
  currentLessonIndex: 0,
  totalLessons: 0,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLessonId: (state, action: PayloadAction<number>) => {
      state.lessonId = action.payload;
    },
    setNewCurrentLessonIndex: (state, action: PayloadAction<number>) => {
      state.currentLessonIndex = action.payload;
    },
    setTotalLessons: (state, action: PayloadAction<number>) => {
      state.totalLessons = action.payload;
    },
    resetLessons: (state) => {
      state.lessonId = undefined;
      state.currentLessonIndex = 0;
      state.totalLessons = 0;
    },
  },
});

export const {
  setLessonId,
  setNewCurrentLessonIndex,
  setTotalLessons,
  resetLessons,
} = lessonSlice.actions;
export default lessonSlice.reducer;
