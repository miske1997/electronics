import { createSlice } from "@reduxjs/toolkit"

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    id: 0,
    articles: [],
    filters: [],
    filterToApplay: [],
    sortedArticles: [],
    category: { name: "", id: "" }
  },
  reducers: {
    setCategory: (state, action) => {
      state.id = action.payload.id
      state.articles = action.payload.articles
      state.filters = action.payload.filters ?? []
      state.sortedArticles = action.payload.articles
    },
    setCategoryData: (state, action) => {
      state.category = action.payload
    },
    setFilter: (state, action) => {
      let apended = false
      let exist = false
      state.filterToApplay.forEach(filter => {
        if (filter.name === action.payload.name) {
          if (filter.options.includes(action.payload.value)) {
            exist = true
          }
          else {
            filter.options.push(action.payload.value)
            apended = true
          }
        }
      })
      if (!apended && !exist) {
        state.filterToApplay.push({
          name: action.payload.name,
          options: [action.payload.value]
        })
      }
    },
    removeFilter: (state, action) => {
      let removed = false
      state.filterToApplay.forEach(filter => {
        if (filter.name === action.payload.name) {
          filter.options = filter.options.filter(option => option !== action.payload.value)
          if (filter.options.length === 0) {
            removed = true
          }
        }
      })
      if (removed)
        state.filterToApplay = state.filterToApplay.filter(filter => filter.name !== action.payload.name)
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

export const { setCategoryFilters, setCategory, setCategoryData, filterByPriceAsc, filterByPriceDesc, filterByNameAsc, filterByNameDesc, filterByPopularity, removeFilter, setFilter } = categorySlice.actions


export const selectCategory = (state) => state.category.category
export const selectFilters = (state) => state.category.filters
export const selectCheckedFilters = (state) => state.category.filterToApplay
export const selectArticles = (state) => {
  let articles = state.category.sortedArticles
  state.category.filterToApplay.forEach(filter => {
    articles = articles.filter(article => {
      if (!Object.hasOwn(article, filter.name))
        return false
      return filter.options.includes(article[filter.name])
    })
  });
  return articles
}

export default categorySlice.reducer