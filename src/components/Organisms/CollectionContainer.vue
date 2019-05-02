<template lang="pug">
  .collection-container
    section.collection-wrapper
      .collection-item(v-for="color in colorCollection" :key="color.idRoot" :style="{'background-color':convert(color.code)}")
        span(:style="{'color': selectTextColor(color.code)}")
         b {{color.name}}
      
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { gacha } from "@/store/index.ts";
import { convertHexToHslStr, selectTextColor } from "@/util/colorUtil";

@Component({
  name: "collection-container",
  components: {}
})
export default class CollectionContainer extends Vue {
  get colorCollection() {
    //TODO: すべてのカラーリストから取ってきている。個人の所有しているカラーリストを取得する
    return gacha.colorList;
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
.collection-container
  margin auto
  background-color #acacac
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
