import { createSlice } from "@reduxjs/toolkit"

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    categories: [],
    popularCategories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setPopularCategorys : (state, action) => {
      state.popularCategories = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategories, setPopularCategorys } = generalSlice.actions

export const selectCategories = (state) => state.general.categories
export const selectPopularCategories = (state) => state.general.popularCategories

export default generalSlice.reducer