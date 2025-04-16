// userSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  userid: number;
  firstname: string;
  lastname: string;
  email: string;
  role?: number;
  loading: boolean;
}

// Initialize with default values
const initialState: UserState = {
  userid: 0,
  firstname: "",
  lastname: "",
  email: "",
  role: 0,
  loading: false,
};

// Define the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      state.loading = false;
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return initialState;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    unsetLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading, unsetLoading } =
  userSlice.actions;
export default userSlice.reducer;
