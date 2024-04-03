export const state = () => ({
  user: null,
  roles: [],
  session: null,
  isLoggedIn: false,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setSession(state, session) {
    state.session = session
  },
  setIsLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },
  setRoles(state, roles) {
    state.roles = roles
  },
}

export const actions = {
  setUser({ commit }, auth) {
    commit('setUser', auth.user)
    commit('setRoles', auth.roles)
    commit('setSession', auth.session)
    commit('setIsLoggedIn', auth.isLoggedIn)
  },
  clearUser({ commit }) {
    commit('setUser', null)
    commit('setRoles', [])
    commit('setSession', null)
    commit('setIsLoggedIn', false)
  }
}