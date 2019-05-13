<template lang="pug">
  .collection-list-periodic
    .collection-wrapper
      .collection-item(v-for="color in colorCollection" :key="color.idRoot" :style="{'background-color':convert(color.code)}" @click="openColorDetailDialog(color)")
        p(:style="{'color':selectTextColor(color.code)}") {{ color.idRoot }}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { gacha, dialog, colorDetail } from "@/store/index.ts";
import { convertHexToHslStr, selectTextColor } from "@/util/colorUtil";
import { Color } from "@/model/color";
@Component({
  name: "collection-list-periodic",
  components: {}
})
export default class CollectionListPeriodic extends Vue {
  get colorCollection() {
    //TODO: すべてのカラーリストから取ってきている。個人の所有しているカラーリストを取得する
    return gacha.colorList;
  }
  openColorDetailDialog(color: Color) {
    colorDetail.OpenDialog({
      ...color,
      //FIXME: テスト用ダミーデータ
      backgroundColor: "#ffffff",
      borderColor: "#ffffff"
    });
  }
  convert(hex: string): string {
    return convertHexToHslStr(hex);
  }
  selectTextColor(hex: string): string {
    return selectTextColor(hex);
  }
}
</script>
<style lang="stylus" scoped>
.collection-list-periodic
  margin auto
  background-color #ffffff
  width 1000px
  height calc(100vh - 48px)Organisms
.collection-wrapper
  display grid
  gap 2px
  grid-template-rows repeat(12, 1fr)
  grid-template-columns repeat(12, 1fr)
.collection-item
  height 80px
  border 1px solid #111111
  border-radius 4px
  padding 4px
  box-shadow: 0 0 5px 5px rgba(0,0,0,.25) inset;
</style>
