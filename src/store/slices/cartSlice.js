import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    articles: [],
  },
  reducers: {
    addArticleToCart: (state, action) => {
      state.articles.push(action.payload)
    },
    removeArticleFromCart: (state, action) => {
      state.articles = state.articles.filter(article => article.id !== action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addArticleToCart, removeArticleFromCart } = cartSlice.actions

export const selectArticlesInCart = (state) => state.cart.articles

export default cartSlice.reducer