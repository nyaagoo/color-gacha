<template lang="pug">
  .gacha-toolbar
    v-toolbar(color='cyan' dark fixed app height=48)
      v-toolbar-title ガチャ
      v-spacer
      menu-transit-buttons
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { login } from "@/store/index.ts";
import MenuTransitButtons from "@/components/Molecules/MenuTransitButtons.vue";

@Component({
  name: "gacha-toolbar",
  components: {
    "menu-transit-buttons": MenuTransitButtons
  }
})
export default class GachaToolbar extends Vue {}
</script>
<style lang="stylus" scoped></style>
