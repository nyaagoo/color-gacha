<template lang="pug">
  .gacha-main
    gacha-template

</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import GachaTemplate from "@/components/Templates/Gacha.vue";

@Component({
  name: "gacha-main",
  components: {
    "gacha-template": GachaTemplate
  }
})
export default class GachaMain extends Vue {}
</script>
<style lang="stylus" scoped></style>
