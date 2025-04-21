import { createSlice } from "@reduxjs/toolkit";

const NotifiSlice = createSlice({
  name: "Notifi",
  initialState: [],

  reducers: {
    addNotifi: (state, action) => {
      const newOrder = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        items: Array.isArray(action.payload)
          ? action.payload
          : [action.payload],
      };
      state.unshift(newOrder);
    },
  },
});

export const { addNotifi } = NotifiSlice.actions;
export default NotifiSlice.reducer;
