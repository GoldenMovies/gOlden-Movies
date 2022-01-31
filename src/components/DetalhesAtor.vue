<template>
  <section>
    <v-container id="filmes">
      <v-row>
        <v-col cols="12" sm="4">
          <v-hover v-slot="{ hover }" open-delay="50">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <v-img :src="imagemAtor(ator)" alt="Imagem do ator" />
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="8" class="justify-end">
          <v-col class="infoPrincipal">
            <h1 class="amber--text accent-4 mt-2">{{ ator.name }}</h1>
            <v-row>
              <v-col cols="12">
                <v-btn text>
                  <v-icon color="primary">mdi-cake</v-icon>
                </v-btn>
                <span class="grey--text">
                  {{ formatarData(ator.birthday) }}
                  ({{ calcularIdade(ator.birthday) }} anos de idade)
                </span>
              </v-col>
            </v-row>

            <p class="mt-5 white--text text--darken-3 subheader">
              {{ ator.biography }}
            </p>
          </v-col>
        </v-col>
        <v-col>
          <h1 class="h1 d-flex justify-center my-4 amber--text accent-4">
            Filmografia
          </h1>
          <v-row>
            <v-col
              cols="12"
              sm="3"
              :key="index"
              v-for="(filme, index) in this.filmografia"
              class="mt-5"
            >
              <v-hover v-slot="{ hover }" open-delay="200">
                <v-card
                  :elevation="hover ? 16 : 2"
                  :class="{ 'on-hover': hover }"
                >
                  <router-link :to="`/filme/${filme.id}`">
                    <v-img :src="imagemFilme(filme)" />
                  </router-link>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      ator: {},
      elencoFilme: {},
      filmografia: [],
    };
  },
  mounted() {
    this.buscarAtor(this.$route.params.id);
    this.buscarCreditos(this.$route.params.id);
  },
  methods: {
    async buscarAtor(atorId) {
      const retorno = await this.$http.get(`/person/${atorId}`);
      this.ator = retorno.data;
    },
    async buscarCreditos(atorId) {
      const retorno = await this.$http.get(
        `/person/${atorId}/combined_credits?&language=pt-BR`
      );
      this.elencoFilme = retorno.data.cast;
      this.filmografia = retorno.data.cast.filter(
        (x) => x.media_type == "movie"
      );
    },

    imagemAtor(ator) {
      if (!ator.profile_path) {
        return "https://via.placeholder.com/300x450";
      }
      return `https://image.tmdb.org/t/p/w300/${ator.profile_path}`;
    },
    imagemFilme(filme) {
      const posterPath = filme.poster_path;
      if (!posterPath) {
        return "https://via.placeholder.com/185x278";
      }
      return `https://image.tmdb.org/t/p/w185/${posterPath}`;
    },
    detalhesElenco(elenco) {
      return `${parseInt(elenco.release_date)}.`;
    },
    formatarData(data) {
      const d = new Date(data);
      const mes =
        d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
      const dia =
        d.getDate() + 1 < 10 ? `0${d.getDate() + 1}` : d.getDate() + 1;
      return `${dia}/${mes}/${d.getFullYear()}`;
    },
    calcularIdade(idade) {
      const anoAtual = new Date();
      const anoNascimento = idade != undefined ? idade.substring(0, 4) : NaN;
      return anoAtual.getFullYear() - anoNascimento;
    },
  },
};
</script>

<style></style>
