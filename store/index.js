import {auth, GoogleProvider} from '~/plugins/firebase'

export const state = () => ({
  sidebar: false,
  locales: ['en', 'jp'],
  locale: 'en',
  user: null
})

export const getters = {
  activeUser: (state, getters) => {
    return state.user
  }
}

export const actions = {
  autoSignIn ({commit}, payload) {
    commit('setUser', payload)
  },
  signInWithGoogle ({commit}) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider)
      resolve()
    })
  },
  signOut ({commit}) {
    auth.signOut().then(() => {
      commit('setUser', null)
    }).catch(err => console.log(err))
  }
}

export const mutations = {
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
  }
}
