import Vuex from 'vuex'
import {auth, GoogleProvider, TwitterProvider} from '~/plugins/firebase'

const createStore = () => {
  return new Vuex.Store({
    state: {
      sidebar: false,
      locales: ['en', 'jp'],
      locale: 'en',
      user: null,
      profile: null
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    },
    actions: {
      autoSignIn ({commit}, payload) {
        commit('setUser', payload)
      },
      signInWithTwitter ({commit}) {
        return new Promise((resolve, reject) => {
          auth.signInWithRedirect(TwitterProvider)
          resolve()
        })
      },
      signInWithGoogle ({commit}) {
        return new Promise((resolve, reject) => {
          auth.signInWithRedirect(GoogleProvider)
          resolve()
        })
      },
      signOut ({commit}) {
        return auth.signOut().then(() => {
          commit('setUser', null)
        }).catch(err => console.log(err))
      }
    },
    mutations: {
      toggleSidebar (state) {
        state.sidebar = !state.sidebar
      },
      SET_LANG (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      },
      setUser (state, payload) {
        state.user = payload
        if (!state.user) {
          state.profile = null
        }
      },
      setProfile (state, payload) {
        state.profile = payload
      }
    }
  })
}

export default createStore
