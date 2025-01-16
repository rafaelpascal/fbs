import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for FormRequirement
type FormRequirement = {
  id: number;
  course_id: number;
  requirements: string;
  requirement_text: string;
};

// Define the slice state structure
interface FormRequirementsState {
  form_requirements: FormRequirement[];
}

// Initial state
const initialState: FormRequirementsState = {
  form_requirements: [],
};

// Create the slice
const formRequirementsSlice = createSlice({
  name: "formRequirements",
  initialState,
  reducers: {
    setFormRequirements: (state, action: PayloadAction<FormRequirement[]>) => {
      state.form_requirements = action.payload;
    },
  },
});

// Export the action and reducer
export const { setFormRequirements } = formRequirementsSlice.actions;
export default formRequirementsSlice.reducer;
