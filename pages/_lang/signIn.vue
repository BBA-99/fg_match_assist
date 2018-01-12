<template>
  <v-layout>
    <v-flex text-xs-center>
      
      <blockquote class="blockquote">
        <v-btn class=" twitterSignIn mb-2" primary @click.native="twitterSignIn">Twitter Sign In</v-btn>
        <v-btn class=" googleSignIn mb-2" primary @click.native="googleSignIn">Google Sign In</v-btn>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    twitterSignIn () {
      this.$store.dispatch('signInWithTwitter').then(() => {
        console.log('inside then statement on login from twitter')
      }).catch((e) => {
        console.log(e.message)
      })
    },
    googleSignIn () {
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
.twitterSignIn {

}

.googleSignIn {

}
</style>