import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../plugins/firebase";

import Home from "../views/Home.vue";
import Aclamados from "../views/Aclamados.vue";
import Populares from "../views/Populares.vue";
import Categorias from "../views/Categorias.vue";
import Perfil from "../views/Perfil.vue";

import DetalhesFilme from "../components/DetalhesFilme.vue";
import DetalhesAtor from "../components/DetalhesAtor.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../layouts/Default"),
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/aclamados",
        name: "aclamados",
        component: Aclamados,
      },
      {
        path: "/populares",
        name: "populares",
        component: Populares,
      },
      {
        path: "/categorias",
        name: "categorias",
        component: Categorias,
      },
      {
        path: "/filme/:id",
        name: "filme",
        component: DetalhesFilme,
      },
      {
        path: "/ator/:id",
        name: "ator",
        component: DetalhesAtor,
      },
      {
        path: "/perfil",
        name: "perfil",
        component: Perfil,
      },
    ],
  },
  {
    path: "/",
    component: () => import("../layouts/PerfilAuth"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/perfil",
        name: "Perfil",
        component: Perfil,
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/Blank"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/login");
  } else {
    next();
  }
});

export default router;
