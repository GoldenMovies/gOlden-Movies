<template>
  <v-app-bar app color="#121212" elevate-on-scroll>
    <v-col class="d-flex">
      <v-btn class="mr-6" icon :to="{ name: 'Home' }" light>
        <v-img
          id="Logo"
          alt="Logo"
          class="shrink mr-3"
          :src="Logo"
          transition="scale-transition"
          contain
          width="60"
        />
      </v-btn>
      <v-btn icon :to="{ name: 'Home' }" light>
        <v-img
          id="GoldenMoviesName"
          class="shrink mt-1 hidden-sm-and-down"
          alt="GoldenMoviesName"
          :src="GoldenMoviesName"
          min-width="80"
          contain
          width="80"
        />
      </v-btn>
    </v-col>

    <v-spacer></v-spacer>

    <v-row justify="center" no-gutters class="mr-5">
      <v-btn
        v-for="(link, index) in links"
        :key="index"
        class="my-2"
        link
        text
        rounded
        color="white"
        :to="link.to"
      >
        {{ link.titulo }}
      </v-btn>
    </v-row>

    <v-spacer></v-spacer>

    <v-autocomplete
      id="pesquisa"
      solo-inverted
      clearable
      dark
      dense
      class="mr-5"
      style="width: 7%"
      cache-items
      hide-no-data
      hide-details
      :items="filmes"
      item-text="title"
      item-value="id"
      label="Pesquisar"
      append-icon="mdi-movie-roll"
    >
      <template v-slot:item="{ item }">
        <v-btn text :to="`/filme/${item.id}`">{{ item.title }}</v-btn>
      </template>
    </v-autocomplete>

    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn class="mr-1" dark icon v-bind="attrs" v-on="on">
          <v-icon size="2.5em">{{ icon }}</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item :to="{ name: 'Perfil' }">
          <v-list-item-icon>
            <v-icon>mdi-playlist-play</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Perfil</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout" :to="{ name: 'Login' }">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import Logo from "../assets/imagens/Logo.png";
import GoldenMoviesName from "../assets/imagens/GoldenMoviesName.png";

export default {
  data() {
    return {
      Logo,
      GoldenMoviesName,
      filmes: [],
      pesquisa: null,
      icon: "mdi-account-circle-outline",
      links: [
        { titulo: "Início", to: "/" },
        { titulo: "Aclamados", to: "/aclamados" },
        { titulo: "Populares", to: "/populares" },
        { titulo: "Categorias", to: "/categorias" },
      ],
    };
  },

  mounted() {
    this.buscarFilmes();
  },
  methods: {
    async buscarFilmes() {
      try {
        const response = await this.$http.get(
          "movie/popular?&region=DE&release_date.lte=1980-01-01&language=pt-BR"
        );
        this.filmes = response.data.results;
      } catch (err) {
        console.log(err);
      }
    },
    async signOut() {
      await signOut(auth);
      this.$swal({
        title: "Deslogado com sucesso!",
        icon: "success",
        showConfirmButton: true,
        confirmButtonColor: "green",
      });
    },
  },
};
</script>

<style>
#Logo:hover,
#GoldenMoviesName:hover {
  cursor: pointer;
}
</style>
