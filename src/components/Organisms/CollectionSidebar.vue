<template lang="pug">
  .collection-sidebar
    p aa
    p bb
    p cc
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "collection-sidebar",
  components: {}
})
export default class CollectionSidebar extends Vue {}
</script>
<style lang="stylus" scoped>
.collection-sidebar
  background-color red
  width 80px
  height 100%
</style>
