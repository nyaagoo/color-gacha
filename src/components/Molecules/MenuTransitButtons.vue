<template lang="pug">
  .menu-transit-buttons
    v-btn(@click="transitGacha()") ガチャ
    v-btn(@click="transitCollection()") コレクション
    v-btn(@click="transitManage()") 管理ページ
    v-btn(@click="logout()") ログアウト
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { login } from "@/store/index.ts";
import router from "@/router";

@Component({
  name: "menu-transit-buttons",
  components: {}
})
export default class MenuTransitButtons extends Vue {
  transitGacha() {
    router.push("/gacha");
  }
  transitCollection() {
    router.push("/collection");
  }
  transitManage() {
    router.push("/manage");
  }
  logout() {
    login.logout();
  }
}
</script>
<style lang="stylus" scoped></style>
