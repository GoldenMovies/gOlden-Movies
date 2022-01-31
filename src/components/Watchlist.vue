<template>
  <section class="mx-3">
    <h2 class="mt-2 grey--text">{{ titulo }}</h2>
    <v-container fluid id="filmes">
      <v-row>
        <v-col cols="12" sm="3" v-for="filme in filmes" :key="filme.id">
          {{ organizarLista(filme) }}
          <ficha-filme :filme="filmesFiltrados" :generos="generos" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import FichaFilme from "./FichaFilme.vue";

export default {
  components: { FichaFilme },

  data() {
    return {
      titulo: "Watchlist",
      filmes: {},
      generos: [],
      filmesFiltrados: [],
      idsWatchlist: [510, 346, 539, 335, 14537, 28],
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
    organizarLista(filme) {
      this.filmesFiltrados += this.idsWatchlist.includes(filme.id)
        ? filme
        : filme;
    },
  },
};
</script>

<style></style>
