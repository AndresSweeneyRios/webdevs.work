import Vue from 'vue'
import Vuex from 'vuex'
// import db from 'localforage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },

  mutations: {
    set (state, payload): void {
      Object.assign(state, payload)
    },
  },

  actions: {
  },
})
