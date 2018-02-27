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
          :label="titleLabel"
          v-model="title"
          item-text='display'
          item-value="value"
          :items="title_items"
          :rules="titleRules"
          required
          @change="resetRoom"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout v-if="title != null">
      <v-flex xs5>
        <v-select
          :label="title_expLabel"
          v-model="title_exp"
          item-text='display'
          item-value="value"
          :items="title_exp_items"
          :rules="title_expRules"
          required
        ></v-select>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs5>
        <v-select
          :label="targetLevelLabel"
          v-model="targetLevel"
          item-text='display'
          item-value="value"
          :items="targetLevel_items"
          :rules="targetLevelRules"
          required
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout  v-if="title != null">
      <v-flex xs12 >
        <v-select
          :label="entryLabel"
          v-model="entry"
          item-text='display'
          item-value="value"
          :items="entryItems"
          :rules="entryRules"
          multiple
          chips
          required
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout v-if="title != null">
      <v-flex xs5>
        <v-select
          :label="entry_expLabel"
          v-model="entry_exp"
          item-text='display'
          item-value="value"
          :items="entry_exp_items"
          :rules="entry_expRules"
          required
        ></v-select>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs5>
        <v-select
          :label="targetLevelLabel"
          v-model="targetLevel"
          item-text='display'
          item-value="value"
          :items="targetLevel_items"
          :rules="targetLevelRules"
          required
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout  v-if="title != null">
      <v-flex xs12 >
        <v-text-field
          :label="notesLabel"
          v-model="notes"
          :rules="notesRules"
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
import {ExpType} from '~/constants/exp'
import {TargetLevelType} from '~/constants/targetLevel'

export default {
  data () {
    const roomConditionItem = (this.$store.state.locale === 'jp') ? RoomConditionType.jp : RoomConditionType.en
    const titleItem = (this.$store.state.locale === 'jp') ? TitleType.jp : TitleType.en
    const titleExpItem = (this.$store.state.locale === 'jp') ? ExpType.jp : ExpType.en
    const entryExpItem = (this.$store.state.locale === 'jp') ? ExpType.jp : ExpType.en
    const targetLevelItem = (this.$store.state.locale === 'jp') ? TargetLevelType.jp : TargetLevelType.en
    return {
      valid: true,
      // ルームステータス
      roomCondition: roomConditionItem[this.$store.state.createRoom.roomCondition],
      // タイトル
      title: this.$store.state.createRoom.title,
      titleLabel: this.$t('createRoom.title.label'),
      title_items: [
        { display: titleItem.DBFZ_PS.name, value: 'DBFZ_PS' },
        { display: titleItem.DBFZ_X.name, value: 'DBFZ_X' }
      ],
      titleRules: [ (v) => !!v || this.$t('createRoom.title.required') ],
      // タイトルやり込み度合い
      title_exp: this.$store.state.createRoom.title_exp,
      title_expLabel: this.$t('createRoom.title_exp.label'),
      title_exp_items: [
        { display: titleExpItem.EXP_TYPE_BEGINNER.name, value: 'EXP_TYPE_BEGINNER' },
        { display: titleExpItem.EXP_TYPE_NOVICE.name, value: 'EXP_TYPE_NOVICE' },
        { display: titleExpItem.EXP_TYPE_ADVANCE.name, value: 'EXP_TYPE_ADVANCE' },
        { display: titleExpItem.EXP_TYPE_STRATEGY.name, value: 'EXP_TYPE_STRATEGY' },
        { display: titleExpItem.EXP_TYPE_RANKER.name, value: 'EXP_TYPE_RANKER' }
      ],
      title_expRules: [ (v) => !!v || this.$t('createRoom.title_exp.required') ],
      // 目標レベル
      targetLevel: this.$store.state.createRoom.targetLevel,
      targetLevelLabel: this.$t('createRoom.targetLevel.label'),
      targetLevel_items: [
        { display: targetLevelItem.TARGETLEVEL_TYPE_DEPARTURE_BEGINNER.name, value: 'TARGETLEVEL_TYPE_DEPARTURE_BEGINNER' },
        { display: targetLevelItem.TARGETLEVEL_TYPE_ADVANCE.name, value: 'TARGETLEVEL_TYPE_ADVANCE' },
        { display: targetLevelItem.TARGETLEVEL_TYPE_HIGHER_RANK.name, value: 'TARGETLEVEL_TYPE_HIGHER_RANK' },
        { display: targetLevelItem.TARGETLEVEL_TYPE_ATHLETE.name, value: 'TARGETLEVEL_TYPE_ATHLETE' }
      ],
      targetLevelRules: [ (v) => !!v || this.$t('createRoom.targetLevel.required') ],
      // エントリー
      entry: this.$store.state.createRoom.entry,
      entryLabel: this.$t('createRoom.entry.label'),
      entryRules: [
        (v) => (v && v.length === 3) || this.$t('createRoom.entry.format')
      ],
      // エントリーやり込み度合い
      entry_exp: this.$store.state.createRoom.entry_exp,
      entry_expLabel: this.$t('createRoom.entry_exp.label'),
      entry_exp_items: [
        { display: entryExpItem.EXP_TYPE_BEGINNER.name, value: 'EXP_TYPE_BEGINNER' },
        { display: entryExpItem.EXP_TYPE_NOVICE.name, value: 'EXP_TYPE_NOVICE' },
        { display: entryExpItem.EXP_TYPE_ADVANCE.name, value: 'EXP_TYPE_ADVANCE' },
        { display: entryExpItem.EXP_TYPE_STRATEGY.name, value: 'EXP_TYPE_STRATEGY' },
        { display: entryExpItem.EXP_TYPE_RANKER.name, value: 'EXP_TYPE_RANKER' }
      ],
      entry_expRules: [ (v) => !!v || this.$t('createRoom.entry_exp.required') ],
      // ノート
      notes: this.$store.state.createRoom.notes,
      notesLabel: this.$t('createRoom.notes.label'),
      notesRules: [
        (v) => (v && v.length <= 50) || this.$t('createRoom.notes.format')
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
    activeProfile () { return this.$store.getters.activeProfile },
    entryItems () {
      const titleItem = (this.$store.state.locale === 'jp') ? TitleType.jp : TitleType.en
      return titleItem[this.title]['CHARACTER']
    }
  },
  methods: {
    // タイトルを変えたら初期化
    resetRoom () {
      console.log('resetRoom')
      this.title_exp = null
      this.targetLevel = null
      this.entry = []
      this.entry_exp = null
      this.allowChangeEntry = false
      this.startDatetime = null
      this.duration = 0
      this.rivalEntryMust = []
      this.rivalEntryExclusion = []
      this.rivalFg_expMin = null
      this.rivalFg_expMax = null
      this.rivalTitle_expMin = null
      this.rivalTitle_expMax = null
      this.rivalEntry_expMin = null
      this.rivalEntry_expMax = null
      this.rivalTargetLevelMin = null
      this.rivalTargetLevelMax = null
      this.notes = ''
    },
    // ルームを作る
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