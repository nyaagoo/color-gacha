<template lang="pug">
  .gacha-container
    section.section-intro
      p GachaContainer
      v-btn(@click="testes()") Insert
    section.section-login
      login-form
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { Color } from "@/model/color.ts";
import { gacha } from "@/store/index";
@Component({
  name: "gacha-container",
  components: {}
})
export default class GachaContainer extends Vue {
  colorList: Color[] = [];
  testes() {}
}
</script>
<style lang="stylus" scoped>
.gacha-container
  width 800px
  margin auto
.section-intro
  padding 20px
  background-color #f8ff83
  height 400px
  p
    font-size 40px
.section-login
  background-color #c6ddfd
  height 900px
</style>
