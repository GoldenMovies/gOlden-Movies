<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="grey darken-3">
        <strong class="subheading"
          >Acesse o nosso repositório no GitHub!</strong
        >

        <v-spacer></v-spacer>

        <v-btn class="mx-4" dark icon href="https://www.github.com">
          <v-icon large>mdi-github</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>gOlden Movies</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {};
</script>

<style></style>
