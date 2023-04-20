import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
  },
  mutations: {
    TOGGLE_COUNT: (state, device) => {
      state.count = device
    }
  },
  actions: {
    toggleCount({ commit }, count) {
      commit('TOGGLE_COUNT', count)
    }
  },
  modules: {
  }
})
