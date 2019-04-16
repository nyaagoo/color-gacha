<template lang="pug">
  .manage-toolbar
    v-toolbar(color='cyan' dark fixed app height=48)
      v-toolbar-title 管理ページ
      v-spacer
      v-btn(@click="transitGacha()") ガチャページへ
      v-btn(@click="logout()") ログアウト
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
@Component({
  name: "manage-toolbar",
  components: {}
})
export default class ManageToolbar extends Vue {
  transitGacha() {
    router.push("/gacha");
  }
}
</script>
<style lang="stylus" scoped></style>
