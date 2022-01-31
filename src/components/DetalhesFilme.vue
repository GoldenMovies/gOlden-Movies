<template>
  <section class="my-5 d-flex flex-wrap">
    <v-container id="filmes">
      <v-row class="infoPrincipal">
        <v-col cols="12" sm="4">
          <v-hover v-slot="{ hover }" :open-delay="delay">
            <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }">
              <v-img :src="posterPath" alt="" class="poster" />
            </v-card>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="8">
          <v-row>
            <h1 class="amber--text accent-4 text-darken-3 mt-5">
              {{ this.filme.title }}
            </h1>
            <v-input
              class="ma-4"
              dark
              :append-icon="show ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
              @click:append="show = !show"
            >
            </v-input>
            <v-spacer></v-spacer>
            <h2
              id="nota"
              class="white--text ma-4"
              :class="{
                bom: filme.vote_average * 10 > 80,
                razoavel:
                  filme.vote_average * 10 <= 80 && filme.vote_average * 10 > 60,
                ruim: filme.vote_average * 10 <= 60,
              }"
            >
              {{ filme.vote_average * 10 }}
            </h2>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3">
              <span class="white--text">
                {{ formatarData(filme.release_date) }}
              </span>
            </v-col>
            <v-col cols="12" sm="7">
              <div class="subtitle-2 white--text ml-n16">
                <span
                  v-for="(item, index) in filme.genres"
                  :key="index"
                  class="ml-1"
                >
                  {{ item.name }}
                  <span v-if="filme.genres.length != index + 1">,</span>
                </span>
              </div>
            </v-col>
          </v-row>
          <p class="mt-5 white--text text--darken-3 subheader">
            {{ this.filme.overview }}
          </p>
          <div class="mt-10">
            <h2 class="white--text text--darken-3">Produtores</h2>
            <div
              :key="index"
              v-for="(crew, index) in filme.credits.crew"
              class="mt-5"
            >
              <div v-if="index < 2">
                <h3 class="amber--text">{{ crew.job }}</h3>
                <span class="white--text">{{ crew.name }}</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-divider class="mt-2"></v-divider>
      <elenco class="elenco mt-10" :elencos="filme.credits.cast" />
    </v-container>
  </section>
</template>

<script>
import Elenco from "../components/Elenco.vue";

export default {
  components: { Elenco },

  data() {
    return {
      show: false,
      delay: 50,
      filme: {
        credits: { crew: {} },
        images: { backdrops: {} },
      },
    };
  },
  mounted() {
    this.buscarFilme(this.$route.params.id);
  },
  computed: {
    posterPath() {
      return `https://image.tmdb.org/t/p/w500/${this.filme.poster_path}`;
    },
  },
  methods: {
    async buscarFilme(filmeId) {
      const retorno = await this.$http.get(
        `movie/${filmeId}?&append_to_response=credits,videos,images&language=pt-BR`
      );
      this.filme = retorno.data;
    },

    formatarData(data) {
      const [dia, mes, ano] = [
        data.substring(8),
        data.substring(5, 7),
        data.substring(0, 4),
      ];
      return `${dia}/${mes}/${ano}`;
    },
  },
};
</script>

<style>
.infoPrincipal {
  background-color: #121212;
  border: 3px solid #213360;
  border-radius: 5px;
}
#nota {
  background-color: #213360;
  border-radius: 5px;
  padding: 5px 8px;
}

.ruim {
  border: 2px solid red;
}
.razoavel {
  border: 2px solid yellow;
}
.bom {
  border: 2px solid green;
}
</style>
