<template lang="pug">
  .gacha-collection
    .flex-container-wrapper
      .flex-container
        .color-wrapper(v-for="i in 144")
          .color-box(:style="{ 'background-color': findGachaColorBackgroundColor(i) }")
      .flex-container
        .color-wrapper(v-for="i in 144")
          .color-box(:style="{ 'background-color': findHasColorBackgroundColor(i) }")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { gacha } from "@/store/index";

@Component({
  name: "gacha-collection",
  components: {}
})
export default class GachaCollection extends Vue {
  findGachaColorBackgroundColor(i: number): string {
    const color = gacha.gachaList.find(color => "color_" + i === color.idRoot);
    if (color === undefined) return "#000000";
    else return color.code;
  }
  findHasColorBackgroundColor(i: number): string {
    const color = gacha.hadColorList.find(
      color => "color_" + i === color.idRoot
    );
    if (color === undefined) return "#000000";
    else return color.code;
  }
  created() {
    gacha.onSnapshot();
  }
}
</script>
<style lang="stylus" scoped>
.gacha-collection
  background-color #acacac
  width 1000px
  height 500px
  margin auto
  padding 20px
.flex-container-wrapper
  display flex
.flex-container
  width 420px
  display flex
  flex-wrap wrap
  background-color #ffffff
  justify-content space-around
  align-content space-around
  margin auto
  margin-top 20px
.color-box
  width 30px
  height 30px
  margin 2px
</style>
