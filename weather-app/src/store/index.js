import { createStore } from 'vuex'
import { loginMock, registerMock } from '../services/authService'

const stored = localStorage.getItem('weather_user')

export default createStore({
  state: {
    usuario: stored ? JSON.parse(stored) : null,
    isAuthenticated: !!stored,
    loadingAuth: false,
    errorAuth: null
  },

  getters: {
    usuario: s => s.usuario,
    isAuthenticated: s => s.isAuthenticated,
    loadingAuth: s => s.loadingAuth,
    errorAuth: s => s.errorAuth,
    preferencias: s => s.usuario?.preferencias || { unidad: 'C', tema: 'dark' },
    favoritos: s => s.usuario?.favoritos || []
  },

  mutations: {
    SET_USUARIO(state, usuario) {
      state.usuario = usuario
      state.isAuthenticated = true
      state.errorAuth = null
      localStorage.setItem('weather_user', JSON.stringify(usuario))
    },
    LOGOUT(state) {
      state.usuario = null
      state.isAuthenticated = false
      localStorage.removeItem('weather_user')
    },
    SET_LOADING(state, val) {
      state.loadingAuth = val
    },
    SET_ERROR(state, msg) {
      state.errorAuth = msg
    },
    UPDATE_PREFERENCIAS(state, prefs) {
      if (state.usuario) {
        state.usuario.preferencias = { ...state.usuario.preferencias, ...prefs }
        localStorage.setItem('weather_user', JSON.stringify(state.usuario))
      }
    },
    ADD_FAVORITO(state, ciudad) {
      if (state.usuario && !state.usuario.favoritos.includes(ciudad)) {
        state.usuario.favoritos.push(ciudad)
        localStorage.setItem('weather_user', JSON.stringify(state.usuario))
      }
    },
    REMOVE_FAVORITO(state, ciudad) {
      if (state.usuario) {
        state.usuario.favoritos = state.usuario.favoritos.filter(f => f !== ciudad)
        localStorage.setItem('weather_user', JSON.stringify(state.usuario))
      }
    }
  },

  actions: {
    async login({ commit }, { email, password }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const usuario = await loginMock(email, password)
        commit('SET_USUARIO', usuario)
        return true
      } catch (e) {
        commit('SET_ERROR', e.message)
        return false
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async register({ commit }, { nombre, email, password }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      try {
        const usuario = await registerMock(nombre, email, password)
        commit('SET_USUARIO', usuario)
        return true
      } catch (e) {
        commit('SET_ERROR', e.message)
        return false
      } finally {
        commit('SET_LOADING', false)
      }
    },

    logout({ commit }) {
      commit('LOGOUT')
    }
  }
})
