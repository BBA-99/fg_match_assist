<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-avatar
        :size= "avatarSize"
        v-if="$store.state.user"
      >
        <img :src="$store.state.user.photoURL" alt="image">
      </v-avatar>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          :label="nameLavel"
          v-model="name"
          :rules="nameRules"
          :counter="15"
          required
        ></v-text-field>
        <v-text-field
          label="E-mail"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-select
          :label="fg_expLavel"
          v-model="fg_exp"
          item-text='display'
          item-value="value"
          :items="fg_exp_items"
          :rules="fg_expRules"
          required
        ></v-select>
        <v-select
          :label="regionLavel"
          v-model="region"
          item-text='display'
          item-value="value"
          :items="region_items"
          :rules="regionRules"
          required
        ></v-select>
        <v-btn
          @click="submit"
          :disabled="!valid"
        >
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import {DB} from '~/plugins/firebase'

export default {
  data () {
    return {
      valid: true,
      avatarSize: '100px',
      name: this.$store.state.profile.name,
      nameLavel: this.$t('profile.displayName.lavel'),
      nameRules: [
        (v) => !!v || this.$t('profile.displayName.required'),
        (v) => (v && v.length <= 15) || this.$t('profile.displayName.format')
      ],
      email: this.$store.state.profile.email,
      emailLavel: this.$t('profile.e-mail.lavel'),
      emailRules: [
        (v) => !!v || this.$t('profile.e-mail.required'),
        (v) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) || this.$t('profile.e-mail.format') // eslint-disable-line
      ],
      fg_exp: this.$store.state.profile.fg_exp,
      fg_expLavel: this.$t('profile.fg_exp.lavel'),
      fg_exp_items: [
        { display: 'Less than 1 year', value: -1 },
        { display: '1 year', value: 1 },
        { display: '2 years', value: 2 },
        { display: '3 years', value: 3 },
        { display: '4 years', value: 4 },
        { display: '5 years', value: 5 },
        { display: '6 years', value: 6 },
        { display: '7 years', value: 7 },
        { display: '8 years', value: 8 },
        { display: '9 years', value: 9 },
        { display: 'Over 10 years', value: 10 }
      ],
      fg_expRules: [ (v) => !!v || this.$t('profile.fg_exp.required') ],
      region: this.$store.state.profile.region,
      regionLavel: this.$t('profile.region.lavel'),
      region_items: [],
      regionRules: [ (v) => !!v || this.$t('profile.region.required') ]
    }
  },
  async fetch (context) {
    if (!context.store.state.user) {
      return context.redirect('/signIn')
    }
    await context.store.dispatch('loadProfile')
  },
  computed: {
    activeUser () { return this.$store.getters.activeUser },
    activeProfile () { return this.$store.getters.activeProfile }
  },
  methods: {
    submit () {
      if (!this.$store.state.user) {
        // 未ログインならリダイレクト
        this.$router.replace({ path: '/signIn' })
      }
      if (this.$refs.form.validate()) {
        // 更新登録処理
        this.$store.commit('setProfile', {
          name: this.name,
          email: this.email,
          fg_exp: this.fg_exp
        })
        DB.collection('users').doc(this.$store.state.user.uid).set({
          name: this.name,
          email: this.email,
          fg_exp: this.fg_exp
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>