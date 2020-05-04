import Vue from 'vue'
import VueRouter from 'vue-router'
// import Chat from '../views/Chat.vue'
import NotFound from '../views/404.vue'

import BlankLayout from '@/layouts/Blank.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    layout: BlankLayout,
    component: NotFound,
  },
  {
    path: '/jobs',
    name: 'Jobs',
    // component: Jobs,
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "jobs" */ '../views/Jobs.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    layout: BlankLayout,
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    layout: BlankLayout,
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
