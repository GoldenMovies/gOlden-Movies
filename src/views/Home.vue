<template>
  <section class="mx-3">
    <v-row class="justify-center">
      <v-btn
        class="mx-2 my-10"
        elevation="2"
        rounded
        color="primary"
        cols="12"
        sm="3"
        v-for="(dec, index) in decadas"
        :key="index"
        @click="filtrarDecada(dec)"
      >
        <span class="subtitle-1">Década de {{ dec }}0</span>
      </v-btn>
    </v-row>
    <h2 class="mt-7 amber--text text-center my-5">{{ titulo }}</h2>
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
  name: "Home",
  components: { FichaFilme },

  data() {
    return {
      titulo: "",
      filmes: {},
      generos: [],
      decadas: [2, 3, 4, 5, 6, 7],
      decada: 5,
    };
  },
  async mounted() {
    this.buscarGeneros();
    this.buscarFilmes();
  },
  methods: {
    async buscarFilmes() {
      try {
        this.titulo = `Filmes da Década de ${this.decada}0`;
        const retorno = await this.$http.get(
          `/movie/popular?&region=DE&release_date.gte=19${
            this.decada
          }1-01-01&release_date.lte=19${this.decada + 1}1-01-01&language=pt-BR`
        );
        this.filmes = retorno.data.results;
      } catch (error) {
        console.log(error);
      }
    },
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
    filtrarDecada(decada) {
      this.decada = decada;
      this.buscarFilmes();
    },
  },
};
</script>

<style></style>
