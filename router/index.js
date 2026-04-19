import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registro from '../views/Registro.vue'
import Favoritos from '../views/Favoritos.vue'
import Perfil from '../views/Perfil.vue'
import Clima from '../views/Clima.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/registro', name: 'Registro', component: Registro },
  { path: '/clima/:ciudad', name: 'Clima', component: Clima },
  {
    path: '/favoritos',
    name: 'Favoritos',
    component: Favoritos,
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
