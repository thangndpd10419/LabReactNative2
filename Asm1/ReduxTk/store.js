// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { api } from "./apiSlice";
import CartSlice from "./cartSlice";
import InforSlice from "./infoSlice";
import NotifiSlice from "./notifiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: CartSlice,
    Infor: InforSlice,
    Notifi: NotifiSlice,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
