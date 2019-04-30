<template lang="pug">
  .manage-toolbar
    v-toolbar(color='cyan' dark fixed app height=48)
      v-toolbar-title 管理ページ
      v-spacer
      menu-transit-buttons
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import MenuTransitButtons from "@/components/Molecules/MenuTransitButtons.vue";
@Component({
  name: "manage-toolbar",
  components: {
    "menu-transit-buttons": MenuTransitButtons
  }
})
export default class ManageToolbar extends Vue {
  transitGacha() {
    router.push("/gacha");
  }
}
</script>
<style lang="stylus" scoped></style>
