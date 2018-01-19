<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile 
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-snackbar
      :timeout=3000
      :top = true
      :right = true
      v-model="snackbar"
    >
      You signed out
    </v-snackbar>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn 
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select
        v-model="lang"
        :items="langItems"
        item-text='display'
        item-value="value"
        single-line
        bottom
      >
      </v-select>
      <div v-if="user" id="user" class="text-xs-center">
        <v-menu
          offset-x
          :close-on-content-click="false"
          :nudge-top="200"
          v-model="menu">
          <v-btn icon slot="activator"><v-icon medium>settings</v-icon></v-btn>
            <v-card>
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img :src="$store.state.user.photoURL" alt="John">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-if="user.displayName">{{user.displayName}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>

                <v-list-tile>
                  <v-spacer></v-spacer>
                  <v-list-tile-action>
                    <v-btn primary class="mt-2" color="primary" @click.native="signOut">
                      {{$t('default.signOut')}}
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card>
        </v-menu>

      </div>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'home', title: 'Welcome', to: '/' },
          { icon: 'person', title: 'Sign-In', to: '/signIn' },
          { icon: 'person', title: 'profile', to: '/profile' },
          { icon: 'public', title: 'CreateRoom', to: '/createroom' },
          { icon: 'search', title: 'Search', to: '/search' },
          { icon: 'favorite', title: 'Donation', to: '/donation' },
          { icon: 'filter_list', title: 'Exclusion-List', to: '/exclusionlist' }
        ],
        miniVariant: false,
        right: true,
        menu: false,
        title: 'fg Matching Assist',
        snackbar: false,
        langItems: [
          { display: 'Japanese', value: 'jp' },
          { display: 'English', value: 'en' }
        ]
      }
    },
    computed: {
      user () {
        return this.$store.getters.activeUser
      },
      lang: {
        get () {
          return this.$store.state.locale
        },
        set (value) {
          this.$store.commit('SET_LANG', value)
        }
      }
    },
    methods: {
      signOut () {
        this.snackbar = true
        this.$store.dispatch('signOut').then(() => this.$router.replace({ path: '/signIn' }))
      }
    }
  }
</script>
