<template>
  <v-layout>
    <v-flex text-xs-center>
      <blockquote class="blockquote">
        &#8220;Profile&#8221;
        <h1 class="red">Hello {{ name }}!</h1>
        <v-icon medium>fa-edit</v-icon>
        <v-icon medium>settings</v-icon>

        
      </blockquote>

    </v-flex>
  </v-layout>
</template>

<script>

export default {
  computed: {
    name () { return this.$store.getters.activeUser }
  }
}
</script>