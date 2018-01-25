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
        <v-text-field
          :label="introductionLavel"
          v-model="introduction"
          :rules="introductionRules"
          :counter="50"
          textarea
        ></v-text-field>
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
import {RegionType} from '~/constants/region'
import {FgExpType} from '~/constants/fg_exp'

export default {
  data () {
    const regionItem = (this.$store.state.locale === 'jp') ? RegionType.jp : RegionType.en
    const fgExpItem = (this.$store.state.locale === 'jp') ? FgExpType.jp : FgExpType.en
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
        fgExpItem.FG_EXP_TYPE_LESS1,
        fgExpItem.FG_EXP_TYPE_1,
        fgExpItem.FG_EXP_TYPE_2,
        fgExpItem.FG_EXP_TYPE_3,
        fgExpItem.FG_EXP_TYPE_4,
        fgExpItem.FG_EXP_TYPE_5,
        fgExpItem.FG_EXP_TYPE_6,
        fgExpItem.FG_EXP_TYPE_7,
        fgExpItem.FG_EXP_TYPE_8,
        fgExpItem.FG_EXP_TYPE_9,
        fgExpItem.FG_EXP_TYPE_OVER10
      ],
      fg_expRules: [ (v) => !!v || this.$t('profile.fg_exp.required') ],
      region: this.$store.state.profile.region,
      regionLavel: this.$t('profile.region.lavel'),
      region_items: [
        regionItem.REGION_TYPE_JAPAN,
        regionItem.REGION_TYPE_OTHER
      ],
      regionRules: [ (v) => !!v || this.$t('profile.region.required') ],
      introduction: this.$store.state.profile.introduction,
      introductionLavel: this.$t('profile.introduction.lavel'),
      introductionRules: [
        (v) => (v && v.length <= 50) || this.$t('profile.introduction.format')
      ]
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
          fg_exp: this.fg_exp,
          region: this.region,
          introduction: this.introduction
        })
        DB.collection('users').doc(this.$store.state.user.uid).set({
          name: this.name,
          email: this.email,
          fg_exp: this.fg_exp,
          region: this.region,
          introduction: this.introduction
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>