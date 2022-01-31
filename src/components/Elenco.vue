<template>
  <section>
    <h2 class="mt-2 amber--text accent-4">Elenco</h2>
    <v-container>
      <v-row>
        <v-col cols="12" sm="3" :key="index" v-for="(elenco, index) in elencos">
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <router-link :to="`/ator/${elenco.id}`">
                <v-img :src="ImagemElenco(elenco)" alt="Imagem do ator" />
              </router-link>
              <v-card-title class="subtitle-2">{{ elenco.name }}</v-card-title>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  props: {
    elencos: { required: true },
  },
  methods: {
    ImagemElenco(elenco) {
      if (elenco.profile_path) {
        return `https://image.tmdb.org/t/p/w300${elenco.profile_path}`;
      } else {
        return "https://via.placeholder.com/300x450";
      }
    },
  },
};
</script>

<style></style>
