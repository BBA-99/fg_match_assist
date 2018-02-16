<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-layout >
      <v-flex>
        <v-card>
          <v-card-text>
            {{roomCondition}}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 >
        <v-select
          :label="titleLavel"
          v-model="title"
          item-text='display'
          item-value="value"
          :items="title_items"
          :rules="titleRules"
          required
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout v-if="title != null">
      <v-flex xs6>
        <v-select
          :label="title_expLavel"
          v-model="title_exp"
          item-text='display'
          item-value="value"
          :items="title_exp_items"
          :rules="title_expRules"
          required
        ></v-select>
      </v-flex>
      <v-flex xs6>
        <v-select
          :label="targetLevelLavel"
          v-model="targetLevel"
          item-text='display'
          item-value="value"
          :items="targetLevel_items"
          :rules="targetLevelRules"
          required
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 >
        <v-text-field
          :label="introductionLavel"
          v-model="introduction"
          :rules="introductionRules"
          :counter="50"
          textarea
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout text-xs-center>
      <v-flex text-xs-center>
        <v-btn @click="createRoom" :disabled="!valid">{{$t('createRoom.submit')}}</v-btn>
        <v-btn @click="clear">{{$t('createRoom.clear')}}</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import {DB} from '~/plugins/firebase'
import {RoomConditionType} from '~/constants/roomCondition'
import {TitleType} from '~/constants/title'
import {ExpType as TitleExpType} from '~/constants/exp'
import {TargetLevelType} from '~/constants/targetLevel'

export default {
  data () {
    const roomConditionItem = (this.$store.state.locale === 'jp') ? RoomConditionType.jp : RoomConditionType.en
    const titleItem = (this.$store.state.locale === 'jp') ? TitleType.jp : TitleType.en
    const titleExpItem = (this.$store.state.locale === 'jp') ? TitleExpType.jp : TitleExpType.en
    const targetLevelItem = (this.$store.state.locale === 'jp') ? TargetLevelType.jp : TargetLevelType.en
    return {
      valid: true,
      roomCondition: roomConditionItem[this.$store.state.createRoom.roomCondition],
      // タイトル
      title: this.$store.state.createRoom.title,
      titleLavel: this.$t('createRoom.title.lavel'),
      title_items: [
        { display: titleItem.DBFZ_PS.name, value: titleItem.DBFZ_PS.name },
        { display: titleItem.DBFZ_X.name, value: titleItem.DBFZ_X.name }
      ],
      titleRules: [ (v) => !!v || this.$t('createRoom.title.required') ],
      // やり込み度合い
      title_exp: this.$store.state.createRoom.title_exp,
      title_expLavel: this.$t('createRoom.title_exp.lavel'),
      title_exp_items: [
        { display: titleExpItem.EXP_TYPE_BEGINNER.name, value: titleExpItem.EXP_TYPE_BEGINNER.name },
        { display: titleExpItem.EXP_TYPE_NOVICE.name, value: titleExpItem.EXP_TYPE_NOVICE.name },
        { display: titleExpItem.EXP_TYPE_ADVANCE.name, value: titleExpItem.EXP_TYPE_ADVANCE.name },
        { display: titleExpItem.EXP_TYPE_STRATEGY.name, value: titleExpItem.EXP_TYPE_STRATEGY.name },
        { display: titleExpItem.EXP_TYPE_RANKER.name, value: titleExpItem.EXP_TYPE_RANKER.name }
      ],
      title_expRules: [ (v) => !!v || this.$t('createRoom.title_exp.required') ],
      // 目標レベル
      targetLevel: this.$store.state.createRoom.targetLevel,
      targetLevelLavel: this.$t('createRoom.targetLevel.lavel'),
      targetLevel_items: [
        { display: targetLevelItem.TARGETLEVEL_TYPE_DEPARTURE_BEGINNER.name, value: targetLevelItem.TARGETLEVEL_TYPE_DEPARTURE_BEGINNER.name },
        { display: targetLevelItem.TARGETLEVEL_TYPE_ADVANCE.name, value: targetLevelItem.TARGETLEVEL_TYPE_ADVANCE.name },
        { display: targetLevelItem.TARGETLEVEL_TYPE_HIGHER_RANK.name, value: targetLevelItem.TARGETLEVEL_TYPE_HIGHER_RANK.name },
        { display: targetLevelItem.TARGETLEVEL_TYPE_ATHLETE.name, value: targetLevelItem.TARGETLEVEL_TYPE_ATHLETE.name }
      ],
      targetLevelRules: [ (v) => !!v || this.$t('createRoom.targetLevel.required') ],

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
    if (!context.store.state.profile.fg_exp) {
      return context.redirect('/profile')
    }
  },
  computed: {
    activeUser () { return this.$store.getters.activeUser },
    activeProfile () { return this.$store.getters.activeProfile }
  },
  methods: {
    createRoom () {
      if (!this.$store.state.user) {
        // 未ログインならリダイレクト
        this.$router.replace({ path: '/signIn' })
      }
      if (this.$refs.form.validate()) {
        console.log(DB)
        // ROOM登録処理
        /*
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
        */
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>