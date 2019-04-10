<template lang="pug">
  .login-template
    login-toolbar
    .login-conitaner
      login-container
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import LoginToolbar from "@/components/Organisms/LoginToolbar.vue";
import LoginContainer from "@/components/Organisms/LoginContainer.vue";

@Component({
  name: "login-template",
  components: {
    "login-toolbar": LoginToolbar,
    "login-container": LoginContainer
  }
})
export default class LoginTemplate extends Vue {}
</script>
<style lang="stylus" scoped>
.login-conitaner
  overflow-y auto
  height calc(100vh - 48px)
</style>
