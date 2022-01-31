<template>
  <section class="my-5 d-flex flex-wrap">
    <v-container id="filmes" class="pa-8 infoPrincipal" fluid>
      <h1 class="h1">Meu perfil</h1>
      <v-form>
        <v-container>
          <v-text-field
            label="Nome de usuário"
            v-model="userName"
            filled
            rounded
            dense
            dark
          ></v-text-field>
          <v-text-field label="Minha bio" dark v-model="userBio"></v-text-field>
          <v-btn color="primary" @click="salvarPerfil">Salvar</v-btn>
        </v-container>
      </v-form>
    </v-container>
  </section>
</template>

<script>
import * as fb from "@/plugins/firebase";

export default {
  data() {
    return {
      userName: "",
      userBio: "",
      uid: "",
      temPerfil: false,
    };
  },
  async mounted() {
    this.uid = fb.auth.currentUser.uid;
    const userProfile = await fb.profileCollection
      .where("uid", "==", this.uid)
      .get();
    if (userProfile.docs.length > 0) {
      this.temPerfil = true;
      const perfil = userProfile.docs[0];
      this.profileId = perfil.id;
      this.userName = perfil.data().userName;
      this.userBio = perfil.data().userBio;
    }
  },
  methods: {
    async salvarPerfil() {
      if (this.temPerfil) {
        await fb.profileCollection.doc(this.profileId).update({
          userName: this.userName,
          userBio: this.userBio,
        });
      } else {
        await fb.profileCollection.add({
          uid: this.uid,
          userName: this.userName,
          userBio: this.userBio,
        });
      }
      this.salvar = true;
    },
  },
};
</script>

<style>
.h1 {
  color: aliceblue;
}
</style>
