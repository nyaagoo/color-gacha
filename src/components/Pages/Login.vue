<template lang="pug">
  .login
    login-template
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import firebase from "firebase";
import LoginTemplateVue from "@/components/Templates/Login.vue";

@Component({
  name: "login",
  components: {
    "login-template": LoginTemplateVue
  }
})
export default class Login extends Vue {}
</script>

<style lang="stylus" scoped></style>
