<template>
  <v-row class="vh-100 vw-100">
    <v-col sm="5" class="left-login">
      <v-card>
        <v-col cols="auto" class="text-center">
          <v-img
            class="img-login"
            src="../assets/imagens/LogoLogin.png"
          ></v-img>
          <h2 class="indigo--text">Login/Cadastro</h2>
        </v-col>

        <v-form>
          <v-card-text>
            <v-text-field
              label="Email"
              placeholder="Ex: jorge@email.com"
              v-model="user.email"
              prepend-inner-icon="mdi-account"
              required
            />
            <v-text-field
              id="password"
              placeholder="Digite sua senha"
              label="Senha"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              prepend-inner-icon="mdi-key"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              required
            />
          </v-card-text>
          <v-row>
            <v-col class="text-center">
              <v-btn class="mr-3" color="primary" @click="login">Login</v-btn>
              <v-btn color="warning" @click="reset">Cancelar</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-center mb-2">
              <h3>Acesse também usando:</h3>
              <v-icon @click="loginGoogle" color="blue">mdi-google</v-icon>
            </v-col>
          </v-row>
        </v-form>
        <v-snackbar
          color="red"
          v-model="errorLogin"
          danger
          multline
          timeout="2000"
          >Usuário ou senha inválidos</v-snackbar
        >

        <v-dialog v-model="novaConta" persistent max-width="300">
          <v-card>
            <v-card-title>Conta não encontrada.</v-card-title>
            <v-card-text
              >A conta não foi localizada. Deseja criar uma nova conta com os
              dados informados?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="criarNovaConta"
                >Sim</v-btn
              >
              <v-btn color="red darken-1" text @click="novaConta = false"
                >Não</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-col>
    <v-col sm="7" class="d-flex justify-center align-center">
      <img src="../assets/imagens/fundoLogin.svg" class="img-login" />
    </v-col>
  </v-row>
</template>

<script>
import * as fb from "@/plugins/firebase";

export default {
  data() {
    return {
      user: {},
      show: false,
      errorLogin: false,
      novaConta: false,
    };
  },
  methods: {
    reset() {
      this.user = {};
    },
    async loginGoogle() {
      await fb.auth.signInWithPopup(fb.googleProvider);
      this.$router.push({ name: "Home" });
    },
    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.$router.push({ name: "Home" });
      } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/wrong-password":
            this.errorLogin = true;
            break;
          case "auth/wrong-password":
            this.errorLogin = true;
            break;
          case "auth/invalid-email":
            this.errorLogin = true;
            break;
          case "auth/email-already-in-use":
            this.errorLogin = true;
            break;
          case "auth/user-not-found":
            this.novaConta = true;
            break;
          default:
            this.errorLogin = true;
            break;
        }
      }
    },
    async criarNovaConta() {
      this.novaConta = false;
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.login();
    },
  },
};
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.row-login {
  margin-left: 0;
}

.img-login {
  max-width: 1000px;
  max-height: 1500px;
}

.left-login {
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
