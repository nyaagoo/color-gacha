<template lang="pug">
  .collection-list-periodic
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({
  name: "collection-list-periodic",
  components: {}
})
export default class CollectionListPeriodic extends Vue {}
</script>
<style lang="stylus" scoped>
.collection-list-periodic
  background orange
  width 40px
  height 40px
</style>
