<template lang="pug">
  .collection-list-column
    section.collection-wrapper
      .collection-item(v-for="color in colorCollection" :key="color.idRoot" :style="{'background-color':convert(color.code)}" @click="openColorDetailDialog(color)")
        span(:style="{'color': selectTextColor(color.code)}")
         b {{ color.name }}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { gacha, colorDetail } from "@/store/index.ts";
import { convertHexToHslStr, selectTextColor } from "@/util/colorUtil";
import { Color } from "@/model/color";

@Component({
  name: "collection-list-column",
  components: {}
})
export default class CollectionListColumn extends Vue {
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
.collection-list-column
  margin auto
  background-color #acacac
  width 1000px
  height calc(100vh - 48px)
.collection-wrapper
  display flex
  flex-wrap wrap
.collection-item
  width 50%
  height 80px
  display flex
  align-items flex-end
  justify-content center
</style>
