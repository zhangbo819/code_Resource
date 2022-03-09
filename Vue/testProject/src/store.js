import Vue from "vue";
import Vuex from "vuex";
// import Vuex from "./kvuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    cancel: {},
  },
  mutations: {
    increment(state, n = 1) {
      state.count += n;
    },

    // axios
    CANCEL(state, { funNames = [], msg = "用户手动取消网络请求" }) {
      if (!Object.keys(state.cancel).length) {
        return false
      }
      for (const key in state.cancel) {
        if (state.cancel.hasOwnProperty(key)) {
          if (funNames.includes(key)) {
            if (!state.cancel[key].response) {
              state.cancel[key].cancel(msg);
              state.cancel[key].response = true;
            }
          }
        } else {
          return false
        }
      }
    },
    SET_CANCEL(state, { cancel, funName }) {
      state.cancel[funName] = { cancel, response: false };
    },
    RESPONSE(state, funName) {
      if (Object.keys(state.cancel).includes(funName)) {
        state.cancel[funName].response = true;
      }
    },
  },
  getters: {
    score(state) {
      return `共扔出：${state.count}`;
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment", 2);
      }, 1000);
    },

    // axios
    setCancel({ commit }, { cancel, funName }) {
      console.log('funName', funName)
      commit('SET_CANCEL', { cancel, funName })
    },
    response({ commit }, res) {
      console.log('response', res)
      commit('RESPONSE', res)
    },
    cancel({ commit }, res) {
      commit('CANCEL', res)
    }
  }
});
