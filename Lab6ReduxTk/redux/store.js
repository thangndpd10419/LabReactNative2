import { configureStore } from "@reduxjs/toolkit";
import { api } from "./slice/apiProducts";

import CounterSlice from "../redux/slice/counterSlice";
const store = configureStore({
  reducer: {
    counter: CounterSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export default store;
