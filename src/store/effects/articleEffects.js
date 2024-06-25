import { GetArticleById } from "../../services/articleService"
import { setArticle } from "../slices/articleSlice"

export function fetchArticleById(categoryId, articleId) {
    return async (dispatch, getState) => {
      const data = await GetArticleById(categoryId, articleId)
      dispatch(setArticle({id: data.id, ...data.data()}))
    }
  }