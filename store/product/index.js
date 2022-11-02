// store/product/index.js

export const state = () => ({
  name: '',
  price: '',
  description: '',
  categories: [],
  inStock: '',
  tags: [],
  tagData: [],
  photo: ''
})

export const mutations = {
  addCategory(state, categories) {
    state.categories.push(Object.assign({}, categories))
  },
  removeCategory(state, { index }) {
    state.categories.splice(index, 1)
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  addTags(state, tags) {
    state.tags.push(Object.assign({}, tags))
  },
  removeTags(state, { index }) {
    state.tags.splice(index, 1)
  },
  setTags(state, tags) {
    state.tags = tags
  },
  setTagData(state, tagData) {
    state.tagData = tagData
  },
  setName(state, name) {
    state.name = name
  },
  setPrice(state, price) {
    state.price = price
  },
  setDescription(state, description) {
    state.description = description
  },
  setInStock(state, inStock) {
    state.inStock = inStock
  },
  setPhoto(state, photo) {
    state.photo = photo
  },
}

export const actions = {
  setProduct({ commit }, product) {
    commit('setName', product.name)
    commit('setPrice', product.price)
    commit('setDescription', product.description)
    commit('setInStock', product.inStock)
    commit('setCategories', product.categories)
    commit('setTags', product.tags)
    commit('setPhoto', product.photo)
  },
  clearProduct({ commit }) {
    commit('setName', '')
    commit('setPrice', '')
    commit('setDescription', '')
    commit('setInStock', '')
    commit('setTags', [])
    commit('setPhoto', '')
  }
}