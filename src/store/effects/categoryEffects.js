import { GetAllArticlesForCategory } from "../../services/articleService"
import { GetFiltersForCategory } from "../../services/categoryService"
import { setCategory, setCategoryFilters } from "../slices/categorySlice"

export function fetchCategoryArticlesById(id) {
    return async (dispatch, getState) => {
      try{
        const data = await GetAllArticlesForCategory(id)
        dispatch(setCategory({id:id, articles:data}))
      } catch(err) {
        dispatch(setCategory({id: 0, articles: []}))
      }
      
    }
  }

  export function fetchFiltersForCategory(id) {
    return async (dispatch, getState) => {
      try{
        const data = await GetFiltersForCategory(id)
        dispatch(setCategoryFilters(data))
      } catch(err) {
        dispatch(setCategoryFilters([]))
      }
      
    }
  }