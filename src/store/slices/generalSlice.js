import { createSlice } from "@reduxjs/toolkit"

export const generalSlice = createSlice({
  name: 'general',
  initialState: {
    categories: []
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategories } = generalSlice.actions

export const selectCategories = (state) => state.general.categories

export default generalSlice.reducer