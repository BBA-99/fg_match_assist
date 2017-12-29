<template>
  <v-layout>
    <v-flex text-xs-center>
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
      <blockquote class="blockquote">
        <h2 class="title">Sign In with Google</h2>
        <v-btn class="signIn mb-2" primary @click.native="googleSignUp">Google Sign In</v-btn>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {

    googleSignUp () {
      this.$store.dispatch('signInWithGoogle').then(() => {
        console.log('inside then statement on login')
      }).catch((e) => {
        console.log(e.message)
      })
    }
  }
}
</script>

<style lang="css">
.signIn {
}
</style>