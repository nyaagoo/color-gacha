<template lang="pug">
  .login-container
    section.section-intro
      login-title-logo
    section.section-login
      login-form
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import LoginForm from "@/components/Organisms/LoginForm.vue";
import LoginTitleLogo from "@/components/Molecules/LoginTitleLogo.vue";

@Component({
  name: "login-container",
  components: {
    "login-form": LoginForm,
    "login-title-logo": LoginTitleLogo
  }
})
export default class LoginContainer extends Vue {}
</script>
<style lang="stylus" scoped>
.login-container
  width 800px
  margin auto
.section-intro
  padding 20px
  height 200px
.section-login
  background-color #c6ddfd
  height 900px
</style>
