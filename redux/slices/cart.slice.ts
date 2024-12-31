import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem, CartState } from "@/types";

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalTax: 0,
  subtotal: 0,
  discount: 0,
  shipping: 0,
  total: 0,
};

// function to format numbers to 2 decimal places
const formatNumber = (num: number) => Number(num.toFixed(2));

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity++;

        existingItem.subtotal = formatNumber(
          existingItem.quantity *
            existingItem.price *
            (1 - existingItem.discount / 100)
        );
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          subtotal: formatNumber(
            action.payload.price * (1 - action.payload.discount / 100)
          ),

          isEditingDiscount: false,
        });
      }

      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalTax = formatNumber(
        state.items.reduce(
          (total, item) =>
            total + ((item.price * item.tax) / 100) * item.quantity,
          0
        )
      );
      state.subtotal = formatNumber(
        state.items.reduce((total, item) => total + item.subtotal, 0)
      );
      state.total = formatNumber(
        state.subtotal + state.shipping + state.totalTax - state.discount
      );
    },
    updateItemDiscount: (
      state,
      action: PayloadAction<{ productId: number; discount: number }>
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.discount = action.payload.discount;
        item.subtotal = formatNumber(
          item.quantity * item.price * (1 - item.discount / 100)
        );
        state.subtotal = formatNumber(
          state.items.reduce((total, item) => total + item.subtotal, 0)
        );
        state.total = formatNumber(
          state.subtotal + state.shipping + state.totalTax - state.discount
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalTax = formatNumber(
        state.items.reduce(
          (total, item) =>
            total + ((item.price * item.tax) / 100) * item.quantity,
          0
        )
      );
      state.subtotal = formatNumber(
        state.items.reduce((total, item) => total + item.subtotal, 0)
      );
      state.total = formatNumber(
        state.subtotal + state.shipping + state.totalTax - state.discount
      );
    },
    updateCartDiscount: (state, action: PayloadAction<number>) => {
      state.discount = formatNumber(action.payload);
      state.total = formatNumber(
        (state.subtotal + state.totalTax + state.shipping) *
          (1 - state.discount / 100)
      );
    },
    updateShipping: (state, action: PayloadAction<number>) => {
      state.shipping = formatNumber(action.payload);
      state.total = formatNumber(
        state.subtotal + state.shipping + state.totalTax - state.discount
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        item.subtotal = formatNumber(
          item.quantity * item.price * (1 - item.discount / 100)
        );
        state.totalTax = formatNumber(
          state.items.reduce(
            (total, item) =>
              total + ((item.price * item.tax) / 100) * item.quantity,
            0
          )
        );
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.subtotal = formatNumber(
          state.items.reduce((total, item) => total + item.subtotal, 0)
        );
        state.total = formatNumber(
          state.subtotal + state.shipping + state.totalTax - state.discount
        );
      }
    },
    toggleDiscountEdit: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.productId === action.payload
      );
      if (item) {
        item.isEditingDiscount = !item.isEditingDiscount;
      }
    },
    resetCart: (state) => {
      return initialState;
    },
  },
});

export const {
  addToCart,
  updateItemDiscount,
  removeFromCart,
  updateCartDiscount,
  updateShipping,
  resetCart,
  updateQuantity,
  toggleDiscountEdit,
} = cartSlice.actions;
export default cartSlice.reducer;
