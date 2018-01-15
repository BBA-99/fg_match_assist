<template>
  <v-layout>
    <v-flex text-xs-center>
      <div v-if="$store.state.user">
        <img :src="$store.state.user.photoURL" alt="image">
      </div>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Name"
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
          label="fg_exp"
          v-model="fg_exp"
          :items="fg_exp_items"
          :rules="[v => !!v || 'fg_exp is required']"
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

export default {
  data () {
    return {
      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 15) || 'Name must be less than 15 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)) || 'E-mail must be valid' // eslint-disable-line
      ],
      fg_exp: null,
      fg_exp_items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ]
    }
  },
  async fetch (context) {
    await context.store.dispatch('loadProfile')
  },
  computed: {
    activeUser () { return this.$store.getters.activeUser },
    activeProfile () { return this.$store.getters.activeProfile }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // 更新登録処理
        this.$store.commit('setProfile', {
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