import { createSlice } from "@reduxjs/toolkit"

export const articlelSlice = createSlice({
  name: 'article',
  initialState: {
    article: {
      id: 0,
      title: '',
      text: '',
      description: '',
      specification: '',
    }
  },
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setArticle } = articlelSlice.actions

export const selectArticle = (state) => state.article.article

export default articlelSlice.reducer