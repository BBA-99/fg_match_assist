import Vuex from 'vuex'
import {auth, DB, GoogleProvider, TwitterProvider} from '~/plugins/firebase'

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
        if (!this.state.user) {
          return
        }
        if (DB.collection('users').doc(this.state.user.uid).exists) {
          return DB.collection('users').doc(this.state.user.uid).get().then((querySnapshot) => {
            commit('setProfile', {
              name: querySnapshot.data()['name'],
              email: querySnapshot.data()['email'],
              fg_exp: querySnapshot.data()['fg_exp']
            })
          })
        } else {
          // 初めての人はログイン先から情報を持ってくる
          commit('setProfile', {
            name: this.state.user.displayName,
            email: this.state.user.email,
            fg_exp: null
          })
        }
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
