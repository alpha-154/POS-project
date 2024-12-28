import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import productData from "@/mockData/productData.json";
import { Product, ProductsState } from "@/types";

const initialState: ProductsState = {
  items: productData.products,
  currentPage: 1,
  itemsPerPage: 6,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setSearchProduct: (state, action: PayloadAction<Product>) => {
      state.items = [action.payload];
    },
    setClearSearch: (state) => {
      state.items = productData.products;
    },
  },
});

export const { setProducts, setCurrentPage, setSearchProduct, setClearSearch } =
  productsSlice.actions;
export default productsSlice.reducer;
