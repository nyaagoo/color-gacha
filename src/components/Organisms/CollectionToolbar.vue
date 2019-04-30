<template lang="pug">
  .collection-toolbar
    v-toolbar(color='cyan' dark fixed app height=48)
      v-toolbar-title Application2
      v-spacer
      menu-transit-buttons
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { login } from "@/store/index.ts";
import MenuTransitButtons from "@/components/Molecules/MenuTransitButtons.vue";

@Component({
  name: "collection-toolbar",
  components: {
    "menu-transit-buttons": MenuTransitButtons
  }
})
export default class CollectionToolbar extends Vue {}
</script>
<style lang="stylus" scoped></style>
