<template>
  <section class="mx-3">
    <h2 class="mt-2 grey--text">{{ titulo }}</h2>
    <v-container fluid id="filmes">
      <v-row>
        <v-col cols="12" sm="3" v-for="filme in filmes" :key="filme.id">
          <ficha-filme :filme="filme" :generos="generos" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import FichaFilme from "../components/FichaFilme.vue";

export default {
  components: { FichaFilme },
  data() {
    return {
      titulo: "Filmes Populares",
      filmes: {},
      generos: [],
    };
  },
  async mounted() {
    this.buscarGeneros();
    try {
      const retorno = await this.$http.get(
        "movie/popular?&region=DE&release_date.lte=1980-01-01&language=pt-BR"
      );
      this.filmes = retorno.data.results;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async buscarGeneros() {
      try {
        const retorno = await this.$http.get(
          "genre/movie/list?&language=pt-BR"
        );
        this.generos = retorno.data.genres;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
