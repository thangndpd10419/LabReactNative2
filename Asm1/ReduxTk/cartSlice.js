import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const pro = { ...action.payload };
      const existingItem = state.find((item) => item._id === pro._id);

      if (existingItem) {
        if (existingItem.quantityy + pro.quantityy <= existingItem.quantity) {
          existingItem.quantityy += pro.quantityy;
        }
      } else {
        state.unshift(pro);
      }
    },

    toggleItemSelection: (state, action) => {
      const itemId = action.payload;
      const item = state.find((item) => item._id === itemId);

      if (item) {
        item.selected = !item.selected;
      }
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.find((item) => item._id === itemId);
      if (item.quantityy < item.quantity) {
        item.quantityy += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.find((item) => item._id === itemId);
      if (item && item.quantityy > 1) {
        item.quantityy -= 1;
      }
    },

    updateStock: (state, action) => {
      const { itemId, soldQuantity } = action.payload;
      const item = state.find((item) => item._id === itemId);
      if (item) {
        item.quantity -= soldQuantity;
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      return state.filter((item) => item._id !== itemId);
    },
  },
});

export const {
  addToCart,
  toggleItemSelection,
  increaseQuantity,
  decreaseQuantity,
  updateStock,
  removeItem,
} = CartSlice.actions;

export default CartSlice.reducer;
