import Vuex from 'vuex'
import {auth, GoogleProvider, TwitterProvider} from '~/plugins/firebase'

const createStore = () => {
  return new Vuex.Store({
    state: {
      sidebar: false,
      locales: ['en', 'jp'],
      locale: 'en',
      user: null,
      profile: {
        name: '',
        email: '',
        fg_exp: null
      }
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      },
      activeProfile: (state, getters) => {
        return state.profile
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
      },
      loadProfile ({commit}) {
        return new Promise((resolve) => {
          commit('setProfile', {
            name: 'test',
            email: 'test@test.com',
            fg_exp: null
          })
          resolve()
        })
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
          state.profile = {
            name: '',
            email: '',
            fg_exp: null
          }
        }
      },
      setProfile (state, payload) {
        state.profile.name = payload.name
        state.profile.email = payload.email
        state.profile.fg_exp = payload.fg_exp
      }
    }
  })
}
export default createStore
