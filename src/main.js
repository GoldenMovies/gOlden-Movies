import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./services/api";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.prototype.$http = api;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
