<template>
  <section class="body my-5 d-flex flex-wrap">
    <v-card>
      <v-navigation-drawer permanent dark class="sidenav">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6 amber--text"
              >Filtros</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="genero in generos"
            :key="genero.id"
            @click="filtrarGeneros(genero)"
          >
            <v-list-item-title>{{ genero.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-container fluid id="filmes" class="my-n3">
      <h2 class="my-5 grey--text" v-if="filtrado">
        Relacionados à {{ generoFiltrado }}
      </h2>
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
      filmes: {},
      generos: [],
      generoFiltrado: "",
      filtrado: false,
    };
  },
  async mounted() {
    this.buscarGeneros();
  },
  methods: {
    async filtrarGeneros(genero) {
      try {
        const retorno = await this.$http.get(
          `movie/popular?&with_genres=${genero.id}&region=DE&release_date.lte=1980-01-01&language=pt-BR`
        );
        this.filmes = retorno.data.results;
        this.generoFiltrado = genero.name;
        this.filtrado = true;
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
  },
};
</script>

<style>
.sidenav {
  display: flex;
  flex-direction: column;
  grid-area: sidenav;
}

#filmes {
  width: 70%;
  justify-content: center;
}
</style>
