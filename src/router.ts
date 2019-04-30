import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Pages/Login.vue";

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
      component: () => import("@/components/Pages/Gacha.vue")
    },
    {
      path: "/manage",
      name: "manage",
      component: () => import("@/components/Pages/Manage.vue")
    },
    {
      path: "/collection",
      name: "collection",
      component: () => import("@/components/Pages/Collection.vue")
    }
  ]
});
