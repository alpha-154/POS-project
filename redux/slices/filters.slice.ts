import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FiltersState {
  warehouseId: number | null
  categoryName: string | null
  brandName: string | null
}

const initialState: FiltersState = {
  warehouseId: null,
  categoryName: null,
  brandName: null
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setWarehouseFilter: (state, action: PayloadAction<number | null>) => {
      state.warehouseId = action.payload
    },
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.categoryName = action.payload
    },
    setBrandFilter: (state, action: PayloadAction<string | null>) => {
      state.brandName = action.payload
    },
    resetFilters: (state) => {
      return initialState
    }
  }
})

export const { 
  setWarehouseFilter, 
  setCategoryFilter, 
  setBrandFilter, 
  resetFilters 
} = filtersSlice.actions
export default filtersSlice.reducer

