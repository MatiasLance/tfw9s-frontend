export const state = () => ({
  totalItems: 0,
  totalCategories: 0,
  selectedCategories: [],
})

export const mutations = {
  setTotalItems(state, totalItems) {
    state.totalItems = totalItems
  },
  setTotalCategories(state, totalCategories) {
    state.totalCategories = totalCategories
  },
  addSelectedCategory(state, id) {
    const index = state.selectedCategories.indexOf(id)
    if (!index > -1) {
      state.selectedCategories.push(id)
    }
  },
  removeSelectedCategory(state, id) {
    const index = state.selectedCategories.indexOf(id)
    if (index > -1) {
      state.selectedCategories.splice(index, 1)
    }
  },
  clearSelectedCategory(state) {
    state.selectedCategories = []
  }
}