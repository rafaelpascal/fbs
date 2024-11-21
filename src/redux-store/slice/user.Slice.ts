// userSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user state to match the user response structure
// Define the user state to match the user response structure
interface UserState {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  MFAType: string[];
  isActive: boolean;
  isMFAEnabled: boolean;
  lastLogin: string | null;
  permissions: Array<{ id: string; name: string }>;
  role: { roleName: string; slug: string } | null;
  loading: boolean;
  image: string | null;
}

// Initialize with default values
const initialState: UserState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  MFAType: [],
  isActive: false,
  isMFAEnabled: false,
  lastLogin: null,
  permissions: [],
  role: null,
  loading: false,
  image: null,
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
