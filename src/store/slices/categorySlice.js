import { createSlice } from "@reduxjs/toolkit"

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    id: 0,
    articles: [],
    filters: [],
    filterToApplay: [],
    sortedArticles: [],
  },
  reducers: {
    setCategory: (state, action) => {
      state.id = action.payload.id
      state.articles = action.payload.articles
      state.filters = action.payload.filters ?? []
      state.sortedArticles = action.payload.articles
    },
    setFilter: (state, action) => {
      state.filterToApplay = state.filterToApplay.filter(filter => filter.name !== action.payload.name)
      state.filterToApplay.push({
        name: action.payload.name,
        value: action.payload.value
      })
    },
    removeFilter: (state, action) => {
      state.filterToApplay = state.filterToApplay.filter(filter => filter.name !== action.payload)
    },
    filterByPriceAsc: (state, action) => {
      state.sortedArticles = state.sortedArticles.sort((a, b) => a.cost > b.cost ? 1 : -1)
    },
    filterByPriceDesc: (state, action) => {
      state.sortedArticles = state.sortedArticles.sort((a, b) => a.cost < b.cost ? 1 : -1)
    },
    filterByNameAsc: (state, action) => {
      state.sortedArticles = state.sortedArticles.sort((a, b) => a.title > b.title ? 1 : -1)
    },
    filterByNameDesc: (state, action) => {
      state.sortedArticles = state.sortedArticles.sort((a, b) => a.title < b.title ? 1 : -1)
    },
    filterByPopularity: (state, action) => {
      state.sortedArticles = state.sortedArticles.sort((a, b) => a.buys < b.buys ? 1 : -1)
    },
    setCategoryFilters: (state, action) => {
      state.filters = action.payload ?? []
    }
  },
})

export const {setCategoryFilters, setCategory, filterByPriceAsc, filterByPriceDesc, filterByNameAsc, filterByNameDesc, filterByPopularity, removeFilter, setFilter } = categorySlice.actions

export const selectFilters = (state) => state.category.filters 
export const selectArticles = (state) => {
    let articles = state.category.sortedArticles
    state.category.filterToApplay.forEach(filter => {
      articles = articles.filter(article => {
        if (!Object.hasOwn(article, filter.name))
          return false
        return article[filter.name] === filter.value
      })
    });
    return articles
  }

export default categorySlice.reducer