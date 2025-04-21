import { createSlice } from "@reduxjs/toolkit";
const initial = 4;

const CounterSlice = createSlice({
  name: "counter",
  initialState: { value: initial },
  reducers: {
    tang: (state) => {
      state.value += 1;
    },
    giam: (state) => {
      state.value -= 1;
    },
    binhPhuong: (state) => {
      state.value = state.value * state.value;
    },
    set: (state) => {
      state.value = initial;
    },
  },
});

export const { tang, giam, binhPhuong, set } = CounterSlice.actions;
export default CounterSlice.reducer;
