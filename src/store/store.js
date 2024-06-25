import { configureStore } from '@reduxjs/toolkit'
import generalReducer from './slices/generalSlice'
import articleSlice from './slices/articleSlice'
import categorySlice from './slices/categorySlice'
import cartSlice from './slices/cartSlice'

export default configureStore({
  reducer: {
    general: generalReducer,
    article: articleSlice,
    category: categorySlice,
    cart: cartSlice,
  },
})