// src/redux/slices/booleanSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BooleanState {
  value: boolean;
}

const initialState: BooleanState = {
  value: false, // or true, depending on the initial state you want
};

const booleanSlice = createSlice({
  name: "boolean",
  initialState,
  reducers: {
    setBooleanState: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setBooleanState } = booleanSlice.actions;

export default booleanSlice.reducer;
