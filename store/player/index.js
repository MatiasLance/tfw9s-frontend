// store/player/index.js
export const state = () => ({
  currentPlayerCount: 0,
  maxPlayerCount: 0
});

export const mutations = {
  SET_CURRENT_PLAYER_COUNT(state, count) {
    state.currentPlayerCount = count
  },
  SET_MAX_PLAYER_COUNT(state, count) {
    state.maxPlayerCount = count
  }
};

export const getters = {
  maxPlayerCount: state => state.maxPlayerCount,
  currentPlayerCount: state => state.currentPlayerCount,
  isPlayerLimitReached: state => {
    return state.currentPlayerCount >= state.maxPlayerCount
  }
}