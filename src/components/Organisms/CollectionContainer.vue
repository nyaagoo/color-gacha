<template lang="pug">
  .collection-container
    v-btn(@click="selectStyleColumn()") カラム形式
    v-btn(@click="selectStylePeriodic()") グリッド形式
    collection-list-column(v-if="collectionStyle === 'column'")
    collection-list-periodic(v-if="collectionStyle === 'periodic'")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import { gacha } from "@/store/index.ts";
import { convertHexToHslStr, selectTextColor } from "@/util/colorUtil";
import CollectionListColumn from "@/components/Organisms/CollectionList/CollectionListColumn.vue";
import CollectionListPeriodic from "@/components/Organisms/CollectionList/CollectionListPeriodic.vue";

@Component({
  name: "collection-container",
  components: {
    "collection-list-column": CollectionListColumn,
    "collection-list-periodic": CollectionListPeriodic
  }
})
export default class CollectionContainer extends Vue {
  collectionStyle: "column" | "periodic" = "column";

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
  selectStyleColumn() {
    this.collectionStyle = "column";
  }
  selectStylePeriodic() {
    this.collectionStyle = "periodic";
  }
}
</script>
<style lang="stylus" scoped>
.collection-container
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
