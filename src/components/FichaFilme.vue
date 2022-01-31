<template>
  <v-hover v-slot="{ hover }" :open-delay="delay">
    <v-card
      class="fichaFilme"
      :elevation="hover ? 16 : 2"
      :class="{ 'on-hover': hover }"
    >
      <router-link :to="`/filme/${filme.id}`">
        <v-img :src="caminhoPoster" alt="Poster do Filme"></v-img>
      </router-link>
      <v-row no-gutters class="mr-1 d-flex">
        <v-col>
          <v-card-title class="subtitle-2 flex-wrap">{{
            filme.title
          }}</v-card-title>
        </v-col>
        <v-col align="center">
          <h4
            id="avaliacao"
            class="mt-2 my-0 ml-11"
            style="width: 45px"
            :class="{
              bom: filme.vote_average * 10 > 80,
              razoavel:
                filme.vote_average * 10 <= 80 && filme.vote_average * 10 > 60,
              ruim: filme.vote_average * 10 <= 60,
            }"
          >
            {{ filme.vote_average * 10 }}
          </h4>
        </v-col>
      </v-row>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="grey--text">
            {{ formatarData(filme.release_date) }}
          </div>
        </v-row>
        <div class="my-4 subtitle-2">
          <span v-for="(genero, index) in filme.genre_ids" :key="index">
            {{ organizarGeneros(index, genero) }}
          </span>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    filme: { type: Object },
    generos: { type: Array },
  },
  data() {
    return { delay: 150 };
  },
  computed: {
    caminhoPoster() {
      return `https://image.tmdb.org/t/p/w500/${this.filme.poster_path}`;
    },
  },
  methods: {
    organizarGeneros(posicao, idGeneros) {
      for (const item of this.generos) {
        if (idGeneros === item.id) {
          return posicao + 1 < this.filme.genre_ids.length
            ? `${item.name},`
            : item.name;
        }
      }
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

<style scoped>
.fichaFilme {
  min-height: 650px;
  height: 650px;
}

#avaliacao {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 8px;
}

.ruim {
  background-color: #ff1818;
}
.razoavel {
  background-color: #fff333;
}
.bom {
  background-color: #76ff03;
}
</style>
