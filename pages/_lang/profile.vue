<template>
  <v-layout>
    <v-flex text-xs-center>
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
      <blockquote class="blockquote">
        &#8220;Profile&#8221;
        <h1 class="red">Hello {{ name }}!</h1>
        <h1 class="red">Hello {{ user }}!</h1>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  computed: {
    name () { return this.$store.state.locale },
    user () { return this.$store.state.user }
  }
}
</script>