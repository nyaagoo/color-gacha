<template lang="pug">
  .gacha-template
    gacha-container
    .login-conitaner
      gacha-toolbar
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import GachaContainer from "@/components/Organisms/GachaContainer.vue";
import GachaToolbar from "@/components/Organisms/GachaToolbar.vue";

@Component({
  name: "gacha-template",
  components: {
    "gacha-container": GachaContainer,
    "gacha-toolbar": GachaToolbar
  }
})
export default class GachaTemplate extends Vue {}
</script>
<style lang="stylus" scoped>
.gacha-template
  overflow-y auto
  height calc(100vh - 48px)
</style>
