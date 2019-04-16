import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Pages/Login.vue";
import Gacha from "@/components/Pages/Gacha.vue";
import Manage from "@/components/Pages/Manage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/gacha",
      name: "gacha",
      component: Gacha
    },
    {
      path: "/manage",
      name: "manage",
      component: Manage
    }
  ]
});
