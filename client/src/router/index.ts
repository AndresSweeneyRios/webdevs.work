import Vue from 'vue'
import VueRouter from 'vue-router'
// import Chat from '../views/Chat.vue'
import NotFound from '../views/404.vue'

import BlankLayout from '@/layouts/Blank.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/jobs',
    name: 'Jobs',
    // component: Jobs,
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "jobs" */ '../views/Jobs/index.vue'),
  },
  {
    path: '/jobs/post',
    name: 'PostJob',
    // component: PostJob,
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "postjob" */ '../views/Jobs/Post.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
  },
  {
    path: '*',
    name: '404',
    layout: BlankLayout,
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: '/',
  routes,
})

export default router
