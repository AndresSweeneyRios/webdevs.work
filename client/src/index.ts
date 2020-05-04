import Vue from 'vue'

import './registerServiceWorker'

import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'

import { VNode } from 'vue/types/umd'

new Vue({
  el: '#app',
  router, 
  store, 
  mixins: [
    Vue.mixin({
      methods: {
        api,
      },
    }),
  ],
  render (h): VNode {
    return h(App)
  },
})
