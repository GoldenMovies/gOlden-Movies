<template>
  <v-app>
    <cabecalho />
    <v-main>
      <router-view></router-view>
    </v-main>
    <rodape />
  </v-app>
</template>

<script>
import Cabecalho from "../components/Cabecalho.vue";
import Rodape from "../components/Rodape.vue";

export default {
  name: "App",
  components: { Cabecalho, Rodape },
};
</script>

<style scoped>
main {
  background-image: url("../assets/imagens/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
