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
      {{$t('default.signOutDone')}}
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
      <v-menu>
        <v-btn outline round slot="activator" >
          <svg v-if="lang=='en'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="60" height="30">
            <clipPath id="t">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
            </clipPath>
            <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#cf142b" stroke-width="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" stroke-width="6"/>
          </svg>
          <svg v-if="lang=='jp'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="60" height="30">
            <rect fill="#fff" height="700" width="1000"/>
            <circle fill="#b0313f" cx="490" cy="350" r="210"/>
          </svg>
        </v-btn>
        <v-list>
          <v-list-tile v-model="lang" v-for="item in langItems" v-bind:key="item.value">
            <v-list-tile-title v-on:click="changeLang(item.value)">{{item.display}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
          { icon: 'home', title: this.$t('default.welcome'), to: '/' },
          { icon: 'person', title: this.$t('default.signIn'), to: '/signIn' },
          { icon: 'person', title: this.$t('default.profile'), to: '/profile' },
          { icon: 'public', title: this.$t('default.createRoom'), to: '/createRoom' },
          { icon: 'search', title: this.$t('default.search'), to: '/search' },
          { icon: 'favorite', title: this.$t('default.donation'), to: '/donation' },
          { icon: 'filter_list', title: this.$t('default.exclusionList'), to: '/exclusionlist' }
        ],
        miniVariant: false,
        right: true,
        menu: false,
        title: 'FG Matching Assist',
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
      },
      changeLang (lang) {
        console.log('changeLang')
        console.log(lang)
        location.href = (this.$router.currentRoute.path + '?locale=' + lang)
        // this.$router.push(this.$router.currentRoute.path + '?locale=' + lang)
      }
    }
  }
</script>
