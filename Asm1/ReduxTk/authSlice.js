import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
    },
    loginUser: (state, action) => {
      if (
        state.user &&
        state.user.username === action.payload.username &&
        state.user.password === action.payload.password
      ) {
        return { ...state, isAuthenticated: true };
      } else {
        return { ...state, isAuthenticated: false };
      }
    },
  },
});

export const { registerUser, loginUser } = authSlice.actions;
export default authSlice.reducer;
