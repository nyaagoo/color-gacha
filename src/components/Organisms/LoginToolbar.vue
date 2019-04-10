<template lang="pug">
  .login-toolbar
    v-toolbar(color='cyan' dark fixed app height=48)
      v-toolbar-title Application
      v-spacer
      v-btn Application
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "login-toolbar",
  components: {}
})
export default class LoginToolbar extends Vue {}
</script>
<style lang="stylus" scoped></style>
