import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/slices/cart.slice"
import productsReducer from "@/redux/slices/products.slice"
import filtersReducer from  "@/redux/slices/filters.slice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;