<template>
  <v-layout>
    <v-flex text-xs-center>
      
      <blockquote class="blockquote">
        <v-btn class="signIn mb-2" primary @click.native="twitterSignUp">Twitter Sign In</v-btn>
        <v-btn class="signIn mb-2" primary @click.native="googleSignUp">Google Sign In</v-btn>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    twitterSignUp () {
      this.$store.dispatch('signInWithTwitter').then(() => {
        console.log('inside then statement on login from twitter')
      }).catch((e) => {
        console.log(e.message)
      })
    },
    googleSignUp () {
      this.$store.dispatch('signInWithGoogle').then(() => {
        console.log('inside then statement on login from google')
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