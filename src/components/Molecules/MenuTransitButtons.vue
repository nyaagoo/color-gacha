<template lang="pug">
  v-toolbar-items
    v-btn(flat @click="transitGacha()") ガチャ
    v-btn(flat @click="transitCollection()") コレクション
    v-btn(flat @click="transitManage()") 管理ページ
    v-btn(flat @click="logout()") ログアウト
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
