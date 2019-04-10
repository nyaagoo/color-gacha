<template lang="pug">
  .gacha-toolbar
    v-toolbar(color='cyan' dark fixed app height=48)
      v-toolbar-title Application
      v-spacer
      v-btn(@click="logout()") ログアウト
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { login } from "@/store/index.ts";

@Component({
  name: "gacha-toolbar",
  components: {}
})
export default class GachaToolbar extends Vue {
  logout() {
    // FIXME: Storeの名前がダメ。Loginは機能名、user.login(), user.logout()とかにしたいが
    // userって名前は大きすぎる。 良い名前を考える 。
    login.logout();
  }
}
</script>
<style lang="stylus" scoped></style>
