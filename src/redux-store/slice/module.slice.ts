import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModuleID {
  module_id: number | null; // Course ID state
}

const initialState: ModuleID = {
  module_id: null, // Initial value
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setModuleId: (state, action: PayloadAction<number>) => {
      state.module_id = action.payload;
    },
    resetModuleId: (state) => {
      state.module_id = null;
    },
  },
});

export const { setModuleId, resetModuleId } = moduleSlice.actions;

export default moduleSlice.reducer;
