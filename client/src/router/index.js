import Vue from 'vue'
import VueRouter from 'vue-router'
import Play from '../views/Play.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/play',
    name: 'Play',
    component: Play
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
