// InfoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const InfoSlice = createSlice({
  name: "Infor",
  initialState: {
    name: "",
    address: "",
    phone: "",
  },
  reducers: {
    changeInfor: (state, action) => {
      const { name, address, phone } = action.payload;
      state.name = name;
      state.address = address;
      state.phone = phone;
    },
  },
});

export const { changeInfor } = InfoSlice.actions;
export const selectInfor = (state) => state.Infor;
export default InfoSlice.reducer;
