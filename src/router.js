import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Order from './views/Order.vue'
import History from './views/History.vue'
import HistoryAll from './views/HistoryAll.vue'
import Pay from './views/Pay.vue'
import Auth from './views/Auth.vue'
import auth from '@/auth'
Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: { requireAuth: true }
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      meta: { requireAuth: true }
    },
    {
      path: '/historyall',
      name: 'historyall',
      component: HistoryAll,
      meta: { requireAuth: true }
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay,
      meta: { requireAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      meta: { guestOnly: true } },
    { path: '/home',
      name: 'home',
      component: Home,
      meta: { requireAuth: true }
    },
    { path: '*', redirect: '/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.user()
  let requireAuth = to.matched.some(record => record.meta.requireAuth)
  let guestOnly = to.matched.some(record => record.meta.guestOnly)

  if (requireAuth && !currentUser) next('auth')
  else if (guestOnly && currentUser) next('dashboard')
  else next()
})
