import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myName: '',
    socket: null,
  },
  mutations: {
    setMyName(state, data) {
      state.myName = data
    },
    setSocket(state, data) {
      state.socket = data
    },
  },
  actions: {
  },
  modules: {
  }
})
