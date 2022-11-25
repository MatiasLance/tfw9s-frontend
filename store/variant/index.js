// store/variant/index.js

export const state = () => ({
  name: '',
  elements: []
})

export const mutations = {
  addElements(state, elements) {
    state.elements.push(Object.assign({}, elements))
  },
  setName(state, name) {
    state.name = name
  },
  setElements(state, elements) {
    state.elements = elements
  }
}

export const actions = {
  setVariant({ commit }, variant) {
    commit('setName', variant.name)
    commit('addElements', variant.elements)
  },
  clearVariant({ commit }) {
    commit('setName', '')
    commit('addElements', [])
  }
}