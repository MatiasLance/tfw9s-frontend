export const state = () => ({
  q: '',
  sortBy: 'latest',
  page: 1,
  selectedCategory: null,
  categories: [],
  paymentIntent: null,
})

export const mutations = {
  setSortBy(state, sortBy) {
    state.sortBy = sortBy
  },
  setQuery(state, query) {
    state.q = query
  },
  setPage(state, page) {
    state.page = page
  },
  setSelectedCategory(state, category) {
    state.selectedCategory = category
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setPaymentIntent(state, paymentIntent) {
    state.paymentIntent = paymentIntent
  },
}