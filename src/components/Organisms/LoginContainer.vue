<template lang="pug">
  .login-container
    section.section-intro
      p this is login container
    section.section-login
      login-form
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import LoginForm from "@/components/Organisms/LoginForm.vue";

@Component({
  name: "login-container",
  components: {
    "login-form": LoginForm
  }
})
export default class LoginContainer extends Vue {}
</script>
<style lang="stylus" scoped>
.login-container
  width 800px
  margin auto
.section-intro
  background-color #f8ff83
  height 400px
.section-login
  background-color #c6ddfd
  height 900px
</style>
